import { Box, Divider, Typography } from "@mui/material";

export const InfoChip = ({
	label,
	value,
}: {
	value: string | number | JSX.Element;
	label: string;
}) => {
	return (
		<Box
			key={label}
			display="flex"
			flexDirection="row"
			gap={0.7}
			sx={{
				alignItems: "center",
				width: "fit-content",
				backgroundColor: "#F8F8F8",
				padding: "4px 8px",
				borderRadius: "50px",
			}}
		>
			<Typography
				color="#6F6F6F"
				fontSize="12px"
				fontWeight={400}
				lineHeight="15px"
			>
				{label}
			</Typography>
			<Divider
				flexItem
				variant="fullWidth"
				orientation="vertical"
				sx={{ borderWidth: "1px" }}
			/>
			<Typography
				color="#000000"
				fontSize="12px"
				fontWeight={600}
				lineHeight="15px"
			>
				{value}
			</Typography>
		</Box>
	);
};
export const InfoChipm = ({
	label,
	value,
}: {
	value: string | number | JSX.Element;
	label: string;
}) => {
	return (
		<Box
			key={label}
			display="flex"
			flexDirection="column"
			gap={0.7}
			sx={{
				alignItems: "center",
				width: "fit-content",
				// backgroundColor: "#F8F8F8",
				borderBlockStyle: "solid 1px",
				borderColor: "#F8F8F8",
				padding: "4px 8px",


			}}
		>
			<Typography
				color="#ffff"
				fontSize="12px"
				fontWeight={400}
				lineHeight="15px"
			>
				{label}
			</Typography>
			{/* <Divider
				flexItem
				variant="fullWidth"
				orientation="vertical"
				sx={{ borderWidth: "1px" }}
			/> */}
			<Typography
				color="#ffff"
				fontSize="12px"
				textAlign={"center"}
				fontWeight={600}
				lineHeight="15px"
				width={"55px"}
				sx={{
					border: "1px solid #ffff",
					borderRadius: "5px",
				}}

			>
				{value}
			</Typography>
		</Box>
	);
};
