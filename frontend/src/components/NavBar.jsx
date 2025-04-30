import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Fade,
  Divider,
  TextField,
  Collapse,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getGenres } from "../services/api";

function NavBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [genres, setGenres] = useState([]);
  const [genresOpen, setGenresOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery("");
    setAnchorEl(null); // Close mobile menu if open
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getGenres();
        setGenres(data);
      } catch (error) {
        console.error("Failed to load genres", error);
      }
    };
    fetchGenres();
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: scrolled ? "black" : "transparent",
          boxShadow: scrolled ? "0 2px 10px rgba(0,0,0,0.7)" : "none",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          transition: "all 0.4s ease",
          zIndex: 1300,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: { xs: 2, md: 4 },
            py: 1,
          }}
        >
          {/* Logo */}
          <Box
            display="flex"
            alignItems="center"
            component={Link}
            to="/"
            sx={{ textDecoration: "none", color: "blue" }}
          >
            <MovieFilterIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              ShowTube
            </Typography>
          </Box>

          {/* Desktop Nav */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 3,
            }}
          >
            {/* Desktop Search */}
            <Box component="form" onSubmit={handleSearch}>
              <TextField
                size="small"
                placeholder="Search Actors, Movies, News..."
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  bgcolor: "white",
                  borderRadius: 2,
                  input: { paddingY: 0.5 },
                  width: 250,
                }}
              />
            </Box>

            <Button component={Link} to="/" sx={navButtonStyles(isActive("/"))}>
              Home
            </Button>
            <Button
              component={Link}
              to="/favourites"
              sx={navButtonStyles(isActive("/favourites"))}
            >
              Favourites
            </Button>
          </Box>

          {/* Mobile Hamburger */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleMenuOpen}
              sx={{ color: "blue" }}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              TransitionComponent={Fade}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              PaperProps={{
                sx: {
                  backgroundColor: "black",
                  color: "blue",
                  mt: "64px",
                  width: "100vw",
                  borderRadius: 0,
                  boxShadow: "0px 8px 32px rgba(0,0,0,0.7)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 0,
                  margin: 0,
                },
              }}
              MenuListProps={{
                sx: {
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 0,
                },
              }}
            >
              {/* Mobile Search */}
              <Box
                component="form"
                onSubmit={handleSearch}
                sx={{ width: "90%", my: 2 }}
              >
                <TextField
                  size="small"
                  fullWidth
                  placeholder="Search Actors, Movies, News..."
                  variant="outlined"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{
                    bgcolor: "white",
                    borderRadius: 2,
                    input: { paddingY: 0.5 },
                  }}
                />
              </Box>

              {/* Links */}
              <MenuItem
                component={Link}
                to="/"
                onClick={handleMenuClose}
                sx={menuItemStyles(isActive("/"))}
              >
                Home
              </MenuItem>
              <Divider sx={{ width: "80%", bgcolor: "blue" }} />
              <MenuItem
                component={Link}
                to="/favourites"
                onClick={handleMenuClose}
                sx={menuItemStyles(isActive("/favourites"))}
              >
                Favourites
              </MenuItem>

              <Divider sx={{ width: "80%", bgcolor: "blue", my: 1 }} />

              {/* Collapsible Genres */}
              <MenuItem
                onClick={() => setGenresOpen(!genresOpen)}
                sx={{ width: "100%", justifyContent: "center" }}
              >
                {genresOpen ? "Hide Genres" : "Show Genres"}
              </MenuItem>
              <Collapse
                in={genresOpen}
                timeout="auto"
                unmountOnExit
                sx={{ width: "100%" }}
              >
                {genres.map((genre) => (
                  <MenuItem
                    key={genre.id}
                    component={Link}
                    to={`/genre/${genre.id}`}
                    onClick={handleMenuClose}
                    sx={menuItemStyles()}
                  >
                    {genre.name}
                  </MenuItem>
                ))}
              </Collapse>

              {/* Movie icon at the bottom */}
              <Box sx={{ mt: 4, mb: 2 }}>
                <MovieFilterIcon sx={{ fontSize: 20, color: "lightskyblue" }} />
              </Box>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Spacer */}
      <Toolbar />
    </>
  );
}

const navButtonStyles = (active) => ({
  position: "relative",
  color: active ? "cyan" : "blue",
  fontWeight: "bold",
  textTransform: "none",
  fontSize: "1rem",
  "&:after": {
    content: '""',
    position: "absolute",
    width: "0%",
    height: "2px",
    bottom: 0,
    left: 0,
    backgroundColor: active ? "cyan" : "blue",
    transition: "width 0.3s",
  },
  "&:hover:after": {
    width: "100%",
  },
});

const menuItemStyles = (active) => ({
  fontWeight: "bold",
  py: 2,
  color: active ? "cyan" : "blue",
  justifyContent: "center",
  width: "100%",
  textAlign: "center",
  "&:hover": { backgroundColor: "rgba(0,0,255,0.2)" },
});

export default NavBar;
