import React from 'react';
import ReactPlayer from 'react-player';
import './MoviePopup.css';

const MoviePopup = ({ selectedMovie, videoURL, onClose }) => {
    if (!selectedMovie) return null;

    return (
        <div className="movie-popup">
            <div className="movie-popup-content">
                <button className="close-btn" onClick={onClose}>Close</button>
                <div className="movie-info-container">
                    <div className="movie-details">
                        <h1>{selectedMovie.Title}</h1>
                        <p><strong>Year:</strong> {selectedMovie.Year}</p>
                        <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
                        <p><strong>Runtime:</strong> {selectedMovie.Runtime}</p>
                        <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
                        <p><strong>Cast:</strong> {selectedMovie.Actors}</p>
                        <img
                            src={selectedMovie.Poster}
                            alt={`${selectedMovie.Title} poster`}
                            className="movie-poster"
                        />
                    </div>
                    {videoURL && (
                        <div className="movie-video">
                            <h2>Trailer</h2>
                            <ReactPlayer url={videoURL} controls={true} className="react-player" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MoviePopup;
