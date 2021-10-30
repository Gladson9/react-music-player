import React, { useRef, useState } from "react";
import Base from "./Base";

import { Redirect, useHistory } from "react-router";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { currentUser, login } = useAuth();
  const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);
  const history = useHistory();

  const signin = (e) => {
    e.preventDefault();
    login(emailRef.current.value, passwordRef.current.value)
      .then((user) => {
        history.push("/admin/dashboard");
      })
      .catch((err) => setError("Failed to log in"));
  };
  return !currentUser ? (
    <Base title="Admin Sign In">
      {error && <h2>{error}</h2>}
      <form onSubmit={signin}>
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
      </form>
    </Base>
  ) : (
    <Redirect to="/admin/dashboard" />
  );
};

export default SignIn;
