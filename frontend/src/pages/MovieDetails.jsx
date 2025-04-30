import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getMovieDetails,
  getSimilarMovies,
  getMovieVideos,
  getMovieCredits,
} from "../services/api"; // ✨ UPDATED
import { useMovieContext } from "../contexts/MovieContext";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  CircularProgress,
  Button,
  useMediaQuery,
  Grid,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import MovieCard from "../components/MovieCard.jsx"; // ✨ Import your MovieCard to reuse

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isFavourite, addToFavourites, removeFromFavourites } =
    useMovieContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        const movieDetails = await getMovieDetails(id);
        setMovie(movieDetails);

        const similar = await getSimilarMovies(id);
        setSimilarMovies(similar);

        const credits = await getMovieCredits(id);
        setCast(credits.cast);

        const videos = await getMovieVideos(id);

        const officialTrailer = videos.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        setTrailer(officialTrailer);
      } catch (err) {
        console.log(err);
        setError("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };
    loadMovieDetails();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isFav = movie ? isFavourite(movie.id) : false;

  const toggleFavourite = (e) => {
    e.preventDefault();
    if (!movie) return;
    if (isFav) {
      removeFromFavourites(movie.id);
    } else {
      addToFavourites(movie);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" mt={5}>
        <b>An Error Occurred:</b> {error}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        my: 5,
        px: 2,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: -1,
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.7) 100%)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w780${
            movie.backdrop_path || movie.poster_path
          })`,
          backgroundSize: "cover",
          backgroundPosition: `center ${scrollY * 0.2}px`,
          transform: `scale(${1 + scrollY * 0.0005})`,
          filter: "blur(12px)",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: -2,
          opacity: 0.4,
          transition:
            "background-position 0.2s ease-out, transform 0.2s ease-out",
        }}
      />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Card
          sx={{
            my: 6,
            width: "100%",
            maxWidth: 800,
            mx: "auto",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            boxShadow: 6,
            borderRadius: 3,
            backgroundColor: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(8px)",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{ position: "relative", flex: isMobile ? "none" : "0 0 40%" }}
          >
            <CardMedia
              component="img"
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              sx={{
                width: "100%",
                height: isMobile ? 400 : "100%",
                objectFit: "cover",
              }}
            />
            <IconButton
              onClick={toggleFavourite}
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                bgcolor: "white",
                "&:hover": { bgcolor: "grey.200" },
              }}
            >
              {isFav ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderIcon color="action" />
              )}
            </IconButton>
          </Box>

          <CardContent sx={{ flex: 1 }}>
            <Typography variant="h5" gutterBottom>
              {movie.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={2}>
              {movie.overview}
            </Typography>
            <Typography variant="body2">
              <strong>Audience Rating:</strong> {movie.vote_average} / 10 (
              {movie.vote_count.toLocaleString()} votes)
            </Typography>
            <Typography variant="body2" mt={1}>
              <strong>Genres:</strong>{" "}
              {movie.genres.map((g) => g.name).join(", ")}
            </Typography>
            <Typography variant="body2" mt={1}>
              <strong>Release Date:</strong> {movie.release_date}
            </Typography>
            <Typography variant="body2" mt={1}>
              <strong>Runtime:</strong> {movie.runtime} mins
            </Typography>

            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={handleBack}
              sx={{ mt: 4 }}
            >
              Go Back
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* 🎭 Cast Preview Section */}
      {cast.length > 0 && (
        <Box
          sx={{
            mt: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            backgroundColor: "#f5f5f5", // light ash color
            p: 2,
            borderRadius: 2,
            boxShadow: 2,
            maxWidth: 600, // narrower
            mx: "auto",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              color: "text.primary", // dark readable text
              fontWeight: 500,
            }}
          >
            {cast.slice(0, 3).map((member, index) => (
              <span key={member.id}>
                {index > 0 && ","}{" "}
                {member.name.length > 10
                  ? `${member.name.slice(0, 10)}...`
                  : member.name}
              </span>
            ))}
          </Typography>

          <Button
            variant="text"
            size="small"
            onClick={() => navigate(`/movie/${movie.id}/cast`)}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              ml: 2,
              color: "primary.main",
            }}
          >
            Show more cast →
          </Button>
        </Box>
      )}

      {/* 🎥 Trailer Section */}
      {trailer && (
        <Box sx={{ my: 6, width: "100%", maxWidth: 550, mx: "auto" }}>
          <Typography variant="h5" gutterBottom>
            Trailer
          </Typography>
          <Box
            sx={{
              position: "relative",
              paddingTop: "56.25%",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={trailer.name}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: 0,
              }}
              allowFullScreen
            />
          </Box>
        </Box>
      )}

      {/* 🎬 Similar Movies Section */}
      {similarMovies.length > 0 && (
        <Box sx={{ mt: 8 }}>
          <Typography variant="h5" gutterBottom>
            Similar Movies
          </Typography>
          <Grid container spacing={2}>
            {similarMovies.map((movie) => (
              <Grid item xs={6} sm={4} md={3} key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}

export default MovieDetails;
