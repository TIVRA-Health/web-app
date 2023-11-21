import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

import logoSample from "../../assets/images/logo.svg";
import { uiStrings } from "main/uiStrings";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FilterM } from "components/Dashboard/HealthAndFitness";
import { HealthAndFitness } from "components/Dashboard/HealthAndFitness";
import { useLocation } from "react-router-dom";
import { NutritionDatePicker } from "../Dashboard/Nutrition/NutritionDatePciker";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

import { Box, useMediaQuery, useTheme } from "@mui/material";

import { NutritionLogs } from "../Dashboard/Nutrition/NutritionLogs";
import { useGetNutritionLogAPI } from "api/useNutritionLogAPI";
import { Daum, ValueUnitPair } from "../Dashboard/Nutrition/Nutrition.types";

export const splitIntoValueAndUnit = (input: string | undefined | null): ValueUnitPair | null => {
	if (input === undefined || input === null || input.trim() === "") {
		return {
			value: 0,
			unit: "",
		};
	}

	const valueAndUnit = input.split(/(\d+)/).filter(Boolean);

	const length = valueAndUnit?.length;
	if (length) {
		return {
			value: Number(valueAndUnit[0]),
			unit: valueAndUnit.length === 2 ? valueAndUnit[1] : "",
		};
	}

	return null;
};
export interface IAppToolbarProps {
	open: boolean;
	toggleDrawer: () => void;
}

export const AppToolbar = ({ open, toggleDrawer }: IAppToolbarProps) => {
	const theme = useTheme();
	const { appTitle1, tivra, health } = uiStrings;

	return (
		<Toolbar
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "flex-start",
				px: [1],
				py: "37px",
			}}
		>
			<IconButton onClick={toggleDrawer}>
				<MenuOpenIcon sx={{ color: open ? "#fff" : theme.palette.secondary.main, fontSize: "large" }} />
			</IconButton>
			<Box
				marginLeft="5px"
				alignSelf="center"
				component="img"
				sx={{
					height: "46px",
					width: "50px",
				}}
				alt={appTitle1}
				src={logoSample}
			/>
			<Stack display="flex" flexDirection="row" marginLeft={1}>
				<Typography
					sx={{
						fontSize: "1rem",
						fontWeight: 400,
						fontStyle: "normal",
						color: "#FFFFFF",
					}}
				>
					{tivra}
				</Typography>
				<Typography
					sx={{
						fontSize: "1rem",
						fontWeight: 400,
						fontStyle: "normal",
						color: "#ED2F2F",
					}}
					marginLeft={0.5}
				>
					{health}
				</Typography>
			</Stack>
		</Toolbar>
	);
};
export const AppToolbar1 = ({ open, toggleDrawer }: IAppToolbarProps) => {
	const theme = useTheme();
	const { appTitle1, tivra, health } = uiStrings;

	return (
		<Toolbar
			sx={{
				paddingLeft: "260px",
			}}
		>
			<IconButton onClick={toggleDrawer}>
				<MenuOpenIcon sx={{ color: open ? "#fff" : theme.palette.secondary.main }} />
			</IconButton>
		</Toolbar>
	);
};
const formatData = (inputArray: any[]): Daum[] => {
	return (
		inputArray?.map((x) => {
			return {
				calories: splitIntoValueAndUnit(x.calories),
				cholesterol: splitIntoValueAndUnit(x.cholesterol),
				fat: splitIntoValueAndUnit(x.fat),
				fiber: splitIntoValueAndUnit(x.fiber),
				protein: splitIntoValueAndUnit(x.protein),
				sugar: splitIntoValueAndUnit(x.sugar),
				id: x.id,
				item: x.item,
				itemName: x.itemName,
				itemQty: splitIntoValueAndUnit(x.itemQty),
			} as Daum;
		}) ?? []
	);
};
export const AppToolbarM = ({ open, toggleDrawer }: IAppToolbarProps) => {
	const theme = useTheme();
	const location = useLocation();
	const { appTitle1, tivra, health } = uiStrings;
	const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
	const [data, setData] = useState("");
	const [status, setStatus] = useState("");
	// const { data, status } = useGetNutritionLogAPI(selectedDate);

	const getNutritionLogAPI = useGetNutritionLogAPI();

	useEffect(() => {
		getNutritionLogAPI({ selectedDate: selectedDate }, {
			onSuccess: (resp: any) => {
				console.log(resp);
				setData(resp);
				setStatus(resp);
			},
			onError: (err: any) => {

			},
		})
	}, [getNutritionLogAPI]);
	function handleDateChange(newDate: Dayjs): void {
		throw new Error("Function not implemented.");
	}

	// const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
	// const { data, status } = useGetNutritionLogAPI(selectedDate);

	// if (status === "success") {
	// 	const formattedData = formatData(data as any);

	// 	// Callback function to update selected date
	// 	const handleDateChange = (newDate: Dayjs) => {
	// 		setSelectedDate(newDate);
	// 	};
		return (
			<Box>
				<Toolbar
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "flex-start",
						px: [2],
						py: "35px",
					}}
				>
					<IconButton onClick={toggleDrawer}>
						<MenuOpenIcon sx={{ color: open ? "#fff" : theme.palette.secondary.main }} />
					</IconButton>
					<Box
						marginLeft="5px"
						alignSelf="center"
						component="img"
						sx={{
							height: "46px",
							width: "50px",
						}}
						alt={appTitle1}
						src={logoSample}
					/>
					<Stack display="flex" flexDirection="row" marginLeft={1}>
						<Typography
							sx={{
								fontSize: "1rem",
								fontWeight: 400,
								fontStyle: "normal",
								color: "#FFFFFF",
							}}
						>
							{tivra}
						</Typography>
						<Typography
							sx={{
								fontSize: "1rem",
								fontWeight: 400,
								fontStyle: "normal",
								color: "#ED2F2F",
							}}
							marginLeft={0.5}
						>
							{health}
						</Typography>
					</Stack>
					{location.pathname === "/dashboard/overview" && (
						<Box display={"flex"} marginLeft={"auto"}>
							<FilterM />
						</Box>
					)}
				</Toolbar>
				{/* {location.pathname === "/dashboard/nutrition-log" && (
					<Box>
						<NutritionDatePicker newSelectedDate={selectedDate} onDateChange={handleDateChange} />{" "}
					</Box>
				)} */}
			</Box>
		);
	}

