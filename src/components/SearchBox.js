// Inside src/components/SearchBox.js
import React, { useState } from 'react';
import './SearchBox.css';

function SearchBox({ setVideo, handleMovieClick }) {
    const [inputValue, setInputValue] = useState(""); // Local state for input value

    const handleChange = (e) => {
        setInputValue(e.target.value); // Update local state with input value
        setVideo(e.target.value); // Update parent state with input value
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        if (inputValue) {
            handleMovieClick(inputValue); // Call the movie click handler with the input value
            setInputValue(""); // Clear input after submission
        }
    };

    return (
        <form onSubmit={handleSubmit} className="search-box">
            <input
                type="text"
                value={inputValue} // Use local state for input value
                onChange={handleChange} // Update local state on change
                placeholder="Search for a movie..."
            />
            <button type="submit">Search</button> {/* Change to type="submit" */}
        </form>
    );
}

export default SearchBox;