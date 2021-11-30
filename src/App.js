import { useState, useRef, useEffect, useContext } from "react";
//Importing styles
import "./styles/app.scss";
//Importing Components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
// Importing song data
import db from "./firebase";
import { ThemeContext } from "./components/context/theme/ThemeContext";
import { useAuth } from "./components/context/AuthContext";

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
  const [theme, setTheme] = useContext(ThemeContext);
  const { currentUser } = useAuth();

  // const [theme, setTheme] = useState(
  //   localStorage.getItem("theme")
  //     ? JSON.parse(localStorage.getItem("theme"))
  //     : "light"
  // );

  // Handlers

  useEffect(() => {
    if (currentUser) {
      db.collection("users")
        .doc(currentUser.uid)
        .collection("music-list")
        .orderBy("name", "asc")
        .onSnapshot((snapshot) => {
          if (!currentSong) {
            setSongs(
              snapshot.docs.map((music, index) => {
                return {
                  id: music.id,
                  ...music.data(),
                  active: index === 0 ? true : false,
                };
              })
            );
            setCurrentSong(songs && songs[0]);
          }
        });
    } else {
      console.log(currentUser);
      db.collection("music-list")
        .orderBy("name", "asc")
        .onSnapshot((snapshot) => {
          if (!currentSong) {
            setSongs(
              snapshot.docs.map((music, index) => {
                return {
                  id: music.id,
                  ...music.data(),
                  active: index === 0 ? true : false,
                };
              })
            );
            setCurrentSong(songs && songs[0]);
          } else {
            setSongs(
              snapshot.docs.map((music, index) => {
                return {
                  id: music.id,
                  ...music.data(),
                  active: index === 0 ? true : false,
                };
              })
            );
          }
        });
    }
  }, [currentSong, currentUser]);

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
    setSongs(
      songs.map((song, index) => {
        if (index === (currentIndex + 1) % songs.length) {
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
      })
    );
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioReference.current.play();
  };

  return (
    <div className={`App ${theme}`}>
      <div className={`${libraryStatus ? "library-active" : ""}`}>
        <Nav
          libraryStatus={libraryStatus}
          setLibraryStatus={setLibraryStatus}
          showLibraryStatus={true}
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
