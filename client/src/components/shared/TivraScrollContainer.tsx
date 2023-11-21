import ScrollContainer, { ScrollContainerProps } from "react-indiana-drag-scroll";
import { Box, Chip, MenuItem, Select, Stack, Typography, useTheme, useMediaQuery } from "@mui/material";
export interface ITivraScrollContainerProps extends Omit<ScrollContainerProps, "ref"> {
	spacing?: boolean;
}

export const TivraScrollContainer = ({ spacing = false, children, style, ...rest }: ITivraScrollContainerProps) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	if (!isMobile) {
		return (

			<ScrollContainer
				style={{
					...style,
					cursor: "grab",
					display: "grid",
					flexDirection: "row",
					gap: "20px",
					gridTemplateColumns: "repeat(14, 2fr)",
					gridRowEnd: "revert-layer",
					position: "relative",
					padding: spacing ? "10px" : "0px",


				}}
				{...rest}
			>
				{children}
			</ScrollContainer>
		);
	};
	return (
		<ScrollContainer
			style={{
				...style,
				cursor: "grab",
				display: "grid",  // Use CSS grid for the layout
				gridTemplateColumns: "repeat(1, 1fr)",
				gridRowEnd: "revert-layer",
				gap: "15px",
				maxHeight: "90px",
				maxWidth: "300px",
				position: "relative",
				padding: spacing ? "0px" : "0px",
				overflowY: "scroll",
			}}
			{...rest}
		>
			{children}
		</ScrollContainer>
	);
};