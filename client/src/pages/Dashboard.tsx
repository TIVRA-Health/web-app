import LogoutIcon from "@mui/icons-material/Logout";
import { Divider, List, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled, useTheme } from "@mui/material/styles";
import { AppToolbar, AppToolbar1, AppToolbarM } from "components/Dashboard/AppToolbar";
import { Menu } from "components/Dashboard/Menu";
import { ProfileSummary1 } from "components/Dashboard/ProfileSummary";
import { useAuth } from "contexts/AuthProvider";
import { useAuthVerify } from "hooks/useAuthVerify";
import { DRAWER_WIDTH, STORAGE_USER_INFO_KEY } from "main/constants";
import * as React from "react";
import { Outlet } from "react-router-dom";

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	"& .MuiDrawer-paper": {
		position: "relative",

		whiteSpace: "nowrap",
		width: DRAWER_WIDTH,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		boxSizing: "border-box",
		...(!open && {
			overflowX: "hidden",
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: "52px",
		}),
	},
}));

const Drawer1 = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	"& .MuiDrawer-paper": {
		whiteSpace: "nowrap",
		width: DRAWER_WIDTH,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		boxSizing: "border-box",
		...(!open && {
			overflowX: "hidden",
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: "0px ",
		}),
	},
}));

export const Dashboard = () => {
	const theme = useTheme();

	const [open, setOpen] = React.useState(true);
	const { logout } = useAuth();
	useAuthVerify();

	//handle drawer closure on click
	const detectListSelection = (isSelected: Boolean) => {
		setOpen(!isSelected);
	};
	const voidCall: () => void = () => {};

	let userData: any = window.localStorage.getItem(STORAGE_USER_INFO_KEY);
	userData = userData ? JSON.parse(userData) : {};

	const formattedName = userData?.firstName
		?.toLowerCase()
		.split(" ")
		.map((word: string) => word.charAt(0).toLocaleUpperCase() + word.slice(1))
		.join(" ");

	const toggleDrawer = () => {
		setOpen(!open);
	};

	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	if (!isMobile) {
		return (
			<Box
				sx={{
					display: "flex",
					height: "100vh",
					overflow: "hidden",
				}}
			>
				<Drawer
					variant="permanent"
					open={open}
					PaperProps={{
						sx: {
							display: "flex",
							justifyContent: "space-between",
							backgroundColor: theme.palette.primary.main,
							color: "red",
							overflow: "hidden",
							overflowY: "auto",
							border: "none",
						},
					}}
				>
					<Box>
						<AppToolbar open={open} toggleDrawer={toggleDrawer} />
						<Menu onChange={voidCall} userRoleId={userData?.userRoleId} />
					</Box>
					<Box>
						<Divider />
						<List component="nav">
							<ListItemButton
								onClick={logout}
								sx={(theme) => ({
									color: "#fff",
									fontSize: "16px",
									"&.Mui-selected": {
										backgroundColor: "#2E0D4E",
									},
								})}
							>
								<ListItemIcon
									sx={(theme) => ({
										color: "#fff",
									})}
								>
									<LogoutIcon />
								</ListItemIcon>
								<ListItemText sx={{ marginLeft: "-18px" }} primary="Sign out" />
							</ListItemButton>
						</List>
					</Box>
				</Drawer>
				<Box
					component="main"
					padding="16px"
					sx={{
						backgroundColor: "#F5F5F5",
						flexGrow: 1,
						minHeight: "100vh",
						overflowY: "auto",
					}}
				>
					<Outlet />
				</Box>
			</Box>
		);
	}

	return (
		<Box
			sx={{
				display: "flex",
				height: "100vh",
				overflow: "hidden",
				position: "relative", // Add position relative to the main container
			}}
		>
			{/* Drawer */}
			<Drawer1
				variant="permanent"
				open={open}
				PaperProps={{
					sx: {
						display: "flex",
						justifyContent: "space-between",
						backgroundColor: theme.palette.primary.main,
						color: "red",
						overflow: "hidden",
						overflowY: "auto",
						border: "none",
						position: "absolute", // Position the drawer absolutely
						zIndex: 3, // Set a higher z-index for the drawer
					},
				}}
			>
				<Box>
					<AppToolbar1 open={open} toggleDrawer={toggleDrawer} />
					<ProfileSummary1 role={userData?.roleName.toUpperCase()} name={formattedName} />
					<Menu onChange={detectListSelection} userRoleId={userData?.userRoleId} />
				</Box>
				<Box>
					<Divider />
					<List component="nav">
						<ListItemButton
							onClick={logout}
							sx={(theme) => ({
								color: "#fff",
								fontSize: "16px",
								"&.Mui-selected": {
									backgroundColor: "#2E0D4E",
								},
							})}
						>
							<ListItemIcon
								sx={(theme) => ({
									color: "#fff",
								})}
							>
								<LogoutIcon />
							</ListItemIcon>
							<ListItemText sx={{ marginLeft: "-18px" }} primary="Sign out" />
						</ListItemButton>
					</List>
				</Box>
			</Drawer1>

			{/* Header */}
			<Box
				sx={{
					height: "12vh",
					width: "100%",
					backgroundColor: theme.palette.primary.main,
					position: "absolute", // Position the header absolutely
					zIndex: 1, // Set a higher z-index for the header
				}}
			>
				<AppToolbarM open={open} toggleDrawer={toggleDrawer} />
			</Box>

			{/* Main Content */}
			<Box
				component="main"
				padding="18px"
				sx={{
					marginTop: "12vh",
					backgroundColor: "#F5F5F5",
					flexGrow: 1,
					minHeight: "calc(100vh - 12vh)", // Adjusting the height to account for the header
					overflowY: "auto",
					position: "relative", // Add position relative to the main content
					zIndex: 0, // Set a lower z-index for the main content
				}}
			>
				<Outlet />
			</Box>
		</Box>
	);
};
