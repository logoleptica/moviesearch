import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
  const { imdbID } = useParams(); // Get imdbID from the URL
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?i=${imdbID}&apikey=450e1265`
        );
        setMovieDetails(response.data);
      } catch (error) {
        console.error('Error fetching movie details', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [imdbID]);

  if (loading) return <p>Loading...</p>;

  if (!movieDetails) return <p>Movie not found.</p>;

  return (
    <div className="movie-details">
      <h2>{movieDetails.Title}</h2>
      <img src={movieDetails.Poster} alt={movieDetails.Title} />
      <p>{movieDetails.Plot}</p>
      <p>Released: {movieDetails.Released}</p>
      <p>Rating: {movieDetails.imdbRating}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default MovieDetails;
