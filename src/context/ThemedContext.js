import { useColorScheme } from "react-native";
import React, { createContext, useState } from "react";

export const ThemedContext = createContext();

export const ThemeProvider = ({ children }) => {
	const colorScheme = useColorScheme();
	const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");

	const toggleTheme = () => setIsDarkMode((prev) => !prev);

	return (
		<ThemedContext.Provider value={{ isDarkMode, toggleTheme }}>
			{children}
		</ThemedContext.Provider>
	);
};
