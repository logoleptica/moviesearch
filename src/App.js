import './App.css';
import { useState, useEffect, useCallback } from 'react';
import ReactPlayer from 'react-player';
import movieTrailer from 'movie-trailer';
import axios from 'axios';
import NavBar from './components/NavBar';
import MoviePopup from './components/MoviePopup';
import VideoCarousel from './components/VideoCarousel';

function App() {
    const [video, setVideo] = useState("Inception");
    const [videoURL, setVideoURL] = useState("");
    const [movieDetails, setMovieDetails] = useState({});
    const [randomMovies, setRandomMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const api = "https://www.omdbapi.com/?";
    const apiKey = "450e1265";

    const fetchMovieDetails = useCallback(async (title) => {
        try {
            const response = await axios.get(`${api}t=${title}&apikey=${apiKey}`);
            if (response.data && response.data.Response === "True") {
                setMovieDetails(response.data);
                fetchYouTubeTrailer(title);
                return response.data; // Return the response data
            } else {
                console.warn("No details found for this movie");
                setMovieDetails({});
            }
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    }, []);

    const fetchYouTubeTrailer = (title) => {
        const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
        axios.get("https://www.googleapis.com/youtube/v3/search", {
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
                setVideoURL(trailerUrl);
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

    const fetchRandomMovies = async () => {
        try {
            const response = await axios.get(`https://www.omdbapi.com/?s=batman&apikey=${apiKey}`);
            if (response.data.Response === "True") {
                setRandomMovies(response.data.Search);
            }
        } catch (error) {
            console.error("Error fetching random movies:", error);
        }
    };

    const handleSearch = (title) => {
        setVideo(title);
        fetchMovieDetails(title);
    };

    const handleMovieClick = async (movieTitle) => {
        try {
            const movieData = await fetchMovieDetails(movieTitle); // Fetch movie details
            setSelectedMovie(movieData); // Use fetched data directly
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    };

    const closePopup = () => {
        setSelectedMovie(null);
    };

    useEffect(() => {
        fetchRandomMovies();
        fetchMovieDetails(video);
    }, [fetchMovieDetails, video]);

    return (
        <div className="App">
            <NavBar onSearch={handleSearch} />
            <h1>{movieDetails.Title}</h1>
            <div>
                <p>Year: {movieDetails.Year}</p>
                <p>Rating: {movieDetails.imdbRating || 'N/A'}</p>
                {videoURL && <ReactPlayer url={videoURL} controls={true} />}
                
                {/* Video Carousel */}
                <VideoCarousel videos={[{ url: 'https://www.youtube.com/watch?v=6vzAQoi607E' },
                    { url: 'https://www.youtube.com/watch?v=uUKhg_VG_Es' },
                    { url: 'https://www.youtube.com/watch?v=_H1G9BsxhDw' },
                    { url: 'https://www.youtube.com/watch?v=zLCbQ9EQmO8' },
                    { url: 'https://www.youtube.com/watch?v=ORdhNaXSrGA' },]} />
                
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
    );
}

export default App;