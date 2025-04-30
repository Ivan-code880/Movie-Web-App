import "./css/App.css";
import { Routes, Route } from "react-router-dom";
import Favourites from "./pages/Favourites";
import Home from "./pages/Home";
import GenreResults from "./pages/GenreResults";
import MultiSearchPage from "./pages/MultiSearchPage";
import MovieDetails from "./pages/MovieDetails";
import CastAndCrew from "./pages/CastandCrew";
import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "./components/NavBar";
import ScrollToTopButton from "./components/ScrollToTopButton";

function App() {
  return (
    <MovieProvider>
      <main className="main-content">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/genre/:id" element={<GenreResults />} />
          <Route path="/search" element={<MultiSearchPage />} />
          <Route path="/movie/:movieId/cast" element={<CastAndCrew />} />
        </Routes>
        <ScrollToTopButton />
      </main>
    </MovieProvider>
  );
}

export default App;
