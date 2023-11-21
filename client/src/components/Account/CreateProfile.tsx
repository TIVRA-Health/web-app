import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { uiStrings } from "main";
import { Outlet } from "react-router-dom";
import "../../css/LoginStyle.css";

export const CreateProfile = () => {
	const {
		signUp: { step3, createYourProfile },
	} = uiStrings;

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	if (!isMobile) {
		return (
			<Stack
				color="text.primary"
				width={{ xs: 360, sm: 390, md: 390, lg: 768, xl: 768 }}
				paddingY={3}
				paddingX={5}
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "left",
				}}
			>
				<Grid2 container spacing={1}>
					<Grid2 xs={12} marginBottom={3}>
						<Typography variant="h4" fontWeight={600} textAlign="center">
							{step3}
						</Typography>
						<Typography variant="h5" textAlign="center">
							{createYourProfile}
						</Typography>
					</Grid2>
				</Grid2>
				<Grid2 container spacing={1} width="100%">
					<Grid2 width="100%" marginTop={0}>
						<Outlet />
					</Grid2>
				</Grid2>
			</Stack>
		);
	}
	return (
		<Stack
			color="text.primary"
			paddingY={3}
			paddingX={5}
			width={{ xs: 360, sm: 390, md: 390, lg: 768, xl: 768 }}
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "left",
			}}
		>
			<Grid2 container spacing={1}>
				<Grid2 xs={12} marginBottom={3}>
					<Typography variant="h5" textAlign="center">
						{createYourProfile}
					</Typography>
				</Grid2>
			</Grid2>
			<Grid2 container spacing={1} width="100%">
				<Grid2 width="100%" marginTop={0}>
					<Outlet />
				</Grid2>
			</Grid2>
		</Stack>
	);
};
