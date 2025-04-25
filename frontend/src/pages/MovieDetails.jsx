import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../services/api";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isFavourite, addToFavourites, removeFromFavourites } =
    useMovieContext();

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        const movieDetails = await getMovieDetails(id);
        setMovie(movieDetails);
      } catch (err) {
        console.log(err);
        setError("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };
    loadMovieDetails(id);
  }, [id]);

  const isFav = movie ? isFavourite(movie.id) : false;

  const toggleFavourite = (e) => {
    e.preventDefault();
    if (!movie) return; // guard again just in case
    if (isFav) {
      removeFromFavourites(movie.id);
    } else {
      addToFavourites(movie);
    }
  };
  return (
    <div>
      {error && (
        <div className="error-message">
          <b>An Error Occured:</b> {error}
        </div>
      )}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid single">
          <div className="movie-card">
            <div className="movie-poster">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <button
                className={`favourite-btn ${isFav ? "active" : ""}`}
                onClick={toggleFavourite}
              >
                {isFav ? "❤️" : "🤍"}
              </button>
            </div>
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>
                <strong>Overview:</strong> {movie.overview}
              </p>
              <hr />
              <p>
                <strong>Audience Rating:</strong> {movie.vote_average} / 10 (
                {movie.vote_count.toLocaleString()} votes)
              </p>
              <hr />
              <p>
                <strong>Genres:</strong>{" "}
                {movie.genres.map((g) => g.name).join(", ")}
              </p>
              <hr />
              <p>
                <strong>Release Date:</strong> {movie.release_date}
              </p>
              <hr />
              <p>
                <strong>Runtime:</strong> {movie.runtime} mins
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
