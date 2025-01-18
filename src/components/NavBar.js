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
                    <Link to="/genres" className="nav-button">Genres</Link>
                   
                     <Link to="/Login" className="nav-button">Sign in</Link>

                </nav>
                
            </div>
            
        </div>
    );
};

export default NavBar;