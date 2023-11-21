import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Grid, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Dayjs } from "dayjs";
import { useState } from "react";
import { Header } from "../Header";
import { Daum, MealInfo } from "./Nutrition.types";
import { NutritionAddForm } from "./NutritionAddForm";
import { NutritionTable } from "./NutritionTable";

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

export const ItemSum = ({ data, open, toggleOpen }: { data: Daum[]; open: boolean; toggleOpen: () => void }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const items = isMobile ? getConsolidatedM(data) : getConsolidated(data);

	if (!isMobile) {
		return (
			<Box display="flex" flexDirection="row">
				<Box display="flex" borderBottom={open ? "2px solid #E3E3E3" : undefined} flex="1 1 auto">
					<Grid container justifyContent="space-between" paddingBottom={open ? "16px" : "0px"}>
						{items.map(({ title, value, unit }, i) => {
							const addRightBorder = i !== items.length - 1;

							return (
								<Grid
									key={title}
									flexDirection="row"
									minWidth="16%"
									borderRight={addRightBorder ? "1px solid #E3E3E3" : undefined}
								>
									<Box display="flex" flexDirection="column" gap={1.5}>
										<Typography
											textAlign="center"
											sx={{
												padding: "4px",
												fontSize: "14px",
												fontWeight: 400,
												lineHeight: "normal",
												color: "#B9B9B9",
											}}
										>
											{title}({unit})
										</Typography>
										<Box
											display="flex"
											flexDirection="row"
											alignItems="flex-end"
											justifyContent="center"
										>
											<Typography
												textAlign="center"
												sx={(theme) => ({
													fontSize: "16px",
													fontWeight: 500,
													lineHeight: "normal",
													color: theme.palette.primary.main,
												})}
											>
												{value}
											</Typography>
										</Box>
									</Box>
								</Grid>
							);
						})}
					</Grid>
				</Box>
				<Box display="flex" flex="0 1 auto">
					<IconButton disableRipple onClick={toggleOpen}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</Box>
			</Box>
		);
	}
	return (
		<Box display="flex" flexDirection="column">
			<Box display="flex" borderBottom={open ? "2px solid #E3E3E3" : undefined} flex="1 1 auto">
				<Grid container justifyContent="space-between" paddingBottom={open ? "16px" : "0px"}>
					{items.map(({ title, value, unit }, i) => {
						const addRightBorder = i !== items.length - 1;

						return (
							<Grid
								key={title}
								flexDirection="column"
								minWidth="16%"
								// borderRight={addRightBorder ? "1px solid #E3E3E3" : undefined}
							>
								<Box display="flex" flexDirection="column" gap={1}>
									<Typography
										textAlign="center"
										sx={{
											padding: "4px",
											fontSize: "14px",
											fontWeight: 400,
											lineHeight: "normal",
											color: "#B9B9B9",
										}}
									>
										{title} <br />({unit})
									</Typography>
									<Box
										display="flex"
										flexDirection="row"
										alignItems="flex-end"
										justifyContent="center"
									>
										<Typography
											textAlign="center"
											sx={(theme) => ({
												fontSize: "16px",
												fontWeight: 500,
												lineHeight: "normal",
												color: theme.palette.primary.main,
											})}
										>
											{value}
										</Typography>
									</Box>
								</Box>
							</Grid>
						);
					})}
				</Grid>
			</Box>
			<Box display="flex" flex="0 1 auto" justifyContent="center" alignItems="center">
				<IconButton disableRipple onClick={toggleOpen}>
					{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
				</IconButton>
			</Box>
		</Box>
	);
};
export const NutritionMealInfo = ({
	data,
	selectedDate,
	onDelete,
	onUpdate,
}: {
	data: MealInfo;
	selectedDate: Dayjs;
	onDelete: (id: string) => void;
	onUpdate: (id: string) => void;
}) => {
	const [open, setOpen] = useState(false);

	const toggleOpen = () => {
		setOpen((ps) => !ps);
	};

	return (
		<Box >
			<Box paddingY="10px">
				<Header title={data.title} />
			</Box>
			<Box sx={{ backgroundColor: "#FFF" }} padding="16px" borderRadius="8px">
				<ItemSum data={data.data} open={open} toggleOpen={toggleOpen} />
				{open && (
					<Box paddingTop="16px">
						<NutritionAddForm type={data.type} selectedDate={selectedDate} />
						<NutritionTable items={data.data} onDelete={onDelete} onUpdate={onUpdate} />
					</Box>
				)}
			</Box>
		</Box>
	);
};
