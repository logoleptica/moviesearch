import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';
import movieTrailer from 'movie-trailer';

const MovieDetails = () => {
    const { title } = useParams();
    const [movieData, setMovieData] = useState(null);
    const [trailerURL, setTrailerURL] = useState("");

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`https://www.omdbapi.com/?t=${title}&apikey=450e1265`);
                setMovieData(response.data);

                // Get trailer URL
                const trailerURL = await movieTrailer(title);
                setTrailerURL(trailerURL);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };

        fetchMovieDetails();
    }, [title]);

    if (!movieData) return <div>Loading...</div>;

    return (
        <div className="movie-details">
            <h1>{movieData.Title}</h1>
            <p><strong>Year:</strong> {movieData.Year}</p>
            <p><strong>Genre:</strong> {movieData.Genre}</p>
            <p><strong>Runtime:</strong> {movieData.Runtime}</p>
            <p><strong>Plot:</strong> {movieData.Plot}</p>
            <p><strong>Cast:</strong> {movieData.Actors}</p>
            <img src={movieData.Poster} alt={`${movieData.Title} poster`} />
            {trailerURL && (
                <div className="video-player">
                    <h2>Trailer</h2>
                    <ReactPlayer url={trailerURL} controls={true} />
                </div>
            )}
        </div>
    );
};

export default MovieDetails;