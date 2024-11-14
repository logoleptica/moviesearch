import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './SearchBar.css';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");             // User input
  const [debouncedQuery, setDebouncedQuery] = useState(""); // Debounced query to trigger API
  const [suggestions, setSuggestions] = useState([]);  // Movie suggestions with ratings
  const [isLoading, setIsLoading] = useState(false);   // Loading state for suggestions
  const [error, setError] = useState("");              // Error state if no results
  const cache = useRef({}); // Ref for caching previous search results

  const debounceTimeout = 500; // 500ms delay for debouncing

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), debounceTimeout);
    return () => clearTimeout(timer); // Clear timer on each new keystroke
  }, [query]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedQuery.trim().length === 0) {
        setSuggestions([]);
        setError("");
        setIsLoading(false);
        return;
      }

      if (cache.current[debouncedQuery]) {
        setSuggestions(cache.current[debouncedQuery]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true); // Show loading indicator while fetching
      setError("");

      try {
        const response = await axios.get(`https://www.omdbapi.com/?s=${debouncedQuery}&apikey=450e1265`);

        if (response.data.Response === "True") {
          const suggestionsWithDetails = await Promise.all(
            response.data.Search.map(async (movie) => {
              try {
                const detailsResponse = await axios.get(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=450e1265`);
                const details = detailsResponse.data;
                return details.imdbRating
                  ? { ...movie, imdbRating: details.imdbRating }
                  : null;  // Return null if rating is missing
              } catch (detailsError) {
                console.error(`Error fetching details for ${movie.Title}:`, detailsError);
                return null;  // Return null if there’s an error fetching details
              }
            })
          );

          const validSuggestions = suggestionsWithDetails.filter(Boolean);
          cache.current[debouncedQuery] = validSuggestions; // Cache results
          setSuggestions(validSuggestions);
        } else {
          setSuggestions([]);
          setError("No results found");
        }
      } catch (searchError) {
        console.error("Error fetching movie suggestions:", searchError);
        setError("Error fetching suggestions. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  const handleInputChange = (e) => setQuery(e.target.value);

  const handleSuggestionClick = (title) => {
    setQuery(title);  // Set the selected suggestion as the input query
    onSearch(title);  // Trigger search action in App.js
    setQuery(" ");
    setSuggestions([]); // Clear suggestions dropdown after selection
    setError("");       // Clear error message after selection
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Enter movie title..."
      />
      <button onClick={() => onSearch(query)}>Search</button>

      {isLoading && <div>Loading...</div>}
      {error && <div className="error-message">{error}</div>}

      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((movie) => (
            <div
              key={movie.imdbID}
              onClick={() => handleSuggestionClick(movie.Title)}
              className="suggestion-item"
            >
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "default-image.jpg"}
                alt={`${movie.Title} poster`}
                className="poster-image"
              />
              <div className="suggestion-details">
                <h4>{movie.Title}</h4>
                <p>{movie.Year}</p>
                <p>Rating: {movie.imdbRating || 'N/A'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;