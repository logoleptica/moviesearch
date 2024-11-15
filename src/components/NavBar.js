import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import CSS for styling
import SearchBox from './SearchBox';

const NavBar = ({ setVideo, handleMovieClick }) => {
    return (
        <div className="nav-container">
            <div className="nav-content">
                <nav className="nav">
                    <Link to="/" className="nav-button">Home</Link>
                    <Link to="/genres" className="nav-button">Genres</Link> {/* Link to Genres */}
                    <Link to="/signup" className="nav-button">Sign Up</Link> {/* Link to Sign Up */}
                    {/* Integrate SearchBox */}
                    <SearchBox setVideo={setVideo} handleMovieClick={handleMovieClick} />
                </nav>
            </div>
        </div>
    );
};

export default NavBar;