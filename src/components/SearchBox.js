// Inside src/components/SearchBox.js

function SearchBox({ setVideo, handleMovieClick, video }) {
    return (
        <div className="search-box">
            <input
                type="text"
                value={video}
                onChange={(e) => setVideo(e.target.value)}
            />
            <button onClick={() => handleMovieClick(video)}>Search</button>
        </div>
    );
}

export default SearchBox;
