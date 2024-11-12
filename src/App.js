import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactPlayer from 'react-player';
import movieTrailer from 'movie-trailer';
import axios from 'axios';
import NavBar from './components/NavBar'; // Import your NavBar component
import SearchBox from './components/SearchBox'; // Import your SearchBox component
import MovieDetails from './components/MovieDetails'; // Import your MovieDetails component
import MoviePopup from './components/MoviePopup';
import MainVideoPlayer from './components/MainVideoPlayer';
import RandomMoviesSection from './components/RandomMoviesSection';

function App() {
    const [video, setVideo] = useState(""); // State for search term
    const [videoURL, setVideoURL] = useState("");
    const [randomTrailerURL, setRandomTrailerURL] = useState("");
    const [randomMovies, setRandomMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const api = "https://www.omdbapi.com/?";
    const apiKey = "450e1265"; // OMDB API key

    // List of popular movie titles to display randomly
    const popularMovies = ["Inception", "Titanic", "Avatar", "The Matrix", "Interstellar"];

    // Fetch movies and randomly select one for the featured trailer on load
    useEffect(() => {
        const fetchRandomMovies = async () => {
            try {
                const promises = popularMovies.map(title =>
                    axios.get(`${api}t=${title}&apikey=${apiKey}`)
                );
                const results = await Promise.all(promises);
                setRandomMovies(results.map(response => response.data));

                // Randomly select one trailer for featured display
                playRandomTrailer(results.map(response => response.data));
            } catch (error) {
                console.error("Error fetching random movies:", error);
            }
        };

        fetchRandomMovies();
    }, []);

    // Play a random trailer for the featured section
    const playRandomTrailer = async (movies) => {
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        try {
            const trailerURL = await movieTrailer(randomMovie.Title);
            setRandomTrailerURL(trailerURL);
        } catch (error) {
            console.error("Error fetching trailer:", error);
        }
    };

    // Handle movie click to show pop-up with details
    const handleMovieClick = async (movieTitle) => {
        try {
            const response = await axios.get(`${api}t=${movieTitle}&apikey=${apiKey}`);
            setSelectedMovie(response.data); // Set selected movie data

            // Get trailer URL specifically for the selected movie
            const trailerURL = await movieTrailer(movieTitle);
            setVideoURL(trailerURL); // Set video URL for trailer
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    };

    return (
        <Router>
            <div className="App">
                <NavBar />
                
               
                {/* Use the MainVideoPlayer component */}
                <MainVideoPlayer randomTrailerURL={randomTrailerURL} />

                {/* Use the RandomMoviesSection component */}
                <RandomMoviesSection randomMovies={randomMovies} handleMovieClick={handleMovieClick} />

                {/* Pop-up with Selected Movie Details */}
                {selectedMovie && (
                    <MoviePopup 
                        selectedMovie={selectedMovie} 
                        videoURL={videoURL} 
                        onClose={() => setSelectedMovie(null)} 
                    />
                )}
            </div>
            {/* Define Routes */}
            <Routes>
                <Route path="/movie/:title" element={<MovieDetails />} />
            </Routes>
        </Router>
    );
}

export default App;