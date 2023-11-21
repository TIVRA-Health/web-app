import { Box, Typography } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";



export const Header = ({ icon, title }: { icon?: JSX.Element; title: string }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	if (!isMobile) {
		return (
			<Box display="flex" alignItems="center" padding="8px 0px" flexDirection="row" gap={1}>
				{icon}
				<Typography fontSize="24px" fontWeight={500} lineHeight="normal" color="#000">
					{title}
				</Typography>
			</Box>
		);
	};
	return (
		<Box display="flex" alignItems="center" padding="8px 0px" flexDirection="row" gap={1}>
			{icon}
			<Typography fontSize="24px" fontWeight={500} lineHeight="normal" color="#000">
				{title}
			</Typography>
		</Box>
	);
};
