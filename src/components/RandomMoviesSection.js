import React from 'react';

const RandomMoviesSection = ({ randomMovies, handleMovieClick }) => {
    return (
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
    );
};

export default RandomMoviesSection;
