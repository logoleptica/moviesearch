import React, { useState, useEffect, useCallback } from 'react';
import ReactPlayer from 'react-player';
import SearchBar from './components/SearchBar';
import movieTrailer from 'movie-trailer';
import axios from 'axios';

function App() {
    const [video, setVideo] = useState("Inception"); // Default video title
    const [videoURL, setVideoURL] = useState("");    // Empty to be fetched initially
    const [movieDetails, setMovieDetails] = useState({});
    const [randomMovies, setRandomMovies] = useState([]);  // State for random movies
    const [selectedMovie, setSelectedMovie] = useState(null); // Movie details for popup

    // Fetch movie details from OMDb API
    const fetchMovieDetails = useCallback(async (title) => {
        try {
            const response = await axios.get(`https://www.omdbapi.com/?t=${title}&apikey=450e1265`);
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

    // Fetch trailer URL from YouTube API (Using movieTrailer or YouTube Data API)
    const fetchYouTubeTrailer = (title) => {
        const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
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

    // Handle Search (called from SearchBar)
    const handleSearch = (title) => {
        setVideo(title); // Update the video title
        fetchMovieDetails(title); // Fetch movie details and trailer
    };

    // Fetch random movies (for example, 5 random popular movies)
    const fetchRandomMovies = async () => {
        try {
            const response = await axios.get(`https://www.omdbapi.com/?s=batman&apikey=450e1265`);  // Replace with actual API for random movies
            if (response.data.Response === "True") {
                setRandomMovies(response.data.Search); // Set random movie list
            }
        } catch (error) {
            console.error("Error fetching random movies:", error);
        }
    };

    // Handle movie click to show detailed information in a popup
    const handleMovieClick = (movie) => {
        setSelectedMovie(movie); // Show movie details in a popup
    };

    // Close the popup
    const closePopup = () => {
        setSelectedMovie(null);
    };

    useEffect(() => {
        fetchMovieDetails(video); // Initial fetch for default video
        fetchRandomMovies(); // Fetch random movies when the app loads
    }, [fetchMovieDetails, video]);

    return (
        <div className="App">
            <SearchBar onSearch={handleSearch} />

            <h1>{movieDetails.Title}</h1>
            <div>
                <p>Year: {movieDetails.Year}</p>
                <p>Rating: {movieDetails.imdbRating || 'N/A'}</p>
                <ReactPlayer url={videoURL} controls={true} />

                <div className="random-movies">
                    <h2>Popular Movies</h2>
                    <div className="movie-grid">
                        {randomMovies.map((movie) => (
                            <div key={movie.imdbID} className="movie-item" onClick={() => handleMovieClick(movie)}>
                                <img src={movie.Poster} alt={`${movie.Title} poster`} />
                                <p>{movie.Title}</p>
                            </div>
                        ))}
                    </div>
                </div>



                {selectedMovie && (
                    <div className="movie-popup">
                        <div className="movie-popup-content">
                            <button className="close-btn" onClick={closePopup}>Close</button>
                            <h1>{selectedMovie.Title}</h1>
                            <p><strong>Year:</strong> {selectedMovie.Year}</p>
                            <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
                            <p><strong>Runtime:</strong> {selectedMovie.Runtime}</p>
                            <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
                            <p><strong>Cast:</strong> {selectedMovie.Actors}</p>
                            <img src={selectedMovie.Poster} alt={`${selectedMovie.Title} poster`} />
                            {videoURL && (
                                <div className="video-player">
                                    <h2>Trailer</h2>
                                    <ReactPlayer url={videoURL} controls={true} />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;