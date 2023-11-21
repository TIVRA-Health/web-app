import { Button, TableCell, Typography, styled } from "@mui/material";
import dayjs from "dayjs";

export type ButtonKind = "primary" | "secondary";

export const availableStatus = ["Pending", "Approved", "Rejected", "Pending Renew"];

export const isPendingRenew = (endDateString: string) => {
	const today = dayjs();
	const priorDate = dayjs(endDateString).add(-7, "day");
	return today.isSame(priorDate, "date") || today.isAfter(priorDate, "date");
};

export const StyledActionButton = styled(Button)<{ kind: ButtonKind }>(({ theme, kind }) => {
	const color = kind === "primary" ? theme.palette.primary.main : theme.palette.secondary.main;
	return {
		width: "fit-content",
		color: color,
		fontWeight: 500,
		fontSize: "16px",
		lineHeight: "19px",
		border: `1px solid ${color}`,
		backgroundColor: "transparent",
		"&:hover": {
			backgroundColor: "transparent",
			border: `1px solid ${color}`,
			boxShadow: 1,
		},
		"&:focus": {
			border: `1px solid ${color}`,
			backgroundColor: "transparent",
		},
		"&:active": {
			border: `1px solid ${color}`,
			backgroundColor: "transparent",
		},
		padding: "8px 16px",
		borderRadius: "100px",
	};
});

export const StyledTableCell = ({ title, align = "left" }: any) => {
	return (
		<TableCell
			sx={(theme) => ({
				fontWeight: 600,
				fontSize: "14px",
				lineHeight: "15px",
				padding: "12px",
				color: theme.palette.primary.main,
			})}
			align={align}
		>
			{title}
		</TableCell>
	);
};

export const StylesTableRowCell = ({ children, align = "left" }: any) => {
	return (
		<TableCell
			sx={(theme) => ({
				border: "none",
				textAlign: "left",
				padding: "0px",
			})}
			align={align}
		>
			{children}
		</TableCell>
	);
};

export const StyledTypography = styled(Typography)({
	fontSize: "14px",
	fontWeight: 400,
	lineHeight: "normal",
	color: "#3A3A3A",
	display: "flex",
	flexDirection: "row",
	gap: 1,
	// justifyContent: "left",
	// alignItems: "center",
});
