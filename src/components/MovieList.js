import React from 'react';
import MovieItem from './MovieItem';

const MovieList = ({ movies, handleMovieClick }) => {
    return (
        <div className="movie-grid">
            {movies.map((movie) => (
                <MovieItem key={movie.imdbID} movie={movie} 
                onClick={handleMovieClick} />
            ))}
        </div>
    );
};

export default MovieList;