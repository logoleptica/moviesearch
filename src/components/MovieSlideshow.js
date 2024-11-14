import React from 'react';

const MovieSlideshow = ({ movies }) => {
    return (
        <div className="movie-slideshow">
            {movies.map(movie => (
                <div key={movie.Title}>
                    <img src={movie.Poster} alt={`${movie.Title} poster`} />
                    <p>{movie.Title}</p>
                </div>
            ))}
        </div>
    );
};

export default MovieSlideshow;