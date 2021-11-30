import React, { useRef, useState } from "react";
import Base from "./Base";

import { Redirect, useHistory } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import db from "../../firebase";

const SignIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { currentUser, login, loadMusicToAccount } = useAuth();
  const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);
  const history = useHistory();

  const signin = (e) => {
    e.preventDefault();
    login(emailRef.current.value, passwordRef.current.value)
      .then((user) => {
        history.push("/dashboard");
      })
      .catch((err) => setError("Failed to log in"));
    if (error) {
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const guestLoginHandler = (e) => {
    e.preventDefault();
    login("guest@gmail.com", "guest123")
      .then((user) => {
        history.push("/dashboard");
      })
      .catch((err) => setError("Failed to log in"));
    setTimeout(() => {
      setError("");
    }, 5000);
  };
  return !currentUser ? (
    <Base title="Log In">
      <form onSubmit={signin}>
        {error && <h2>{error}</h2>}
        <input
          type="email"
          className="login-input"
          placeholder="Email"
          ref={emailRef}
          required={true}
        />
        <input
          type="password"
          className="login-input"
          placeholder="Password"
          ref={passwordRef}
          required
        />
        <button onClick={signin} type="submit">
          Login
        </button>
        <button onClick={guestLoginHandler}>Log in as guest</button>
        <p>
          Dont have an account?{" "}
          <Link className="link" to="/signup">
            Sign up
          </Link>
        </p>
      </form>
    </Base>
  ) : (
    <Redirect to="/dashboard" />
  );
};

export default SignIn;
