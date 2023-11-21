import CableIcon from "@mui/icons-material/Cable";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DevicesIcon from "@mui/icons-material/Devices";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import GroupIcon from "@mui/icons-material/Group";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import { useMediaQuery, useTheme } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { STORAGE_ROLES_KEY } from "main";
import { appLinks, dashboardLinks } from "main/appLinks";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
export interface IMenuItem {
	text: string;
	icon: JSX.Element;
	to: string;
	alias: string;
}

const allMenus: IMenuItem[] = [
	{
		text: "Dashboard",
		icon: <DashboardIcon />,
		to: dashboardLinks.overview,
		alias: "individualDashboard",
	},
	{
		text: "My Team",
		icon: <GroupIcon />,
		to: dashboardLinks.myTeam,
		alias: "teamDashboard",
	},
	{
		text: "Configure Dashboard",
		icon: <SettingsIcon />,
		to: dashboardLinks.configureDashboard,
		alias: "metricConfiguration",
	},
	{
		text: "Devices",
		icon: <DevicesIcon />,
		to: dashboardLinks.devices,
		alias: "newDeviceRegistration",
	},
	{
		text: "Nutrition Log",
		icon: <FastfoodIcon />,
		to: dashboardLinks.nutritionLog,
		alias: "nutritionDataEntry",
	},
	{
		text: "AI Consultation",
		icon: <MeetingRoomIcon />,
		to: dashboardLinks.aiConsultation,
		alias: "aiConsultation",
	},
	{
		text: "My Connections",
		icon: <CableIcon />,
		to: dashboardLinks.myConnections,
		alias: "communityConnect",
	},
	{
		text: "My Account",
		icon: <PersonIcon />,
		to: dashboardLinks.myAccount,
		alias: "myAccount",
	},
	{
		text: "Admin",
		icon: <EmojiEventsIcon />,
		to: dashboardLinks.superAdmin,
		alias: "admin",
	},
];

interface IMenuItemWithOnChange extends IMenuItem {
	onChange: (isSelected: boolean) => void;
}

const ListItem = ({ icon, text, to, onChange }: IMenuItemWithOnChange) => {
	const navigate = useNavigate();
	const location = useLocation();
	const selected = location.pathname.includes(to);

	const onClick = (to: string) => () => {
		onChange(true);
		navigate(`${appLinks.dashboard}/${to}`, { replace: true });
	};
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	if (!isMobile) {
		return (
			<ListItemButton
				onClick={onClick(to)}
				sx={(theme) => ({
					color: selected ? theme.palette.secondary.main : "#fff",
					fontSize: "16px",
					"&.Mui-selected": {
						backgroundColor: "#2E0D4E",
					},
				})}
				selected={selected}
			>
				<ListItemIcon
					sx={(theme) => ({
						color: selected ? theme.palette.secondary.main : "#fff",
					})}
				>
					{icon}
				</ListItemIcon>
				<ListItemText sx={{ marginLeft: "-18px" }} primary={text} />
			</ListItemButton>
		);
	}
	return (
		<ListItemButton
			onClick={onClick(to)}
			sx={(theme) => ({
				color: selected ? theme.palette.secondary.main : "#fff",
				fontSize: "16px",
				"&.Mui-selected": {
					backgroundColor: "#2E0D4E",
				},
			})}
			selected={selected}
		>
			<ListItemIcon
				sx={(theme) => ({
					color: selected ? theme.palette.secondary.main : "#fff",
				})}
			>
				{icon}
			</ListItemIcon>
			<ListItemText sx={{ marginLeft: "-18px" }} primary={text} />
		</ListItemButton>
	);
};

interface IMenuProps {
	onChange: (selection: Boolean) => void;
	userRoleId: string;
}

export const Menu: React.FC<IMenuProps> = ({ onChange, userRoleId }) => {
	let rolesData: any = window.localStorage.getItem(STORAGE_ROLES_KEY);
	rolesData = rolesData ? JSON.parse(rolesData) : {};

	// const roleBasedMenus = {};

	type ScreenName = string;

	type RoleBasedMenus = Record<any, ScreenName[]>;

	const roleBasedMenus: RoleBasedMenus = {};

	rolesData?.forEach((item: { screen: any; id: any }) => {
		// const role = item.role;
		const roleId = item.id;
		const screens = item.screen;

		// Define menu items for each role based on screen properties
		const menuItems = [];

		//current screen info
		if (screens.individualDashboard) menuItems.push("Dashboard");
		if (screens.teamDashboard) menuItems.push("My Team");
		if (screens.metricConfiguration) menuItems.push("Configure Dashboard");
		if (screens.newDeviceRegistration) menuItems.push("Devices");
		if (screens.nutritionDataEntry) menuItems.push("Nutrition Log");
		if (screens.admin || true) menuItems.push("Admin");
		if (screens.aiConsultation || true) menuItems.push("AI Consultation");
		if (screens.myAccount || true) menuItems.push("My Account");
		if (screens.communityConnect) menuItems.push("My Connections");

		//additional screen info
		if (screens.newUserCreation) menuItems.push("New User");
		if (screens.coachRegistration) menuItems.push("Coach Registration");
		if (screens.healthcareProviderRegistration) menuItems.push("Healthcare Provider Registration");
		if (screens.organizationRegistration) menuItems.push("Organization Registration");
		if (screens.logInScreen) menuItems.push("Log In Screen");
		if (screens.forgotPassword) menuItems.push("Forgot Password");
		// if (screens.editProfile) menuItems.push("Edit Profile");
		if (screens.setGoals) menuItems.push("Set Goals");
		if (screens.setHealthMetricsThresholds) menuItems.push("Set Health Metrics Thresholds");
		if (screens.manualDataEntry) menuItems.push("Manual Data Entry");
		if (screens.goalProgression) menuItems.push("Goal Progression");
		if (screens.individualTrendingData) menuItems.push("Individual Trending Data");
		if (screens.teamTrendingData) menuItems.push("Team Trending Data");
		if (screens.allHealthMetrics) menuItems.push("All Health Metrics");
		if (screens.selfAssessmentQuestionnaire) menuItems.push("Self-Assessment Questionnaire");
		if (screens.enableAndDisableConnect) menuItems.push("Enable and Disable Connect");

		roleBasedMenus[roleId] = menuItems;
	});

	const allowedMenuItems = allMenus.filter((menu) => {
		return roleBasedMenus[userRoleId]?.includes(menu.text);
	});
	const handleChange = (isSelected: Boolean) => {
		onChange(isSelected);
	};
	return (
		<List component="nav">
			{allowedMenuItems.map((menu) => (
				<ListItem key={menu.to} {...menu} onChange={handleChange} />
			))}
		</List>
	);
};
