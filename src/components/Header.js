import React, { useContext } from "react";
import AuthContext from "../store/auth-context";
import { NavLink, Link } from "react-router-dom";
import HeaderProfile from "./HeaderProfile";
import ModalButton from "../UI/ModalButton";

import "./Header.css";

const Header = (props) => {
	const authCtx = useContext(AuthContext);
	const isLoggedIn = authCtx.currentUser;
	const classes = `${"header-login"} ${!isLoggedIn && "header-logout"}`;
	return (
		<>
			<header className={classes}>
				<div className="logo">Tasks Manger</div>
				<nav>
					<ul className="navItems">
						{isLoggedIn && (
							<li>
								<Link to="/add-task" className="nav-btn">
									<ModalButton className="navv-btn" name="New Task" />
								</Link>
							</li>
						)}
						{isLoggedIn && (
							<li>
								<HeaderProfile className="profile" />
							</li>
						)}
					</ul>
				</nav>
			</header>
		</>
	);
};

export default Header;
