import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
function Nav({ libraryStatus, setLibraryStatus, setTheme, theme }) {
  return (
    <nav>
      <h1>Waves</h1>

      <div className="nav-list">
        <button
          onClick={() => {
            setLibraryStatus(!libraryStatus);
          }}
        >
          Library <FontAwesomeIcon icon={faMusic} />
        </button>

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
      </div>
    </nav>
  );
}

export default Nav;
