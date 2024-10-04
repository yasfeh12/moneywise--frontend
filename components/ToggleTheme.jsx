import { useContext } from "react";
import { ThemeContext } from "../utils/ThemeContext";

const toggleTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  setTheme((currTheme) => {
    return currTheme === "light" ? "dark" : "light";
  });

  return (
    <button onClick={toggleTheme} className={`button__${theme}`}>
      Change Theme
    </button>
  );
};

export default ToggleTheme;
