import { motion } from "framer-motion";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";
import { useState } from "react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const PLACEHOLDER_IMAGE = "https://via.placeholder.com/500x750?text=No+Image";

function MovieCard({ movie }) {
  const { isFavourite, addToFavourites, removeFromFavourites } =
    useMovieContext();
  const favourite = isFavourite(movie.id);

  const [imgSrc, setImgSrc] = useState(
    movie.poster_path
      ? `${IMAGE_BASE_URL}${movie.poster_path}`
      : PLACEHOLDER_IMAGE
  );

  function onFavouriteClick(e) {
    e.preventDefault();
    if (favourite) removeFromFavourites(movie.id);
    else addToFavourites(movie);
  }

  function handleImageError() {
    setImgSrc(PLACEHOLDER_IMAGE);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card
        sx={{
          maxWidth: 250,
          maxHeight: 500,
          margin: "0 auto",
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: 3,
          position: "relative",
          transition: "transform 0.3s",
          "&:hover": { transform: "scale(1.05)" },
        }}
      >
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            height="370"
            image={imgSrc}
            alt={movie.title || "No Title Available"}
            onError={handleImageError}
            sx={{
              maxHeight: 200,
              objectFit: "cover",
              backgroundColor: "grey.200",
            }}
          />
          <IconButton
            onClick={onFavouriteClick}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "rgba(255,255,255,0.7)",
              transition: "transform 0.2s ease, background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.9)",
                transform: "scale(1.2) rotate(15deg)",
              },
              "&:active": {
                transform: "scale(0.9) rotate(-15deg)",
              },
            }}
          >
            {favourite ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </Box>

        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 1,
          }}
        >
          <Typography
            variant="subtitle1"
            component="div"
            sx={{
              fontSize: "0.95rem",
              fontWeight: "bold",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              maxHeight: "2.6em",
              lineHeight: "1.3em",
            }}
          >
            {movie.title || "Untitled"}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {movie.release_date
              ? movie.release_date.split("-")[0]
              : "Unknown Year"}
          </Typography>

          <Button
            component={Link}
            to={`/movie/${movie.id}`}
            variant="outlined"
            size="small"
            sx={{
              transition: "all 0.3s ease",
              borderRadius: 3,
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
                borderColor: "primary.main",
              },
            }}
          >
            View Details
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default MovieCard;
