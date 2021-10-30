import React from "react";
import LibrarySong from "./Library-song";
function Library({
  songs,
  setCurrentSong,
  audioReference,
  isPlaying,
  setSongs,
  libraryStatus,
}) {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs &&
          songs.map((song) => (
            <LibrarySong
              songs={songs}
              song={song}
              setCurrentSong={setCurrentSong}
              key={song.id}
              id={song.id}
              audioReference={audioReference}
              isPlaying={isPlaying}
              setSongs={setSongs}
            />
          ))}
      </div>
    </div>
  );
}

export default Library;
