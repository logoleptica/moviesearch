import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import CSS for styling

const NavBar = () => {
    return (
        <div className="nav-container">
            <div className="nav-content">
                <nav className="nav">
                    <Link to="/" className="nav-button">Home</Link>
                    <Link to="/genres" className="nav-button">Genres</Link>
                    <Link to="/signup" className="nav-button">Sign Up</Link>
                </nav>
            </div>
        </div>
    );
};

export default NavBar;