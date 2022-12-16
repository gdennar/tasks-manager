import React, { useContext, useEffect, useState } from "react";
import { useResolvedPath } from "react-router-dom";
import Notes from "../components/Notes";
import TaskContext from "../store/task-context";
import { Alert, Grid, Box, Paper, Card } from "@mui/material";
import LoadingSpinner from "../UI/LoadingSpinner";

export default function Pending(props) {
	const [tasks, setTasks] = useState([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	const url = useResolvedPath("").pathname;

	const taskCtx = useContext(TaskContext);
	const getTasks = taskCtx.getPendingTaskHandler;

	useEffect(() => {
		getAllTask();
	}, []);

	const getAllTask = async () => {
		try {
			setLoading(true);
			const docsSnap = await getTasks();
			setTasks(docsSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
			if (docsSnap.empty) {
				setMessage("You have no task pending");
			}

			setLoading(false);
		} catch (err) {
			setError(err.message);
		}
		setError("");
	};

	// if (tasks.length === 0) {
	// 	return (
	// 		<section className="main-content">
	// 			<Card>
	// 				<h3>You have no task pending</h3>
	// 			</Card>
	// 		</section>
	// 	);
	// }
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
								<Grid item xs={12} sm={6} md={4} lg={3} key={task.id}>
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
}
