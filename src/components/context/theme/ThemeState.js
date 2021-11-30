import { useState } from "react";
import { ThemeContext } from "./ThemeContext";

export const ThemeState = (props) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme")
      ? JSON.parse(localStorage.getItem("theme"))
      : "light"
  );

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeState;
