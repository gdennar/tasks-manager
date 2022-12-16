import { Outlet, Route, Routes } from "react-router-dom";
import React, { useContext } from "react";
import AuthContext from "./store/auth-context";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Completed from "./pages/Completed";
import Progress from "./pages/InProgress";
import Pending from "./pages/Pending";
import Report from "./pages/Report";
import AddTask from "./pages/AddTask";

function App() {
	const authCtx = useContext(AuthContext);
	const isLoggedIn = authCtx.currentUser;

	return (
		<>
			<Header />
			{isLoggedIn ? <SideBar /> : ""}
			<main>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/add-task" element={<AddTask />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/pending" element={<Pending />} />
					<Route path="/progress" element={<Progress />} />
					<Route path="/completed" element={<Completed />} />
					<Route path="/report" element={<Report />} />
				</Routes>
			</main>
		</>
	);
}

export default App;
