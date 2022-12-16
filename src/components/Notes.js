import * as React from "react";
import Box from "@mui/material/Box";
import { capitalize, Tooltip } from "@mui/material";
import { Checkbox, Typography, IconButton, Grid, Paper } from "@mui/material";
import { Menu, MenuItem, ListItemIcon, FormControlLabel } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
	Card,
	CardHeader,
	CardActions,
	CardContent,
	Divider,
} from "@mui/material";
import "./Notes.css";

export function Note(props) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Card
			sx={{
				maxWidth: 270,
				minHeight: 300,
				marginLeft: "20px",
				padding: "15px",
			}}
			className="note-card"
		>
			<div className="card-info">
				<CardHeader
					className="card-note-header"
					title={
						<Typography
							sx={{ fontSize: 17, textTransform: "upperCase" }}
							color="#fff"
							gutterBottom
						>
							{props.title}
						</Typography>
					}
					subheader={
						<Typography sx={{ fontSize: 14 }} color="#fff" gutterBottom>
							September 11, 2022
						</Typography>
					}
				></CardHeader>

				<Divider />

				<CardContent sx={{ marginBottom: "25px" }}>
					<Typography variant="body2" sx={{ fontSize: 18 }}>
						{props.description}
					</Typography>
				</CardContent>
			</div>

			<Divider />
			<CardActions className="card-actions">
				<div>
					<form>
						<FormControlLabel
							className="note-form"
							sx={{ "& .MuiSvgIcon-root": { fontSize: 13 } }}
							value=""
							control={<Checkbox />}
							label="in-progress"
						/>
						<FormControlLabel
							className="note-form"
							sx={{ "& .MuiSvgIcon-root": { fontSize: 13 } }}
							value=""
							control={<Checkbox />}
							label="completed"
						/>
					</form>
				</div>

				<div>
					<Tooltip title="more">
						<IconButton
							onClick={handleClick}
							size="small"
							sx={{ ml: 2 }}
							aria-controls={open ? "account-menu" : undefined}
							aria-haspopup="true"
							aria-expanded={open ? "true" : undefined}
						>
							<MoreVertIcon sx={{ width: 32, height: 32 }} />
						</IconButton>
					</Tooltip>
					<Menu
						anchorEl={anchorEl}
						id="account-menu"
						open={open}
						onClose={handleClose}
						onClick={handleClose}
						PaperProps={{
							elevation: 0,
							sx: {
								overflow: "visible",
								filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
								mt: 1.5,
								"& .MuiAvatar-root": {
									width: 32,
									height: 32,
									ml: -0.5,
									mr: 1,
								},
								"&:before": {
									content: '""',
									display: "block",
									position: "absolute",
									top: 0,
									right: 14,
									width: 10,
									height: 10,
									bgcolor: "background.paper",
									transform: "translateY(-50%) rotate(45deg)",
									zIndex: 0,
								},
							},
						}}
						transformOrigin={{ horizontal: "right", vertical: "top" }}
						anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
					>
						<MenuItem>
							<ListItemIcon>
								<EditIcon fontSize="small" />
							</ListItemIcon>
							Edit
						</MenuItem>
						<MenuItem>
							<ListItemIcon>
								<DeleteIcon fontSize="small" />
							</ListItemIcon>
							Delete
						</MenuItem>
					</Menu>
				</div>
			</CardActions>
		</Card>
	);
}

export default function Notes(props) {
	return (
		<Note
			title={props.title}
			description={props.description}
			createdAt={props.createdAt}
		/>
	);
}
