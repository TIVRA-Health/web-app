import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Daum } from "./Nutrition.types";
import "../../../css/SignUp.css"

const getConsolidated = (data: Daum[]) => {
	return data?.length
		? [
				{
					title: "Calories",
					value: data.map((x) => x.calories.value).reduce((x, y) => x + y),
					unit: "kcal",
				},
				{
					title: "Fat",
					value: data.map((x) => x.fat.value).reduce((x, y) => x + y),
					unit: "g",
				},
				{
					title: "Protein",
					value: data.map((x) => x.protein.value).reduce((x, y) => x + y),
					unit: "g",
				},
				{
					title: "Fiber",
					value: data.map((x) => x.fiber.value).reduce((x, y) => x + y),
					unit: "g",
				},
				{
					title: "Sugar",
					value: data.map((x) => x.sugar.value).reduce((x, y) => x + y),
					unit: "g",
				},
				{
					title: "Cholesterol",
					value: data.map((x) => x.cholesterol.value).reduce((x, y) => x + y),
					unit: "g",
				},
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  ]
		: [];
};
const getConsolidatedM = (data: Daum[]) => {
	return data?.length
		? [
				{
					title: "Cal",
					value: data.map((x) => x.calories.value).reduce((x, y) => x + y),
					unit: "kcal",
				},
				{
					title: "Fat",
					value: data.map((x) => x.fat.value).reduce((x, y) => x + y),
					unit: "g",
				},
				{
					title: "Protein",
					value: data.map((x) => x.protein.value).reduce((x, y) => x + y),
					unit: "g",
				},
				{
					title: "Fiber",
					value: data.map((x) => x.fiber.value).reduce((x, y) => x + y),
					unit: "g",
				},
				{
					title: "Sugar",
					value: data.map((x) => x.sugar.value).reduce((x, y) => x + y),
					unit: "g",
				},
				{
					title: "Choles",
					value: data.map((x) => x.cholesterol.value).reduce((x, y) => x + y),
					unit: "g",
				},
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  ]
		: [];
};
export 
const NutritionConsolidatedInfo = ({ data }: { data: Daum[] }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	if (!isMobile) {
	return (
		<Box marginTop={1}>
			<Grid2 container justifyContent="space-between" padding="0px">
				{getConsolidated(data).map(({ title, value, unit }) => {
					return (
						<Grid2 key={title} minWidth="16%">
							<Box
								display="flex"
								flexDirection="column"
								padding="16px 16px"
								sx={{ backgroundColor: "#fff" }}
								borderRadius="8px"
							>
								<Typography
									textAlign="center"
									sx={(theme) => ({
										padding: "4px",
										fontSize: "14px",
										fontWeight: 500,
										lineHeight: "17px",
										color: theme.palette.primary.main,
									})}
								>
									{title}
								</Typography>
								<Box display="flex" flexDirection="row" alignItems="flex-end" justifyContent="center">
									<Typography
										textAlign="center"
										sx={(theme) => ({
											fontSize: "24px",
											fontWeight: 600,
											lineHeight: "29px",
											color: theme.palette.secondary.main,
										})}
									>
										{value}
									</Typography>
									<Typography
										textAlign="center"
										sx={(theme) => ({
											fontSize: "14px",
											fontWeight: 400,
											lineHeight: "17px",
											color: theme.palette.secondary.main,
										})}
									>
										{unit}
									</Typography>
								</Box>
							</Box>
						</Grid2>
					);
				})}
			</Grid2>
		</Box>
	);
};
return (
	<Box marginTop={0}>
		<Grid2 container justifyContent="space-between" padding="0px">
			{getConsolidatedM(data).map(({ title, value, unit }) => {
				return (
					<Grid2 key={title} minWidth="16%">
						<Box
							display="flex"
							flexDirection="column"
							padding="16px 16px"
							sx={{ backgroundColor: "#fff" }}
							borderRadius="8px"
						>
							<Typography
								textAlign="center"
								sx={(theme) => ({
									padding: "4px",
									fontSize: "14px",
									fontWeight: 500,
									lineHeight: "17px",
									color: theme.palette.primary.main,
								})}
							>
								{title}
							</Typography>
							<Box display="flex" flexDirection="row" alignItems="flex-end" justifyContent="center">
								<Typography
									textAlign="center"
									sx={(theme) => ({
										fontSize: "24px",
										fontWeight: 600,
										lineHeight: "29px",
										color: theme.palette.secondary.main,
									})}
								>
									{value}
								</Typography>
								<Typography
									textAlign="center"
									sx={(theme) => ({
										fontSize: "14px",
										fontWeight: 400,
										lineHeight: "17px",
										color: theme.palette.secondary.main,
									})}
								>
									{unit}
								</Typography>
							</Box>
						</Box>
					</Grid2>
				);
			})}
		</Grid2>
	</Box>
);
};
