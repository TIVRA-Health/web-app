import { Box } from "@mui/material";
import { HealthAndFitness } from "./HealthAndFitness";
import { ProfileSummary, ProfileSummaryM } from "./ProfileSummary";
import { useAuth } from "contexts/AuthProvider";
import { useAuthVerify } from "hooks/useAuthVerify";
import { useMediaQuery, useTheme } from "@mui/material";
import { STORAGE_USER_INFO_KEY } from "main";

export const Overview = () => {
	const { user } = useAuth();
	useAuthVerify();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	let userData: any = window.localStorage.getItem(STORAGE_USER_INFO_KEY);
	userData = userData ? JSON.parse(userData) : {};

	const formattedName = userData?.firstName
		.toLowerCase()
		.split(" ")
		.map((word: string) => word.charAt(0).toLocaleUpperCase() + word.slice(1))
		.join(" ");

	if (!isMobile) {
		return (
			<>
				<Box padding="16px 24px" sx={{ backgroundColor: "#fff" }} borderRadius="8px">
					<ProfileSummary name={formattedName} role={userData?.roleName.toUpperCase()} />
				</Box>
				<HealthAndFitness />
			</>
		);
	}
	return (
		<>
			<Box padding="16px 24px" sx={{ backgroundColor: "#fff" }} borderRadius="8px">
				<ProfileSummaryM role={""} name={""} />
			</Box>
			<HealthAndFitness />
		</>
	);
};
