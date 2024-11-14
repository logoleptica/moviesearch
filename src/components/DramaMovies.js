import React from 'react';

const DramaMovies = ({ movies, handleMovieClick }) => {
    return (
        <div className="drama-movies">
            <h2>Drama Movies</h2>
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

export default DramaMovies;