import React, { useEffect, useState } from "react";
import db from "../../firebase";
import { useAuth } from "../context/AuthContext";
import Backdrop from "./Backdrop";
import { WidgetLoader, Widget } from "react-cloudinary-upload-widget";

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
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && artist && audioLink && coverLink) {
      if (operation === "Add") {
        db.collection("users")
          .doc(currentUser.uid)
          .collection("music-list")
          .add({
            active: false,
            artist: artist,
            audio: audioLink,
            color: [color1, color2],
            cover: coverLink,
            name: name,
          });
      } else {
        db.collection("users")
          .doc(currentUser.uid)
          .collection("music-list")
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
    } else {
      setError("Add all fields.");
    }
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
      db.collection("users")
        .doc(currentUser.uid)
        .collection("music-list")
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

  // const successCallBack = (result) => {
  //   // console.log(result.info);
  //   setCoverLink(result.info.secure_url);
  // };
  // const failureCallBack = (response) => {
  //   console.log(response);
  // };
  useEffect(() => {
    // This package doesnt set a type for the button
    // this means when we click on the add photo button the
    // form is submitted because modern browsers assume a button
    // is a submit by default. This meant that each time you tried to
    // add an image the form would submit. Drama llama.s
    if (document && document.querySelector("#cloudinary_upload_button")) {
      document
        .getElementById("cloudinary_upload_button")
        .setAttribute("type", "button");
    }
  }, []);

  // const showWidgetImage = () => (
  //   <Widget
  //     sources={["local", "url"]} // set the sources available for uploading -> by default
  //     // all sources are available. More information on their use can be found at
  //     // https://cloudinary.com/documentation/upload_widget#the_sources_parameter
  //     // add source keys
  //     // and ID's as an object. More information on their use can be found at
  //     // https://cloudinary.com/documentation/upload_widget#the_sources_parameter
  //     resourceType={"image"} // optionally set with 'auto', 'image', 'video' or 'raw' -> default = 'auto'
  //     cloudName={"dhdicj3jj"} // your cloudinary account cloud name.
  //     // Located on https://cloudinary.com/console/
  //     uploadPreset={"c2y1bbt2"} // check that an upload preset exists and check mode is signed or unisgned
  //     // uploadPreset={"preset1"} // check that an upload preset exists and check mode is signed or unisgned
  //     buttonText={"Upload Image"} // default 'Upload Files'
  //     buttonType="button"
  //     style={{
  //       color: "white",
  //       border: "none",
  //       width: "120px",
  //       backgroundColor: "#38c0ff",
  //       padding: "0.5rem 1.5rem",
  //       borderRadius: "2rem",
  //       marginLeft: "1rem",
  //     }} // inline styling only or style id='cloudinary_upload_button'
  //     folder={"my_folder"} // set cloudinary folder name to send file
  //     cropping={false} // set ability to crop images -> default = true
  //     onSuccess={successCallBack} // add success callback -> returns result
  //     onFailure={failureCallBack} // add failure callback -> returns 'response.error' + 'response.result'
  //     logging={false} // logs will be provided for success and failure messages,
  //     // set to false for production -> default = true
  //     customPublicId={"sample"} // set a specific custom public_id.
  //     // To use the file name as the public_id use 'use_filename={true}' parameter
  //     eager={"w_400,h_400,c_crop"} // add eager transformations -> deafult = null
  //     use_filename={false} // tell Cloudinary to use the original name of the uploaded
  //     // file as its public ID -> default = true,
  //   />
  // );

  const successCallBack = (result) => {
    if (result.event === "success") {
      if (result.info.is_audio === true) {
        setAudioLink(result.info.secure_url);
      }
    }
    console.log(result.info);
  };
  const failureCallBack = (response) => {
    console.log(response);
  };
  const openWidget1 = (type) => (
    <Widget
      onClick={(e) => e.preventDefault()}
      sources={["local", "url"]} // set the sources available for uploading -> by default
      // all sources are available. More information on their use can be found at
      // https://cloudinary.com/documentation/upload_widget#the_sources_parameter
      // add source keys
      // and ID's as an object. More information on their use can be found at
      // https://cloudinary.com/documentation/upload_widget#the_sources_parameter
      resourceType={"auto"} // optionally set with 'auto', 'image', 'video' or 'raw' -> default = 'auto'
      cloudName={"dhdicj3jj"} // your cloudinary account cloud name.
      // Located on https://cloudinary.com/console/
      uploadPreset={"c2y1bbt2"} // check that an upload preset exists and check mode is signed or unisgned
      // uploadPreset={"preset1"} // check that an upload preset exists and check mode is signed or unisgned
      buttonText={`Upload ${type}`} // default 'Upload Files'
      buttonType="button"
      style={{
        color: "white",
        border: "none",
        width: "120px",
        backgroundColor: "#38c0ff",
        padding: "0.5rem 1.5rem",
        borderRadius: "2rem",
        marginLeft: "1rem",
      }} // inline styling only or style id='cloudinary_upload_button'
      folder={"my_folder"} // set cloudinary folder name to send file
      onSuccess={successCallBack} // add success callback -> returns result
      onFailure={failureCallBack} // add failure callback -> returns 'response.error' + 'response.result'
      logging={false} // logs will be provided for success and failure messages,
      // set to false for production -> default = true
      customPublicId={"sample"} // set a specific custom public_id.
      // To use the file name as the public_id use 'use_filename={true}' parameter
      use_filename={false} // tell Cloudinary to use the original name of the uploaded
      // file as its public ID -> default = true,
    />
  );

  const openWidget = () => {
    // create the widget
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dhdicj3jj",
        uploadPreset: "c2y1bbt2",
        sources: ["local", "url"],
      },
      (error, result) => {
        if (result.event === "success") {
          if (result.info.is_audio === true) {
            setAudioLink(result.info.secure_url);
            console.log(result.info);
          } else if (result.info.resource_type === "image") {
            setCoverLink(result.info.secure_url);
          } else {
            setError("Invalid Format");
          }
          console.log(result.info);
        }
      }
    );
    widget.open(); // open up the widget after creation
  };
  return (
    <Backdrop onClick={clickHandler}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <WidgetLoader />
        <h2>{operation} Music</h2>
        {error && <h4 className="error">{error}</h4>}
        <form>
          <input
            type="text"
            placeholder="Music Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Artist Name"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
          <div>
            <input
              type="text"
              placeholder="Audio Link"
              value={audioLink}
              onChange={(e) => setAudioLink(e.target.value)}
            />
            <button className="btn" type="button" onClick={openWidget}>
              Upload Audio
            </button>
            {/* {openWidget()} */}
          </div>
          <div>
            <input
              type="text"
              placeholder="Cover Image Link"
              value={coverLink}
              onChange={(e) => setCoverLink(e.target.value)}
            />
            <button className="btn" type="button" onClick={openWidget}>
              Upload Image
            </button>
            {/* {openWidget()} */}
          </div>
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
          <button onClick={handleSubmit} type="submit">
            {operation}
          </button>
        </form>
      </div>
    </Backdrop>
  );
};

export default AddMusicModal;
