import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import movieTrailer from 'movie-trailer';

import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import MoviePopup from './components/MoviePopup';
import VideoCarousel from './components/VideoCarousel';
import HomePage from './components/pages/Home';
import MovieDetailsPage from './components/MovieDetails';

function App() {
    const [video, setVideo] = useState("Inception"); // Default video title
    const [videoURL, setVideoURL] = useState("");    // Trailer URL
    const [movieDetails, setMovieDetails] = useState({});
    const [selectedMovie, setSelectedMovie] = useState(null);

    const api = "https://www.omdbapi.com/?";
    const apiKey = "450e1265";

    // Function to fetch movie details
    const fetchMovieDetails = useCallback(async (title) => {
        try {
            const response = await axios.get(`${api}t=${title}&apikey=${apiKey}`);
            if (response.data && response.data.Response === "True") {
                setMovieDetails(response.data); // Set movie details
                fetchYouTubeTrailer(title); // Fetch trailer
            } else {
                console.warn("No details found for this movie");
                setMovieDetails({});
            }
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    }, []);

    // Function to fetch trailer from YouTube API or fallback to `movieTrailer`
    const fetchYouTubeTrailer = (title) => {
        const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY; // Make sure to set in .env
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
                    setVideoURL(trailerUrl); // Set trailer URL
                } else {
                    console.warn("No trailer found in YouTube API. Using fallback.");
                    movieTrailer(title)
                        .then((url) => setVideoURL(url || ""))
                        .catch((error) => console.error("Fallback trailer search error:", error));
                }
            })
            .catch((error) => console.error("Error fetching YouTube trailer:", error));
    };

    // Handle movie search
    const handleSearch = (title) => {
        setVideo(title); // Update video title
        fetchMovieDetails(title); // Fetch details and trailer
    };

    // Handle movie click to show popup and trailer
    const handleMovieClick = async (movieTitle) => {
        await fetchMovieDetails(movieTitle);
        setSelectedMovie(movieDetails);
    };

    // Close popup
    const closePopup = () => setSelectedMovie(null);

    return (
        <Router>
            <div className="App">
                {/* Navbar and SearchBar */}
                <div className="header-container">
                    <NavBar setVideo={setVideo} handleMovieClick={handleMovieClick} />
                    <SearchBar onSearch={handleSearch} />
                </div>

                {/* Define Routes */}
                <Routes>
                    {/* Home Page Route */}
                    <Route
                        path="/"
                        element={
                            <HomePage
                                videoURL={videoURL}
                                onSearch={handleSearch}
                                handleMovieClick={handleMovieClick}
                            />
                        }
                    />

                    {/* Movie Details Page */}
                    <Route
                        path="/movie/:title"
                        element={
                            <MovieDetailsPage
                                fetchMovieDetails={fetchMovieDetails}
                                selectedMovie={selectedMovie}
                                videoURL={videoURL}
                                onClose={closePopup}
                            />
                        }
                    />
                </Routes>

                {/* Movie Popup */}
                {selectedMovie && (
                    <MoviePopup
                        selectedMovie={selectedMovie}
                        videoURL={videoURL}
                        onClose={closePopup}
                    />
                )}

                {/* Video Carousel */}
                <VideoCarousel videos={[{ url: 'https://www.youtube.com/watch?v=q_MaCi7i180' }]} />
            </div>
        </Router>
    );
}

export default App;