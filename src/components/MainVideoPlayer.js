import React from 'react';
import ReactPlayer from 'react-player';

const MainVideoPlayer = ({ randomTrailerURL }) => {
    return (
        randomTrailerURL && (
            <div className="main-video">
                <h2>Featured Trailer</h2>
                <div className="player-wrapper">
                    <ReactPlayer url={randomTrailerURL} controls={true} width="100%" height="400px" />
                </div>
            </div>
        )
    );
};

export default MainVideoPlayer;
