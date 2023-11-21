import { Help } from "@mui/icons-material";
import { Stack, Tooltip, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

interface IProfileDetailsFormGroupProps {
	title?: string;
	tip?: string;
	formContent: JSX.Element;
}

export const ProfileDetailsFormGroup = ({ title, tip, formContent }: IProfileDetailsFormGroupProps) => {
	return (
		<>
			<Stack display="flex" flexDirection="row" color="#898989" alignItems="center" justifyContent="left">
				{title && (
					<Typography variant="subtitle1" marginBottom="6px">
						{title}
					</Typography>
				)}
				{tip !== undefined && tip.trim() !== "" && (
					<Tooltip title={tip}>
						<Help sx={{ fontSize: ".9rem", marginLeft: "5px", marginTop: "-6px" }} />
					</Tooltip>
				)}
			</Stack>
			<Grid2 container>{formContent}</Grid2>
		</>
	);
};
