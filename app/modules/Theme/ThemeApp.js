import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const themes = {
  light: {
    backgroundColor: "#f5f5f5",
    color: "#000",
    buttonBackground: "#007bff",
    buttonColor: "#fff",
  },
  dark: {
    backgroundColor: "#333",
    color: "#fff",
    buttonBackground: "#555",
    buttonColor: "#fff",
  },
};

function ThemeApp() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("appTheme");
      if (savedTheme) setTheme(savedTheme);
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    await AsyncStorage.setItem("appTheme", newTheme);
  };

  return (
    <View style={[styles.container, { backgroundColor: themes[theme].backgroundColor }]}>
      <Text style={[styles.text, { color: themes[theme].color }]}>
        Current Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
      </Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: themes[theme].buttonBackground }]}
        onPress={toggleTheme}
      >
        <Text style={[styles.buttonText, { color: themes[theme].buttonColor }]}>
          Toggle Theme
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return <ThemeApp />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
  },
});