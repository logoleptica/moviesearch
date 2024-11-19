import React from "react";
import NavBar from "./NavBar";

const Genres = ({ setVideo, handleMovieClick }) => {
  return (
    <>
      <NavBar setVideo={setVideo} handleMovieClick={handleMovieClick} />
      <div className="genres-container">
        <h2>Genres Page</h2>
        <p>Explore movies by genre.</p>
      </div>
    </>
  );
};

export default Genres;
