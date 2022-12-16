import React, { useState, useContext, useEffect } from "react";
import { useResolvedPath } from "react-router-dom";
import Content from "../components/ContentPage";
import { Alert, Card } from "@mui/material";
import LoadingSpinner from "../UI/LoadingSpinner";
import Grid from "@mui/material/Grid";
import TaskContext from "../store/task-context";
import AuthContext from "../store/auth-context";
import Notes from "../components/Notes";

const InProgress = () => {
	const [tasks, setTasks] = useState([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	const taskCtx = useContext(TaskContext);
	const getTasks = taskCtx.getInProgressTaskHandler;

	const authCtx = useContext(AuthContext);
	const user = authCtx.currentUser;

	const url = useResolvedPath("").pathname;

	useEffect(() => {
		getAllTask();
	}, []);

	const getAllTask = async (uid) => {
		try {
			setLoading(true);
			const docsSnap = await getTasks();
			setTasks(docsSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
			if (docsSnap.empty) {
				setMessage("You have no task in progress");
			}
			setLoading(false);
		} catch (err) {
			setError(err.message);
		}
		setError("");
	};

	return (
		<section className="main-content">
			{loading ? (
				<div className="centered">
					<LoadingSpinner />
				</div>
			) : (
				<div>
					{error ? (
						<Alert severity="error" className="centered" sx={{ mt: "1rem" }}>
							{error}
						</Alert>
					) : (
						<p className="url-path">{url}</p>
					)}
					{message && (
						<Alert severity="warning" className="centered" sx={{ mt: "1rem" }}>
							{message}
						</Alert>
					)}
					<Grid container spacing={2} p={2} className="task-content">
						{tasks.map((task) => {
							return (
								<Grid item xs={12} sm={6} md={3} key={task.id}>
									<Notes
										key={task.id}
										title={task.title}
										description={task.description}
										createdAt={task.createdAt}
									></Notes>
								</Grid>
							);
						})}
					</Grid>
				</div>
			)}
		</section>
	);
};

export default InProgress;
