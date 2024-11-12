// src/components/MovieList/MovieItem/MovieItem.js
import React from 'react';

const MovieItem = ({ movie, onClick }) => {
    return (
        <div className="movie-item" onClick={() => onClick(movie.Title)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <p>{movie.Title}</p>
        </div>
    );
};

export default MovieItem;