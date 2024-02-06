import React, { createContext, useContext, useState } from "react";

// Create a context for the theme
const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {}
});

// Create a custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Create a provider component
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // const [isDarkMode, setIsDarkMode] = useState(useColorScheme() === "dark");
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Function to toggle the theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // The value passed to the provider includes the theme state and the toggle function
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContext;
