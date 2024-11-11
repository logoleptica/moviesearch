// components/MovieItem.js
import React from 'react';

function MovieItem({ movie }) {
  const { Title, Year, Poster, imdbID } = movie;

  return (
    <div>
      <img
        src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/150"}
        alt={Title}
      />
      <h3>{Title} ({Year})</h3>
      <a
        href={`https://www.imdb.com/title/${imdbID}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        View on IMDb
      </a>
    </div>
  );
}

export default MovieItem;
