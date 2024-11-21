import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './SearchResultsPage.css';  // Import the corresponding CSS file
import NavBar from '../NavBar.js';
import '../NavBar.css';
 
 
const SearchResultsPage = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [topRatedResults, setTopRatedResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
 
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?s=${query}&apikey=450e1265`
        );
 
        if (response.data.Response === 'True') {
          setResults(response.data.Search);
 
          // Fetch genre from the first result
          const firstMovie = response.data.Search[0];
          if (firstMovie) {
            const detailsResponse = await axios.get(
              `https://www.omdbapi.com/?i=${firstMovie.imdbID}&apikey=450e1265`
            );
 
            if (detailsResponse.data.Response === 'True') {
              const genre = detailsResponse.data.Genre.split(', ')[0]; // Use the first genre
              fetchTopRatedMoviesByGenre(genre);
            }
          }
        } else {
          setError('No results found');
        }
      } catch (error) {
        setError('Error fetching results');
      } finally {
        setLoading(false);
      }
    };
 
    const fetchTopRatedMoviesByGenre = async (genre) => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?s=${genre}&apikey=450e1265`
        );
 
        if (response.data.Response === 'True') {
          const movies = response.data.Search;
 
          // Fetch detailed info for each movie to get IMDb rating
          const detailedMovies = await Promise.all(
            movies.map(async (movie) => {
              try {
                const detailsResponse = await axios.get(
                  `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=450e1265`
                );
                return detailsResponse.data;
              } catch {
                return null; // Handle failed fetch gracefully
              }
            })
          );
 
          // Filter out any null responses and sort by IMDb rating
          const sortedMovies = detailedMovies
            .filter((movie) => movie && movie.imdbRating)
            .sort((a, b) => parseFloat(b.imdbRating) - parseFloat(a.imdbRating))
            .slice(0, 10); // Limit to top 10
 
          setTopRatedResults(sortedMovies);
        } else {
          setError('No top-rated movies found for this genre');
        }
      } catch (error) {
        setError('Error fetching top-rated movies');
      }
    };
 
    fetchSearchResults();
  }, [query]);
 
  if (loading) {
    return <div>Loading...</div>;
  }
 
  if (error) {
    return <div>{error}</div>;
  }
 
  return (
    <div className="search-results-page">
      <NavBar />
      <div className="movie-category">
        <h2>Search Results for "{query}"</h2>
        <div className="movie-cards-container">
          {results.map((movie) => (
            <div className="movie-card" key={movie.imdbID}>
              <img
                className="movie-card-image"
                src={movie.Poster}
                alt={movie.Title}
              />
              <div className="movie-card-details">
                <h4>{movie.Title}</h4>
                <p>{movie.Year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
 
      <div className="movie-category">
        <h2>Top 10 Movies in the Same Genre by IMDb Rating</h2>
        <div className="movie-cards-container">
          {topRatedResults.map((movie) => (
            <div className="movie-card" key={movie.imdbID}>
              <img
                className="movie-card-image"
                src={movie.Poster}
                alt={movie.Title}
              />
              <div className="movie-card-details">
                <h4>{movie.Title}</h4>
                <p>Rating: {movie.imdbRating}</p>
                <p>{movie.Year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SearchResultsPage;