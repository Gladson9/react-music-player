import React from "react";
function Song({ currentSong, isPlaying }) {
  return (
    <div className="song-container">
      <img
        alt={currentSong && currentSong.name}
        src={currentSong && currentSong.cover}
        className={isPlaying ? "spin-animation" : ""}
      />
      <h2>{currentSong && currentSong.name}</h2>
      <h3>{currentSong && currentSong.artist}</h3>
    </div>
  );
}

export default Song;
