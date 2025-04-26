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
    <Card
      sx={{
        maxWidth: 250,
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
            "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
          }}
        >
          {favourite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>

      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h6" component="div" noWrap>
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
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}

export default MovieCard;
