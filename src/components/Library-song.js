import React from "react";
import { playAudio } from "../util";
function LibrarySong({
  song,
  setCurrentSong,
  songs,
  id,
  audioReference,
  isPlaying,
  setSongs,
}) {
  const songSelectHandler = () => {
    // const selectedSong = songs.filter((state) => state.id === id);
    setCurrentSong(song);
    // updating active state
    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });

    setSongs(newSongs);
    //check if the song is playing
    playAudio(isPlaying, audioReference);
  };
  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img alt={song.name} src={song.cover} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
}

export default LibrarySong;
