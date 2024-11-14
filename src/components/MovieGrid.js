import React from 'react';

const MovieGrid = ({ movies, handleMovieClick, title }) => {
    return (
        <div className="movie-section">
            <h2>{title}</h2>
            <div className="movie-grid">
                {movies.map((movie) => (
                    <div key={movie.imdbID} className="movie-item" onClick={() => handleMovieClick(movie.Title)}>
                        <img src={movie.Poster} alt={`${movie.Title} poster`} />
                        <p>{movie.Title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieGrid;