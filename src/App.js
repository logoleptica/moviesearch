import './App.css';
import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import movieTrailer from 'movie-trailer';
import axios from 'axios';

function App() {
    const [video, setVideo] = useState("");
    const [videoURL, setVideoURL] = useState("");
    const [randomMovies, setRandomMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const popularMovies = ["Inception", "Titanic", "Avatar", "The Matrix", "Interstellar"];

    useEffect(() => {
        const fetchRandomMovies = async () => {
            const promises = popularMovies.map(title =>
                axios.get(`http://www.omdbapi.com/?t=${title}&apikey=450e1265`)
            );
            const results = await Promise.all(promises);
            setRandomMovies(results.map(response => response.data));
        };

        fetchRandomMovies();
    }, []);

    const handleMovieClick = async (movieTitle) => {
        try {
            const response = await axios.get(`http://www.omdbapi.com/?t=${movieTitle}&apikey=450e1265`);
            setSelectedMovie(response.data);

            // Get trailer from URL for the selected movie
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