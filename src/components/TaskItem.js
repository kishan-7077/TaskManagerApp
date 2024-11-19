import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TaskItem = ({ task, onEdit, onDelete }) => {
	return (
		<View style={styles.taskContainer}>
			<Text style={styles.taskText}>{task.text}</Text>
			<View style={styles.actions}>
				<TouchableOpacity onPress={() => onEdit(task.id)}>
					<Text style={styles.edit}>Edit</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => onDelete(task.id)}>
					<Text style={styles.delete}>Delete</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	taskContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 10,
		backgroundColor: "#f8f8f8",
		marginVertical: 5,
		borderRadius: 5,
	},
	taskText: {
		fontSize: 16,
	},
	actions: {
		flexDirection: "row",
	},
	edit: {
		color: "blue",
		marginRight: 10,
	},
	delete: {
		color: "red",
	},
});

export default TaskItem;
