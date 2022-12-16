import { createContext, useState } from "react";
import {
	collection,
	addDoc,
	getDoc,
	getDocs,
	setDoc,
	updateDoc,
	deleteDoc,
	doc,
	where,
	query,
} from "firebase/firestore";
import { db } from "../firebase-config";

const TaskContext = createContext({
	title: "",
	description: "",
	status: "",
	addTask: () => {},
	updateTask: () => {},
	deleteTask: () => {},
	deleteAllTask: () => {},
	editTask: () => {},
});

export const TaskContextProvider = ({ children }) => {
	const [countCompleted, setCountCompleted] = useState("");
	const [countPending, setCountPending] = useState("");
	const [countProgress, setCountProgress] = useState("");
	const taskCollectionRef = collection(db, "tasks");

	const completed = query(
		taskCollectionRef,
		where("status", "==", "completed")
	);
	const pending = query(taskCollectionRef, where("status", "==", "pending"));
	const inProgress = query(
		taskCollectionRef,
		where("status", "==", "in progress")
	);

	const addTaskHandler = (taskInput) => {
		return addDoc(taskCollectionRef, taskInput);
	};

	const updateTaskHandler = (id, taskInput) => {
		const taskDoc = doc(db, "tasks", id);
		return updateDoc(taskDoc, taskInput);
	};

	const deleteTaskHandler = (id) => {
		const taskDoc = doc(db, "tasks", id);
		return deleteDoc(taskDoc);
	};

	const deleteAllTaskHandler = (taskInput) => {
		return db.remove();
	};

	const getCompletedTaskHandler = async () => {
		const onSnapdoc = await getDocs(completed);
		setCountCompleted(onSnapdoc.docs.length);
		return onSnapdoc;
	};
	const getPendingTaskHandler = async () => {
		const onSnapdoc = await getDocs(pending);
		setCountPending(onSnapdoc.docs.length);
		return onSnapdoc;
	};
	const getInProgressTaskHandler = async () => {
		const onSnapdoc = await getDocs(inProgress);
		setCountProgress(onSnapdoc.docs.length);
		return onSnapdoc;
	};

	const editTaskHandler = (id) => {
		const taskDoc = doc(db, "tasks", id);
		return getDoc(taskDoc);
	};
	const contextValue = {
		addTask: addTaskHandler,
		updateTask: updateTaskHandler,
		deleteTask: deleteTaskHandler,
		deleteAllTask: deleteAllTaskHandler,
		getCompletedTaskHandler,
		getInProgressTaskHandler,
		getPendingTaskHandler,
		editTask: editTaskHandler,
		taskCollectionRef,
		countCompleted,
		countPending,
		countProgress,
	};

	return (
		<TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
	);
};

export default TaskContext;
