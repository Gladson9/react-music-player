import { useState, useRef, useEffect } from "react";
//Importing styles
import "./styles/app.scss";
//Importing Components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
// Importing song data
import db from "./firebase";

function App() {
  //reference
  const audioReference = useRef(null);
  //State
  const [songs, setSongs] = useState();
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  const [libraryStatus, setLibraryStatus] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme")
      ? JSON.parse(localStorage.getItem("theme"))
      : "light"
  );

  // Handlers

  useEffect(() => {
    db.collection("music-list")
      .orderBy("name", "asc")
      .onSnapshot((snapshot) => {
        setSongs(
          snapshot.docs.map((music, index) => {
            return {
              id: music.id,
              ...music.data(),
              active: index === 0 ? true : false,
            };
          })
        );
        if (!currentSong) {
          setCurrentSong(songs && songs[0]);
        }
      });
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animationPercentage = Math.round(
      (roundedCurrent / roundedDuration) * 100
    );
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercentage,
    });
  };
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioReference.current.play();
  };

  return (
    <div className={`App ${theme}`}>
      <div className={`${libraryStatus ? "library-active" : ""}`}>
        <Nav
          libraryStatus={libraryStatus}
          setLibraryStatus={setLibraryStatus}
          setTheme={setTheme}
          theme={theme}
        />
        <Song currentSong={currentSong} isPlaying={isPlaying} />
        <Player
          audioReference={audioReference}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentSong={currentSong}
          setSongInfo={setSongInfo}
          songInfo={songInfo}
          songs={songs}
          setCurrentSong={setCurrentSong}
          setSongs={setSongs}
        />
        <Library
          audioReference={audioReference}
          songs={songs}
          setCurrentSong={setCurrentSong}
          isPlaying={isPlaying}
          setSongs={setSongs}
          libraryStatus={libraryStatus}
          theme={theme}
        />
        <audio
          onTimeUpdate={timeUpdateHandler}
          onLoadedMetadata={timeUpdateHandler}
          ref={audioReference}
          src={currentSong && currentSong.audio}
          onEnded={songEndHandler}
        />
      </div>
    </div>
  );
}

export default App;
