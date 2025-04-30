const API_KEY = "280bc8ec6765dd7ee1914f294f26cba7";
const BASE_URL = "https://api.themoviedb.org/3";

// 🌟 Get popular movies (with page support)
export const getPopularMovies = async (page = 1) => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
  const data = await response.json();
  return data;
};

// 🔎 Search movies (returns only results)
export const searchMovies = async (query) => {
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.results;
};

// 🔍 Multi-search (movies, TV shows, and people together)
export const multiSearch = async (query, page = 1) => {
  const response = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`);
  const data = await response.json();
  return data.results;
};

// 🎬 Get movie details by ID
export const getMovieDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  const data = await response.json();
  return data;
};

// 🎞️ Get movie trailers (YouTube videos)
export const getMovieVideos = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

// 🎭 Get cast and crew of a movie
export const getMovieCredits = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
  const data = await response.json();
  return data;
};

// 🤝 Get similar movies based on a movie ID
export const getSimilarMovies = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

// 🎭 Get list of all genres
export const getGenres = async () => {
  const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  const data = await response.json();
  return data.genres;
};

// 🧮 Discover movies by genre (with page support)
export const getMoviesByGenre = async (genreId, page = 1) => {
  const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`);
  const data = await response.json();
  console.log(data);
  return data;
};

// 🏆 Get top-rated movies (with page support)
export const getTopRatedMovies = async (page = 1) => {
  const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`);
  const data = await response.json();
  return data;
};

// 👤 Get person (actor/actress) details by ID
export const getPersonDetails = async (personId) => {
  const response = await fetch(`${BASE_URL}/person/${personId}?api_key=${API_KEY}`);
  const data = await response.json();
  return data;
};

// 🎥 Get all movies a person has acted in
export const getPersonMovies = async (personId) => {
  const response = await fetch(`${BASE_URL}/person/${personId}/movie_credits?api_key=${API_KEY}`);
  const data = await response.json();
  return data.cast;
};
