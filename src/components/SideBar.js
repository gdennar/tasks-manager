import React from "react";
import "./SideBar.css";
import { Card } from "@mui/material";
import { sidebarData } from "../data/SideBarData";
import { NavLink } from "react-router-dom";

const SideBar = () => {
	return (
		<>
			<Card className="sideNav-bar">
				
				<nav className="side-nav">
					<ul className="sideNav-items">
						{sidebarData.map((item) => {
							return (
								<li key={item.id} className="sideNav-list">
									<NavLink to={item.path} className="nav-link">
										<span className="icon">{item.icon}</span>
										<span className="text">{item.text}</span>
									</NavLink>
								</li>
							);
						})}
					</ul>
				</nav>
			</Card>
		</>
	);
};

export default SideBar;
