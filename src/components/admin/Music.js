import React from "react";
import db from "../../firebase";

const Music = ({ open, song, setOperation, setSongId }) => {
  const deleteSong = () => {
    db.collection("music-list").doc(song.id).delete();
  };

  const handleUpdateMusic = () => {
    setOperation("Update");
    setSongId(song.id);
    open();
  };
  return (
    <div className="music">
      <h3>{song && song.name}</h3>
      <button onClick={handleUpdateMusic} className="update">
        Update
      </button>
      <button onClick={deleteSong} className="delete">
        Delete
      </button>
    </div>
  );
};

export default Music;
