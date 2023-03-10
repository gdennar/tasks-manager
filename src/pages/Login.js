import React, { useState, useContext } from "react";
import { Button, Card, Alert } from "@mui/material";
import Input from "../UI/Input";
import { Link, useNavigate } from "react-router-dom";
import "../components/AuthForm.css";
import AuthContext from "../store/auth-context";
import { useRef } from "react";

const Login = () => {
	const [isLoading, setIsLoading] = useState(false);
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const navigate = useNavigate();

	const authCtx = useContext(AuthContext);
	const isLoggedIn = authCtx.currentUser;
	const login = authCtx.login;
	const isError = authCtx.isError;

	// const { login, currentUser, isError, setIsError } = useContext(AuthContext);
	console.log(isLoggedIn);
	const loginHandler = async (e) => {
		e.preventDefault();

		setIsLoading(true);

		const enteredEmailInputRef = emailInputRef.current.value;
		const enteredPasswordInputRef = passwordInputRef.current.value;

		await login(enteredEmailInputRef, enteredPasswordInputRef);

		navigate("/dashboard");
		setIsLoading(false);
	};

	return (
		<section className="wrapper">
			{/* <div className="centered">{isLoading && <LoadingSpinner />}</div> */}

			<div className="form-container">
				<h1 className="header-text">Login</h1>
				{isError && (
					<Alert severity="error" className="centered" sx={{ mt: "1rem" }}>
						{isError}
					</Alert>
				)}
				<Card className="form-group">
					<form className="form" onSubmit={loginHandler}>
						<div className="control">
							<Input
								ref={emailInputRef}
								label="Email"
								input={{
									id: "email",
									type: "email",
								}}
							/>
						</div>
						<div className="control">
							<Input
								ref={passwordInputRef}
								label="Password"
								input={{
									id: "password",
									type: "password",
								}}
							/>
						</div>
						<div className="auth-btn">
							<Button
								onClick={loginHandler}
								disabled={isLoading}
								type="submit"
								variant="contained"
								sx={{
									color: "#06283d",
									backgroundColor: "#fff",
									":hover": {
										backgroundColor: "#06283d",
										color: "#fff",
									},
								}}
							>
								{isLoading ? "Loggin in..." : "LOGIN"}
							</Button>
						</div>

						<div className="auth-text">
							Do not have an account?
							<span>
								<Link to="/sign-up" style={{ color: "#fff" }}>
									SIGN UP
								</Link>
							</span>
						</div>
						<div className="auth-text">
							<span>
								<Link to="/forgot-password" style={{ color: "#fff" }}>
									Forgot Password?
								</Link>
							</span>
						</div>
					</form>
				</Card>
			</div>
		</section>
	);
};

export default Login;
