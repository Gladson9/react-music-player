import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Base from "./Base";
import AddMusicModal from "./AddMusicModal";
import Music from "./Music";
import db from "../../firebase";

const AdminDashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const open = () => setOpenModal(true);
  const close = () => setOpenModal(false);

  const [operation, setOperation] = useState();
  const [songId, setSongId] = useState("");

  const [error, setError] = useState("");
  const { logout } = useAuth();
  const history = useHistory();
  const { currentUser } = useAuth();

  // getting music list from firebase
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    db.collection("users")
      .doc(currentUser.uid)
      .collection("music-list")
      .orderBy("name", "asc")
      .onSnapshot((snapshot) => {
        setSongs(
          snapshot.docs.map((music) => {
            return {
              id: music.id,
              ...music.data(),
            };
          })
        );
      });
  }, []);

  const handleLogout = () => {
    setError("");
    try {
      logout();
      history.push("/");
    } catch {
      setError("Failed to log out");
    }
  };

  const handleAddMusic = () => {
    open();
    setOperation("Add");
  };

  return (
    <Base title="Dashboard">
      <div className="admin-container">
        <h3 className="user">User: {currentUser.email.split("@")[0]}</h3>
        <div className="admin-controls">
          <button id="add" onClick={handleAddMusic}>
            Add Music
          </button>
          {/* <button id="logout" onClick={handleLogout}>
            Logout
          </button> */}
        </div>
        <div className="music-list">
          {songs.map((song) => (
            <Music
              key={song.id}
              setSongId={setSongId}
              setOperation={setOperation}
              song={song}
              open={open}
              currentUser={currentUser}
            />
          ))}
        </div>
      </div>
      {openModal && (
        <AddMusicModal
          songId={songId}
          setSongId={setSongId}
          operation={operation}
          handleOnClick={close}
        />
      )}
    </Base>
  );
};

export default AdminDashboard;
