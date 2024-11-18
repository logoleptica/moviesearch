import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactPlayer from 'react-player';
import movieTrailer from 'movie-trailer';
import axios from 'axios';
import NavBar from './NavBar';
import MoviePopup from './MoviePopup';
import VideoCarousel from './VideoCarousel';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";



function Genres () {
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

 const popularMovies = [
    "The Avengers", 
    "Black Panther", 
    "Frozen II", 
    "Spider-Man: No Way Home", 
    "The Lion King", 
    "Joker", 
    "Avengers: Endgame", 
    "Top Gun: Maverick", 
    "Dune"
];

const actionMovieTitles = [
    "Mission: Impossible - Fallout", 
    "The Raid: Redemption", 
    "Gladiator", 
    "Casino Royale", 
    "Kill Bill: Vol. 1", 
    "Atomic Blonde", 
    "The Bourne Ultimatum", 
    "300", 
    "Spider-Man: Into the Spider-Verse"
];

const dramaMovieTitles = [
    "A Beautiful Mind", 
    "Good Will Hunting", 
    "Schindler's List", 
    "Boyhood", 
    "La La Land", 
    "Moonlight", 
    "There Will Be Blood", 
    "Spotlight", 
    "The King's Speech"
];

const comedyMovieTitles = [
    "Mean Girls", 
    "Tropic Thunder", 
    "Idiocracy", 
    "Napoleon Dynamite", 
    "Knives Out", 
    "Ferris Bueller's Day Off", 
    "Zombieland", 
    "The Grand Budapest Hotel", 
    "Shrek"
];

const warMovieTitles = [
    "Dunkirk", 
    "Fury", 
    "The Bridge on the River Kwai", 
    "Hacksaw Ridge", 
    "Enemy at the Gates", 
    "Paths of Glory", 
    "Patton", 
    "Apocalypse Now", 
    "Midway"
];

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
        
            <div className="Genres">
             <div className="vignette"></div>

                <NavBar setVideo={setVideo} handleMovieClick={handleMovieClick} />
            

                {/* Video Carousel */}
                <VideoCarousel videos={[{ url: 'https://www.youtube.com/watch?v=fiyOyy_3k5E' },
                     { url: 'https://www.youtube.com/watch?v=z6f5sFf2YmQ&t=1s' } ,
                     { url: 'https://www.youtube.com/watch?v=3JpKnfkgFf4' },
                     { url: 'https://www.youtube.com/watch?v=lZybaHBvs4g' },
                     { url: 'https://www.youtube.com/watch?v=Nqwn5Y_Y4xs' },]} />
                
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
 {/* Video Carousel */}
                <VideoCarousel videos={[{ url: 'https://www.youtube.com/watch?v=I23EDubKvZU' },
                     { url: 'https://www.youtube.com/watch?v=rxRub3zSa9Q' } ,
                     { url: 'https://www.youtube.com/watch?v=Fg_bhwsRfOQ' },
                     { url: 'https://www.youtube.com/watch?v=MD7v0-igVIM' },
                     { url: 'https://www.youtube.com/watch?v=y3CtNL6RTOY' },]} />
                
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

export default Genres;