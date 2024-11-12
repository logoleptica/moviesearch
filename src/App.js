import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactPlayer from 'react-player';
import movieTrailer from 'movie-trailer';
import axios from 'axios';
import NavBar from './components/NavBar'; 
import SearchBox from './components/SearchBox'; 
import MovieDetails from './components/MovieDetails'; 
import MoviePopup from './components/MoviePopup'; 
import VideoCarousel from './components/VideoCarousel'; 

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

    useEffect(() => {
        const fetchRandomMovies = async () => {
            try {
                const promises = popularMovies.map(title =>
                    axios.get(`${api}t=${title}&apikey=${apiKey}`)
                );
                const results = await Promise.all(promises);
                setRandomMovies(results.map(response => response.data));
            } catch (error) {
                console.error("Error fetching random movies:", error);
            }
        };

        fetchRandomMovies();
    }, []);

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
            
                {/* Search Box Component */}
                <SearchBox setVideo={setVideo} handleMovieClick={handleMovieClick} video={video} />

                {/* Video Carousel */}
                <VideoCarousel videos={[{ url: 'https://www.youtube.com/watch?v=q_MaCi7i180' },
                     { url: 'https://www.youtube.com/watch?v=uUKhg_VG_Es' } ,
                     { url: 'https://www.youtube.com/watch?v=q_MaCi7i180' },
                     { url: 'https://www.youtube.com/watch?v=q_MaCi7i180' },
                     { url: 'https://www.youtube.com/watch?v=q_MaCi7i180' },]} />

                {/* Main Video Player for Random Trailer */}
                {randomTrailerURL && (
                    <div className="main-video">
                        <h2>Featured Trailer</h2>
                        <div className="player-wrapper">
                            <ReactPlayer url={randomTrailerURL} controls={true} width="100%" height="400px" />
                        </div>
                    </div>
                )}

                {/* Random Movies Section */}
                <div className="random-movies">
                    <h2>Popular Movies</h2>
                    <div className="movie-grid">
                        {randomMovies.map((movie) => (
                            <div key={movie.imdbID} className="movie-item" onClick={() => handleMovieClick(movie.Title)}>
                                <img src={movie.Poster} alt={`${movie.Title} poster`} />
                                <p>{movie.Title}</p>
                            </div>
                        ))}
                    </div>
                </div>

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