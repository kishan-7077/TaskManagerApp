import React, { useEffect, useState, useContext } from "react";
import {
	SafeAreaView,
	View,
	Text,
	TextInput,
	Button,
	FlatList,
	StyleSheet,
	StatusBar,
} from "react-native";
import TaskItem from "../components/TaskItem";
import { saveTasks, loadTasks } from "../utils/storage";
import { ThemedContext } from "../context/ThemedContext";

const HomeScreen = () => {
	const [tasks, setTasks] = useState([]);
	const [text, setText] = useState("");
	const [editId, setEditId] = useState(null);
	const { isDarkMode, toggleTheme } = useContext(ThemedContext);

	useEffect(() => {
		(async () => {
			const storedTasks = await loadTasks();
			setTasks(storedTasks);
		})();
	}, []);

	const handleAddTask = () => {
		if (text.trim().length === 0) return;

		if (editId) {
			setTasks((prev) =>
				prev.map((task) => (task.id === editId ? { ...task, text } : task))
			);
			setEditId(null);
		} else {
			setTasks((prev) => [...prev, { id: Date.now(), text }]);
		}

		saveTasks(tasks);
		setText("");
	};

	const handleEditTask = (id) => {
		const task = tasks.find((task) => task.id === id);
		if (task) setText(task.text);
		setEditId(id);
	};

	const handleDeleteTask = (id) => {
		const updatedTasks = tasks.filter((task) => task.id !== id);
		setTasks(updatedTasks);
		saveTasks(updatedTasks);
	};

	return (
		<SafeAreaView style={[styles.safeArea, isDarkMode && styles.darkSafeArea]}>
			<StatusBar
				barStyle={isDarkMode ? "light-content" : "dark-content"}
				backgroundColor={isDarkMode ? "#333" : "#fff"}
			/>
			<View style={[styles.container, isDarkMode && styles.darkContainer]}>
				<Text style={[styles.header, isDarkMode && styles.darkHeader]}>
					Task Manager
				</Text>
				<TextInput
					value={text}
					onChangeText={setText}
					style={[styles.input, isDarkMode && styles.darkInput]}
					placeholder="Enter task"
					placeholderTextColor={isDarkMode ? "#aaa" : "#333"}
				/>
				<Button
					title={editId ? "Update Task" : "Add Task"}
					onPress={handleAddTask}
				/>
				<FlatList
					data={tasks}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<TaskItem
							task={item}
							onEdit={handleEditTask}
							onDelete={handleDeleteTask}
						/>
					)}
				/>
				<Button
					title={`Switch to ${isDarkMode ? "Light" : "Dark"} Mode`}
					onPress={toggleTheme}
					color={isDarkMode ? "#888" : "#007BFF"}
				/>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#fff",
	},
	darkSafeArea: {
		backgroundColor: "#333",
	},
	container: {
		flex: 1,
		padding: 20,
	},
	darkContainer: {
		backgroundColor: "#333",
	},
	header: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
		color: "#000",
	},
	darkHeader: {
		color: "#fff",
	},
	input: {
		borderWidth: 1,
		borderColor: "#ddd",
		marginBottom: 10,
		padding: 8,
		borderRadius: 5,
		backgroundColor: "#fff",
	},
	darkInput: {
		backgroundColor: "#444",
		color: "#fff",
	},
});

export default HomeScreen;
