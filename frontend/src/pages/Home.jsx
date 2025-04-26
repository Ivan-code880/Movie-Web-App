import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import {
  getGenres,
  getMoviesByGenre,
  getPopularMovies,
  searchMovies,
} from "../services/api";
import {
  Box,
  Button,
  Skeleton,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        const genreList = await getGenres();
        setGenres(genreList);
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  const handleGenreSelect = async (genreId) => {
    setSelectedGenre(genreId);
    setLoading(true);
    try {
      const moviesByGenre = await getMoviesByGenre(genreId);
      setMovies(moviesByGenre);
    } catch (err) {
      console.error("Failed to load genre movies:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);

    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }

    setSearchQuery("");
  };

  return (
    <Box className="home" sx={{ px: 2, py: 4 }}>
      {/* Search Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 4,
            gap: 2,
          }}
        >
          <motion.div whileHover={{ scale: 1.05 }}>
            <TextField
              variant="outlined"
              placeholder="Search for movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: { xs: "100%", sm: "400px" },
              }}
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                px: 4,
                borderRadius: 3,
              }}
            >
              Search
            </Button>
          </motion.div>
        </Box>
      </motion.div>

      {/* Genre Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.05 }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
            mb: 5,
          }}
        >
          {genres.map((genre) => (
            <motion.div
              key={genre.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 120 }}
            >
              <Button
                onClick={() => handleGenreSelect(genre.id)}
                variant={genre.id === selectedGenre ? "contained" : "outlined"}
                color="primary"
                sx={{
                  borderRadius: 5,
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                {genre.name}
              </Button>
            </motion.div>
          ))}
        </Box>
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Box
            sx={{
              textAlign: "center",
              color: "error.main",
              mb: 4,
            }}
          >
            <b>An Error Occurred:</b> {error}
          </Box>
        </motion.div>
      )}

      {/* Movies or Loading Skeleton */}
      {loading ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 4,
          }}
        >
          {Array.from({ length: 8 }).map((_, idx) => (
            <Skeleton
              key={idx}
              variant="rectangular"
              width="100%"
              height={300}
              sx={{ borderRadius: 3 }}
            />
          ))}
        </Box>
      ) : (
        <Box
          className={`movies-grid${movies.length === 1 ? " single" : ""}`}
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 4,
          }}
        >
          {movies.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                scale: 1.08,
                rotate: 2,
                boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.3)",
              }}
              transition={{
                duration: 0.8,
                delay: 0.05 * index,
                ease: "easeOut",
              }}
              style={{ borderRadius: "12px" }}
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default Home;
