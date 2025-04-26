import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import { Link } from "react-router-dom";

function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Listen to scroll to apply blur effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Drawer content for mobile
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", mt: 5 }}>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText
            primary="Home"
            sx={{ color: "blue", fontWeight: "bold" }}
          />
        </ListItem>
        <ListItem button component={Link} to="/favourites">
          <ListItemText
            primary="Favourites"
            sx={{ color: "blue", fontWeight: "bold" }}
          />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={scrolled ? 6 : 0}
        sx={{
          backgroundColor: "black",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: { xs: 2, md: 4 },
          }}
        >
          {/* Left - Logo */}
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
              Movie App
            </Typography>
          </Box>

          {/* Desktop Links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            <Button
              component={Link}
              to="/"
              color="inherit"
              sx={{
                position: "relative",
                color: "blue",
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
                  backgroundColor: "blue",
                  transition: "width 0.3s",
                },
                "&:hover:after": {
                  width: "100%",
                },
              }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/favourites"
              color="inherit"
              sx={{
                position: "relative",
                color: "blue",
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
                  backgroundColor: "blue",
                  transition: "width 0.3s",
                },
                "&:hover:after": {
                  width: "100%",
                },
              }}
            >
              Favourites
            </Button>
          </Box>

          {/* Mobile Hamburger */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: "none" }, color: "blue" }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": { backgroundColor: "black", color: "blue" },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default NavBar;
