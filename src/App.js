import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactPlayer from 'react-player';
import movieTrailer from 'movie-trailer';
import axios from 'axios';
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
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    };

    return (
        
            <div className="App">
             <div className="vignette"></div>

                <NavBar setVideo={setVideo} handleMovieClick={handleMovieClick} />
            

                {/* Video Carousel */}
                <VideoCarousel videos={[{ url: 'https://www.youtube.com/watch?v=6vzAQoi607E' },
                     { url: 'https://www.youtube.com/watch?v=uUKhg_VG_Es' } ,
                     { url: 'https://www.youtube.com/watch?v=_H1G9BsxhDw' },
                     { url: 'https://www.youtube.com/watch?v=zLCbQ9EQmO8' },
                     { url: 'https://www.youtube.com/watch?v=ORdhNaXSrGA' },]} />
                
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