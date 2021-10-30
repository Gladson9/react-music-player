import React, { useEffect, useState } from "react";
import db from "../../firebase";
import Backdrop from "./Backdrop";

const AddMusicModal = ({
  handleOnClick,
  operation,
  songId = "",
  setSongId,
}) => {
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [audioLink, setAudioLink] = useState("");
  const [coverLink, setCoverLink] = useState("");
  const [color1, setColor1] = useState("");
  const [color2, setColor2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (operation === "Add") {
      db.collection("music-list").add({
        active: false,
        artist: artist,
        audio: audioLink,
        color: [color1, color2],
        cover: coverLink,
        name: name,
      });
    } else {
      db.collection("music-list")
        .doc(songId)
        .update({
          active: false,
          artist: artist,
          audio: audioLink,
          color: [color1, color2],
          cover: coverLink,
          name: name,
        });
    }
    setSongId("");
    handleOnClick();
  };

  const clickHandler = () => {
    setName("");
    setArtist("");
    setAudioLink("");
    setCoverLink("");
    setColor1("");
    setColor2("");
    setSongId("");
    handleOnClick();
  };

  useEffect(() => {
    if (songId) {
      db.collection("music-list")
        .doc(songId)
        .get()
        .then((music) => {
          setName(music.data().name);
          setArtist(music.data().artist);
          setCoverLink(music.data().cover);
          setAudioLink(music.data().audio);
          setColor1(music.data().color[0]);
          setColor2(music.data().color[1]);
        });
    }
  }, [songId]);

  return (
    <Backdrop onClick={clickHandler}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{operation} Music</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Music Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Artist Name"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Audio Link"
            value={audioLink}
            onChange={(e) => setAudioLink(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Cover Image Link"
            value={coverLink}
            onChange={(e) => setCoverLink(e.target.value)}
            required
          />
          <div className="color-group">
            <label htmlFor="">Select Color:</label>
            <input
              type="color"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
            />
            <input
              type="color"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
            />
          </div>
          <button type="submit">{operation}</button>
        </form>
      </div>
    </Backdrop>
  );
};

export default AddMusicModal;
