import React from 'react';

const WarMovies = ({ movies, handleMovieClick }) => {
    return (
        <div className="war-movies">
            <h2>War Movies</h2>
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

export default WarMovies;