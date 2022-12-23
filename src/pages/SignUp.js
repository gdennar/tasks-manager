import React, { useRef, useState, useContext } from "react";
import { Alert, Button, Card } from "@mui/material";
import Input from "../UI/Input";
import { Link, useNavigate } from "react-router-dom";
import "../components/AuthForm.css";
import AuthContext from "../store/auth-context";
import LoadingSpinner from "../UI/LoadingSpinner";

const SignUp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const nameInputRef = useRef();
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const navigate = useNavigate();

	const { signUp, isError, currentUser, setIsError } = useContext(AuthContext);

	const onSubmitHandler = async (event) => {
		event.preventDefault();

		setIsLoading(true);
		await signUp(
			nameInputRef.current.value,
			emailInputRef.current.value,
			passwordInputRef.current.value
		);

		setIsLoading(false);

		navigate("/");
	};

	return (
		<section className="wrapper">
			<div className="centered">{isLoading && <LoadingSpinner />}</div>
			{!isLoading && (
				<div className="form-container">
					<h1 className="header-text">Sign Up</h1>

					<Card className="form-group">
						{isError && (
							<Alert
								severity="error"
								className="centered"
								sx={{ mb: "1rem" }}
								onClose={() => setIsError("")}
							>
								{isError}
							</Alert>
						)}
						<form className="form" onSubmit={onSubmitHandler}>
							<div className="control">
								<Input
									ref={nameInputRef}
									label="Name"
									input={{
										id: "name",
										type: "text",
									}}
								/>
							</div>

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
									type="submit"
									disabled={isLoading}
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
									SIGN UP
								</Button>
							</div>

							<div className="auth-text">
								Have an account?
								<span>
									<Link to="/" style={{ color: "#fff" }}>
										Login
									</Link>
								</span>
							</div>
						</form>
					</Card>
				</div>
			)}
		</section>
	);
};

export default SignUp;
