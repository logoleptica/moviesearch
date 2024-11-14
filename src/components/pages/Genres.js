import React from 'react';
import MovieSlideshow from '../MovieSlideshow'; // Adjust path if necessary

const Genres = () => {
    const actionMovies = [
        { Title: "Mad Max: Fury Road", Poster: "https://example.com/madmax.jpg" },
        { Title: "John Wick", Poster: "https://example.com/johnwick.jpg" },
        { Title: "Die Hard", Poster: "https://example.com/diehard.jpg" }
    ];

    return (
        <div>
            <h1>Action Movies</h1>
            <MovieSlideshow movies={actionMovies} />
        </div>
    );
};

export default Genres;