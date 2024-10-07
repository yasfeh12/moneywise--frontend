import { useContext } from "react";
import { ThemeContext } from "../utils/ThemeContext";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Pressable } from "react-native";

const ToggleTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleThemeHelper = () => {
    setTheme((currTheme) => {
      return currTheme === "light" ? "dark" : "light";
    });
  };

  const buttonThemeHelper = () => {
    return [
      styles.button,
      theme === "light" ? styles.lightTheme : styles.darkTheme,
    ];
  };

  return (
    <Pressable onPress={toggleThemeHelper} style={buttonThemeHelper()}>
      <Text style={styles.buttonText}>change theme __</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  lightTheme: {
    backgroundColor: "#80FF00",
  },
  darkTheme: {
    backgroundColor: "#333333",
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
  },
});

export default ToggleTheme;
