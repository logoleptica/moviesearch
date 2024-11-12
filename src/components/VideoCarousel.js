import React from 'react';
import Slider from 'react-slick';
import ReactPlayer from 'react-player';
import './VideoCarousel.css'; // Import your CSS file for styling

const VideoCarousel = ({ videos }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="video-carousel">
            <Slider {...settings}>
                {videos.map((video, index) => (
                    <div key={index} className="video-slide">
                        <ReactPlayer url={video.url} controls={true} width="100%" height="50vh" /> {/* Set height to half of viewport height */}
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default VideoCarousel;