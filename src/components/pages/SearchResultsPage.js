import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link
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
        } else {
          setError('No results found');
        }
      } catch (error) {
        setError('Error fetching results');
      } finally {
        setLoading(false);
      }
    };

    const fetchTopRatedResults = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?s=${query}&apikey=450e1265`
        );

        if (response.data.Response === 'True') {
          setTopRatedResults(response.data.Search); // Adjust this to top-rated query if needed
        } else {
          setError('Error fetching top-rated movies');
        }
      } catch (error) {
        setError('Error fetching top-rated movies');
      }
    };

    fetchSearchResults();
    fetchTopRatedResults();
  }, [query]);

  return (
    <div className="search-results-page">
      <NavBar />
      <h1>Search Results for: {query}</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/* Search results grid */}
      <div className="movie-category">
        <h2>Top Results</h2>
        <div className="movie-cards-container">
          {results.map((movie) => (
            <Link key={movie.imdbID} to={`/movie/${movie.imdbID}`} className="movie-card"> {/* Wrap with Link */}
              <img
                className="movie-card-image"
                src={movie.Poster !== 'N/A' ? movie.Poster : 'default-image.jpg'}
                alt={`${movie.Title} poster`}
              />
              <div className="movie-card-details">
                <h4>{movie.Title}</h4>
                <p>{movie.Year}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

   
    </div>
  );
};

export default SearchResultsPage;