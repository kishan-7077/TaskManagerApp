import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveTasks = async (tasks) => {
	try {
		await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
	} catch (error) {
		console.error("Error in storing tasks : " + error);
	}
};

export const loadTasks = async () => {
	try {
		const task = await AsyncStorage.getItem("tasks");
		return task ? JSON.parse(task) : [];
	} catch (error) {
		console.error("Error in loading tasks : " + error);
		return [];
	}
};
