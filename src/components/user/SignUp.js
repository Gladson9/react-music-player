import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Base from "./Base";
import { Redirect, useHistory } from "react-router";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const { currentUser, signup, loadMusicToAccount } = useAuth();
  const [error, setError] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const signUpHandler = (e) => {
    e.preventDefault();
    if (passwordRef.current.value === confirmPasswordRef.current.value) {
      signup(emailRef.current.value, passwordRef.current.value)
        .then((user) => {
          loadMusicToAccount(user);
          // history.push("/login");
        })
        .catch((err) => {
          setError(err.message);
          // console.log(err);
        });
    } else {
      setError("Confirm Password does not match.");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return !currentUser ? (
    <Base title="Sign Up">
      <form onSubmit={signUpHandler}>
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
        <input
          type="password"
          className="login-input"
          placeholder="Confirm Password"
          ref={confirmPasswordRef}
          required
        />
        <button onClick={signUpHandler} type="submit">
          Sign Up
        </button>
        <p>
          Already have an account?{" "}
          <Link className="link" to="/login">
            Log In
          </Link>
        </p>
      </form>
    </Base>
  ) : (
    <Redirect to="/dashboard" />
  );
};

export default SignUp;
