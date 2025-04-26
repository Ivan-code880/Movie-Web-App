import "../css/Favourites.css";
import { Box, Typography } from "@mui/material";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favourites() {
  const { favourites } = useMovieContext();
  if (favourites.length > 0) {
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 4,
        }}
      >
        {favourites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Box>
    );
  } else {
    return (
      <div className="favourites-empty">
        <h2>No Favourite Movies Yet</h2>
        <p>Start adding movies to your favourites and they will appear here</p>
      </div>
    );
  }
}
export default Favourites;
