import { Box, Chip, Stack, useTheme, useMediaQuery } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { HealthStack } from "./HealthStack";
import { FitnessStack } from "./FitnessStack";
import { NutritionStack } from "./NutritionStack";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { HealthGraph } from "./HealthGraph";
import { FitnessGraph } from "./FitnessGraph";
import { NutritionGraph } from "./NutritionGraph";
import { Header } from "./Header";
import { useEffect } from "react";
import { useGetDashboardDetailsAPI } from "api/dashboardAPI";
import React, { useState } from "react";
import "../../css/LoginStyle.css";
import { EmptyDashboardCard } from "../shared/EmptyDashboardCard";



const FilterPills = ({ selected, label, onClick }: any) => {
	return (
		<Chip
			sx={(theme) => ({
				width: "fit-content",
				backgroundColor: selected ? theme.palette.primary.main : "#FFFFFF",
				color: selected ? "#FFFFFF" : "#6F6F6F",
				fontWeight: selected ? 600 : 400,
				lineHeight: "15px",
			})}
			label={label}
			onClick={onClick}
		/>
	);
};
const FilterPillsM = ({ selected, label, onClick }: any) => {
	return (
		<Chip
			sx={(theme) => ({
				width: "83px",
				backgroundColor: selected ? "#ea376b" : "#FFFFFF",
				color: selected ? "#FFFFFF" : "#6F6F6F",
				fontWeight: selected ? 600 : 400,
				lineHeight: "15px",
			})}
			label={label}
			onClick={onClick}
		/>
	);
};

const Filter = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [searchParams] = useSearchParams();
	const filterBy = searchParams.get("filterBy") ?? "live";

	const changeFilter = (filterBy: string) => () => {
		navigate({
			pathname,
			search: `?filterBy=${filterBy}`,
		});
	};
	return (
		<Box display="flex" alignItems="center" padding="8px 16px" marginTop={3} justifyContent="flex-end">
			<Stack flexDirection="row" gap={1.5} justifyContent="flex-end">
				<FilterPills selected={filterBy === "live"} label="Live" onClick={changeFilter("live")} />
				<FilterPills selected={filterBy === "hourly"} label="Hourly" onClick={changeFilter("hourly")} />
				<FilterPills selected={filterBy === "weekly"} label="Weekly" onClick={changeFilter("weekly")} />
				<FilterPills selected={filterBy === "monthly"} label="Monthly" onClick={changeFilter("monthly")} />
				<FilterPills selected={filterBy === "yearly"} label="Yearly" onClick={changeFilter("yearly")} />
			</Stack>
		</Box>
	);
};

const Tab = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [searchParams] = useSearchParams();
	const selectedTab = searchParams.get("tabSelected") ?? "health";
	const filterBy = searchParams.get("filterBy") ?? "live";

	const changeTabSelection = (selectedTab: string) => () => {
		navigate({
			pathname,
			search: `?tabSelected=${selectedTab}&filterBy=${filterBy}`,
		});
	};

	return (
		<Box display="flex" alignItems="center" padding="8px 8px" marginTop={3} justifyContent="center">
			<Stack width={"120%"} flexDirection="row" gap={1.5} justifyContent="center">
				<FilterPillsM
					selected={selectedTab === "health"}
					label="Health"
					onClick={changeTabSelection("health")}
				/>
				<FilterPillsM
					selected={selectedTab === "fitness"}
					label="Fitness"
					onClick={changeTabSelection("fitness")}
				/>
				<FilterPillsM
					selected={selectedTab === "nutrition"}
					label="Nutrition"
					onClick={changeTabSelection("nutrition")}
				/>
			</Stack>
		</Box>
	);
};

export const FilterM = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [searchParams] = useSearchParams();
	const [filterBy, setFilterBy] = useState<string>(searchParams.get("filterBy") ?? "live");

	const changeFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedFilter = event.target.value;
		setFilterBy(selectedFilter);
		navigate({
			pathname,
			search: `?filterBy=${selectedFilter}`,
		});
	};

	return (
		<Box>
			<select id="filterDropdown" value={filterBy} onChange={changeFilter} className="custom-select">
				<option value="live">Live</option>
				<option value="hourly">Hourly</option>
				<option value="weekly">Weekly</option>
				<option value="monthly">Monthly</option>
				<option value="yearly">Yearly</option>
			</select>
		</Box>
	);
};

const Health = ({ filterBy }: { filterBy: string }) => {
	return (
		<Box>
			<Header icon={<FavoriteBorderOutlinedIcon />} title="Health" />
			{filterBy === "live" ? <HealthStack /> : <HealthGraph />}
		</Box>
	);
};

const Fitness = ({ filterBy }: { filterBy: string }) => {
	return (
		<Box marginTop={4}>
			<Header icon={<FitnessCenterIcon />} title="Fitness" />
			{filterBy === "live" ? <FitnessStack /> : <FitnessGraph />}
		</Box>
	);
};

const Nutrition = ({ filterBy }: { filterBy: string }) => {
	return (
		<Box marginTop={4}>
			<Header icon={<FavoriteBorderOutlinedIcon />} title="Nutrition" />
			{filterBy === "live" ? <NutritionStack /> : <NutritionGraph />}
		</Box>
	);
};

const TabDisplay = ({ selectedTab, filterBy }: { selectedTab: string; filterBy: string }) => {
	let content;

	if (selectedTab === "health") {
		content = filterBy === "live" ? <HealthStack /> : <HealthGraph />;
	} else if (selectedTab === "fitness") {
		content = filterBy === "live" ? <FitnessStack /> : <FitnessGraph />;
	} else if (selectedTab === "nutrition") {
		content = filterBy === "live" ? <NutritionStack /> : <NutritionGraph />;
	}

	return <div>{content}</div>;
};

export const HealthAndFitness = () => {
	// const getDashboardDetailsMutation: any = useGetDashboardDetailsAPI();

	// useEffect(() => {
	// 	console.log(getDashboardDetailsMutation?.data);
	// }, [getDashboardDetailsMutation?.data]);
	const [searchParams] = useSearchParams();
	const filterBy = searchParams.get("filterBy") ?? "live";
	const selectedTab = searchParams.get("tabSelected") ?? "health";
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const showFilterM = !isMobile;
	if (!isMobile) {
		return (
			<Box>
				<Filter />
				<Box padding="16px 8px" paddingLeft="4px">
				
					<Health filterBy={filterBy} />
					<Fitness filterBy={filterBy} />
					<Nutrition filterBy={filterBy} />
				</Box>
			</Box>
		);
	}
	return (
		// <Box><Box position={"absolute"} justifyContent="space-between" alignItems="center" marginLeft={"250px"} marginTop={"-120px"}
		// style={{
		// 	zIndex:"2",
		//   }}>

		// 	<FilterM />
		<Box>
			<Tab />
			<Box>
				<TabDisplay selectedTab={selectedTab} filterBy={filterBy} />
			</Box>
		</Box>
	);
};
