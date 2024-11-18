import './App.css';
import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactPlayer from 'react-player';
import movieTrailer from 'movie-trailer';
import axios from 'axios';
import NavBar from './components/NavBar';
import MoviePopup from './components/MoviePopup';
import VideoCarousel from './components/VideoCarousel';

function App() {
    const [video, setVideo] = useState("Inception"); // Default video title
    const [videoURL, setVideoURL] = useState("");    // Trailer URL
    const [movieDetails, setMovieDetails] = useState({});
    const [randomMovies, setRandomMovies] = useState([]);  // State for random movies
    const [selectedMovie, setSelectedMovie] = useState(null); // Movie details for popup

    const api = "https://www.omdbapi.com/?";
    const apiKey = "450e1265";

    // Fetch movie details from OMDb API
    const fetchMovieDetails = useCallback(async (title) => {
        try {
            const response = await axios.get(`${api}t=${title}&apikey=${apiKey}`);
            if (response.data && response.data.Response === "True") {
                setMovieDetails(response.data); // Set the full movie details
                fetchYouTubeTrailer(title); // Fetch YouTube trailer once we have the movie title
            } else {
                console.warn("No details found for this movie");
                setMovieDetails({});
            }
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    }, []);

    // Fetch trailer URL from YouTube API
    const fetchYouTubeTrailer = (title) => {
        const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY; // Make sure this is set in your .env file
        axios
            .get(`https://www.googleapis.com/youtube/v3/search`, {
                params: {
                    part: "snippet",
                    q: `${title} trailer`,
                    type: "video",
                    videoEmbeddable: "true",
                    key: API_KEY,
                },
            })
            .then((response) => {
                if (response.data.items && response.data.items.length > 0) {
                    const trailerUrl = `https://www.youtube.com/watch?v=${response.data.items[0].id.videoId}`;
                    setVideoURL(trailerUrl); // Set the trailer URL
                } else {
                    console.warn("No trailer found in YouTube API. Using fallback.");
                    movieTrailer(title)
                        .then((url) => {
                            if (url) setVideoURL(url);
                            else console.warn("No trailer found with fallback method either.");
                        })
                        .catch((error) => {
                            console.error("Error with fallback movieTrailer search:", error);
                        });
                }
            })
            .catch((error) => {
                console.error("Error fetching YouTube trailer:", error.response || error);
            });
    };

    // Fetch random movies (for example, 5 random popular movies)
    const fetchRandomMovies = async () => {
        try {
            const response = await axios.get(`https://www.omdbapi.com/?s=batman&apikey=${apiKey}`);  // Replace with actual API for random movies
            if (response.data.Response === "True") {
                setRandomMovies(response.data.Search); // Set random movie list
            }
        } catch (error) {
            console.error("Error fetching random movies:", error);
        }
    };

    // Handle Search (called from SearchBar)
    const handleSearch = (title) => {
        setVideo(title); // Update the video title
        fetchMovieDetails(title); // Fetch movie details and trailer
    };

    // Handle movie click to show detailed information in a popup
    const handleMovieClick = async (movieTitle) => {
        try {
            await fetchMovieDetails(movieTitle);
            setSelectedMovie(movieDetails);
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    };

    // Close the popup
    const closePopup = () => {
        setSelectedMovie(null);
    };

    useEffect(() => {
        fetchRandomMovies(); // Fetch random movies when the app loads
        fetchMovieDetails(video); // Initial fetch for default video
    }, [fetchMovieDetails, video]);

    return (
        <Router>
            <div className="App">
                <NavBar onSearch={handleSearch} />

                <h1>{movieDetails.Title}</h1>
                <div>
                    <p>Year: {movieDetails.Year}</p>
                    <p>Rating: {movieDetails.imdbRating || 'N/A'}</p>
                    <ReactPlayer url={videoURL} controls={true} />

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
                            onClose={closePopup}
                        />
                    )}
                </div>
            </div>
        </Router>
    );
}

export default App;