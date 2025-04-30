// src/pages/GenreResults.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMoviesByGenre, getGenres } from "../services/api";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Chip,
  useMediaQuery,
} from "@mui/material";
import MovieCard from "../components/MovieCard"; // reuse your existing MovieCard
import { useTheme } from "@mui/material/styles";

function GenreResults() {
  const { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [movies, setMovies] = useState([]);
  const [genreName, setGenreName] = useState("");
  const [loading, setLoading] = useState(true);
  console.log("Genre ID:", id);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const genreList = await getGenres();
        const selectedGenre = genreList.find((g) => g.id === Number(id));
        setGenreName(selectedGenre?.name || "Unknown");

        if (!genreList || genreList.length === 0) {
          console.warn("No genres loaded");
          return;
        }

        const response = await getMoviesByGenre(id);
        setMovies(response.results);
      } catch (error) {
        console.error("Failed to fetch movies by genre", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [id]);

  if (loading) {
    return (
      <Box textAlign="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Genre: <Chip label={genreName} color="primary" />
      </Typography>
      {movies.length > 0 ? (
        <Grid container spacing={3}>
          {movies.map((movie) => (
            <Grid item xs={6} sm={4} md={3} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="text.secondary" mt={4}>
          No movies found for this genre.
        </Typography>
      )}
    </Box>
  );
}

export default GenreResults;
