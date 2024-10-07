import { useContext } from "react";
import { ThemeContext } from "../utils/ThemeContext";
import { TouchableOpacity, Text, StyleSheet, Switch, View } from "react-native";
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
    <View style={styles.switchContainer}>
      <Text style={styles.switchLabel}>{theme} mode </Text>
      <Switch
        value={theme === "dark " ? true : false}
        onValueChange={toggleThemeHelper}
        trackColor={{ false: "#767577", true: "#80FF00" }}
        thumbColor={theme === "light" ? "#80FF00" : "#f4f3f4"}
      />
    </View>
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
    color: "#000000",
  },
  darkTheme: {
    backgroundColor: "#333333",
    color: "#FFFFFF",
  },
  buttonText: {
    //color: "inherit",
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  switchLabel: {
    color: "inherit",
  },
});

export default ToggleTheme;
