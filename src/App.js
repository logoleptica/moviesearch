import './App.css';
import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import movieTrailer from 'movie-trailer';
import axios from 'axios';

function App() {
    const [video, setVideo] = useState("");
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
            setSelectedMovie(response.data);

            // Get trailer URL specifically for the selected movie
            const trailerURL = await movieTrailer(movieTitle);
            setVideoURL(trailerURL);
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    };

    return (
        <div className="App">
            <div className="search-box">
                <label>Search for any movies/shows:</label>
                <input type="text" onChange={(e) => { setVideo(e.target.value) }} />
                <button onClick={() => handleMovieClick(video)}>Search</button>
            </div>

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
                <div className="movie-popup">
                    <div className="movie-popup-content">
                        <button className="close-btn" onClick={() => setSelectedMovie(null)}>Close</button>
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
    );
}

export default App;
