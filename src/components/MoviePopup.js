// src/components/MoviePopup.js
import React from 'react';
import ReactPlayer from 'react-player';

const MoviePopup = ({ movie, videoURL, onClose }) => (
    <div className="movie-popup">
        <div className="movie-popup-content">
            <button className="close-btn" onClick={onClose}>Close</button>
            <h1>{movie.Title}</h1>
            <p><strong>Year:</strong> {movie.Year}</p>
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Runtime:</strong> {movie.Runtime}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
            <p><strong>Cast:</strong> {movie.Actors}</p>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            {videoURL && (
                <div className="video-player">
                    <h2>Trailer</h2>
                    <ReactPlayer url={videoURL} controls={true} />
                </div>
            )}
        </div>
    </div>
);

export default MoviePopup;
