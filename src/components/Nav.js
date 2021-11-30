import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ThemeContext } from "./context/theme/ThemeContext";
import { useAuth } from "./context/AuthContext";
import { useHistory } from "react-router";
function Nav({ libraryStatus, setLibraryStatus, showLibraryStatus = false }) {
  const [theme, setTheme] = useContext(ThemeContext);
  const { logout, currentUser } = useAuth();
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const handleLogout = () => {
    setError("");
    try {
      logout();
    } catch {
      setError("Failed to log out");
    }
  };
  return (
    <nav>
      <Link to="/">
        <h1>Waves</h1>
      </Link>
      <div className="nav-list">
        {showLibraryStatus && (
          <button
            onClick={() => {
              setLibraryStatus(!libraryStatus);
            }}
          >
            Library <FontAwesomeIcon icon={faMusic} />
          </button>
        )}

        <div
          className="theme-switcher"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? (
            <FontAwesomeIcon icon={faMoon} />
          ) : (
            <FontAwesomeIcon icon={faSun} />
          )}
        </div>
        <div className="nav-links">
          {currentUser && (
            <Link className="login" to="/dashboard">
              DASHBOARD
            </Link>
          )}
          {!currentUser && (
            <Link className="login" to="/login">
              LOG IN
            </Link>
          )}
          {currentUser && (
            <span className="logout" onClick={handleLogout}>
              LOGOUT
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
