import "./css/App.css";
import { Routes, Route } from "react-router-dom";
import Favourites from "./pages/Favourites";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "./components/NavBar";

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
