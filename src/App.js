// App.js
import React from "react";
import { ThemeProvider } from "./context/ThemedContext";
import HomeScreen from "./screens/HomeScreen";

export default function App() {
	return (
		<ThemeProvider>
			<HomeScreen />
		</ThemeProvider>
	);
}
