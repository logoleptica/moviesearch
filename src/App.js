import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import NavBar from './components/NavBar'; 
import MovieDetails from './components/MovieDetails'; 
import MoviePopup from './components/MoviePopup'; 
import VideoCarousel from './components/VideoCarousel'; 

function App() {
    const [video, setVideo] = useState("");
    const [videoURL, setVideoURL] = useState("");
    const [randomTrailerURL, setRandomTrailerURL] = useState("");
    const [randomMovies, setRandomMovies] = useState([]);
    const [actionMovies, setActionMovies] = useState([]);
    const [dramaMovies, setDramaMovies] = useState([]);
    const [comedyMovies, setComedyMovies] = useState([]);
    const [warMovies, setWarMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const api = "https://www.omdbapi.com/?";
    const apiKey = "450e1265";

    const popularMovies = ["Inception", "Titanic", "Avatar", "The Matrix", "Interstellar"];
    const actionMovieTitles = ["Mad Max: Fury Road", "John Wick", "Die Hard",
        "The Dark Knight", "Romeo Must Die", "12 Monkeys", "Heat", "Terminator 2", "Bullet"
    ];
    const dramaMovieTitles = ["The Shawshank Redemption", "Forrest Gump", "The Godfather",
        "The Hateful Eight", "City of God", "Parasite", "12 Angry Men", "Four Brothers", "Stepmom"
    ];
    const comedyMovieTitles = ["Superbad", "Step Brothers", "The Hangover", "Step Brothers",
        "The Hangover", "Wedding Crashers", "White Chicks", "Horrible Bosses", "The Other Guys"
    ];
    const warMovieTitles = ["Saving Private Ryan", "1917", "Full Metal Jacket", "American Sniper", 
        "Tears of the Sun", "Black Hawk Down", "The Platoon", "Zero Dark Thirty", "Blitz"];

    const fetchMovies = async (titles, setter) => {
        try {
            const promises = titles.map(title =>
                axios.get(`${api}t=${title}&apikey=${apiKey}`)
            );
            const results = await Promise.all(promises);
            setter(results.map(response => response.data));
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    useEffect(() => {
        // Fetch each genre's movie list
        fetchMovies(popularMovies, setRandomMovies);
        fetchMovies(actionMovieTitles, setActionMovies);
        fetchMovies(dramaMovieTitles, setDramaMovies);
        fetchMovies(comedyMovieTitles, setComedyMovies);
        fetchMovies(warMovieTitles, setWarMovies);
    }, []);

    const handleMovieClick = async (movieTitle) => {
        try {
            const response = await axios.get(`${api}t=${movieTitle}&apikey=${apiKey}`);
            setSelectedMovie(response.data);
            const trailerURL = await movieTrailer(movieTitle);
            setVideoURL(trailerURL || "");


    return (

        <div className="App">
                   <div className="vignette"></div>

         <NavBar setVideo={setVideo} handleMovieClick={handleMovieClick} />

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
 {/* Action Movies Section */}
                <div className="action-movies">
                    <h2>Action Movies</h2>
                    <div className="movie-grid">
                        {actionMovies.map((movie) => (
                            <div key={movie.imdbID} className="movie-item" onClick={() => handleMovieClick(movie.Title)}>
                                <img src={movie.Poster} alt={`${movie.Title} poster`} />
                                <p>{movie.Title}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Drama Movies Section */}
                <div className="drama-movies">
                    <h2>Drama Movies</h2>
                    <div className="movie-grid">
                        {dramaMovies.map((movie) => (
                            <div key={movie.imdbID} className="movie-item" onClick={() => handleMovieClick(movie.Title)}>
                                <img src={movie.Poster} alt={`${movie.Title} poster`} />
                                <p>{movie.Title}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Comedy Movies Section */}
                <div className="comedy-movies">
                    <h2>Comedy Movies</h2>
                    <div className="movie-grid">
                        {comedyMovies.map((movie) => (
                            <div key={movie.imdbID} className="movie-item" onClick={() => handleMovieClick(movie.Title)}>
                                <img src={movie.Poster} alt={`${movie.Title} poster`} />
                                <p>{movie.Title}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* War Movies Section */}
                <div className="war-movies">
                    <h2>War Movies</h2>
                    <div className="movie-grid">
                        {warMovies.map((movie) => (
                            <div key={movie.imdbID} className="movie-item" onClick={() => handleMovieClick(movie.Title)}>

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

                {/* Pop-up with Selected Movie Details */}
                {selectedMovie && (
                    <MoviePopup 
                        selectedMovie={selectedMovie} 
                        videoURL={videoURL} 
                        onClose={() => setSelectedMovie(null)} 
                    />
                )}
            </div>

         
      
    );
}

export default App;