import React, { useContext } from "react";
import { ThemeContext } from "../context/theme/ThemeContext";
import Nav from "../Nav";

const Base = ({ title = "", children }) => {
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <div className={`base ${theme}`}>
      <Nav />
      <h2 className="title">{title}</h2>
      <div className="container">{children}</div>
    </div>
  );
};

export default Base;
