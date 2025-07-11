import React, { createContext, useContext, useState, useEffect } from "react";

// Define the shape of the theme context
interface ThemeContextType {
  theme: "light" | "dark"; // current theme value
  toggleTheme: () => void; // function to switch themes
}

// Create the context with default values (not actually used directly)
const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

// ThemeProvider component to wrap your app and provide the theme context
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Read theme from localStorage (if "dark", use dark; otherwise, default to light)
  const [theme, setTheme] = useState<"light" | "dark">(
    localStorage.getItem("theme") === "dark" ? "dark" : "light"
  );

  // Toggle function to switch between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme); // update state
    localStorage.setItem("theme", newTheme); // persist new theme
  };

  // Side effect: Update the body's class whenever the theme changes
  useEffect(() => {
    document.body.className =
      theme === "dark" ? "bg-dark-soft text-white" : "bg-light text-dark";
  }, [theme]);

  // Provide the theme and toggleTheme function to consumers
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to consume the theme context in any component
export const useTheme = () => useContext(ThemeContext);
