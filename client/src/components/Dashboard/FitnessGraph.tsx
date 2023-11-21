import { Box, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useTheme } from "@mui/material/styles";
import { useGetUserDashboardAPI } from "api/useDashboardDataAPI";
import { STORAGE_ICON_KEY } from "main";
import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { EmptyDashboardCard } from "components/shared/EmptyDashboardCard";

// const data = [
// 	{
// 		name: "Jan",
// 		uv: 400,
// 		pv: -200,
// 		avg: -300,
// 	},
// 	{
// 		name: "Feb",
// 		uv: -600,
// 		pv: 400,
// 		avg: -300,
// 	},
// 	{
// 		name: "Mar",
// 		uv: -400,
// 		pv: 900,
// 		avg: -300,
// 	},
// 	{
// 		name: "Apr",
// 		uv: -800,
// 		pv: -300,
// 		avg: -300,
// 	},
// 	{
// 		name: "May",
// 		uv: 1000,
// 		pv: -150,
// 		avg: -300,
// 	},
// 	{
// 		name: "Jun",
// 		uv: 250,
// 		pv: 550,
// 		avg: -300,
// 	},
// 	{
// 		name: "Jul",
// 		uv: 100,
// 		pv: 430,
// 		avg: -300,
// 	},
// ];

// const healthData: IGraphData[] = [
// 	{
// 		data,
// 		label: "Steps Count",
// 		icon: StepsCount,
// 	},
// 	{
// 		data,
// 		label: "Running",
// 		icon: Running,
// 	},
// 	{
// 		data,
// 		label: "Calories Burned",
// 		icon: CaloriesBurned,
// 	},
// 	{
// 		data,
// 		label: "Body Battery",
// 		icon: BodyBattery,
// 	},
// 	{
// 		data,
// 		label: "Training Load",
// 		icon: TrainingLoad,
// 	},
// 	{ data, label: "Activities", icon: Activities },
// ];

export const FitnessGraph = () => {
	const theme = useTheme();
	const uesDashboardAPI: any = useGetUserDashboardAPI("hourly");
	const [healthData, setHealthData] = useState<any[]>([]);
	const [isEmpty, setIsEmpty] = useState(false);
	const metric = window.localStorage.getItem(STORAGE_ICON_KEY);
	const metricIcons = JSON.parse(String(metric));

	useEffect(() => {
		if (uesDashboardAPI?.data) {
			setHealthData(uesDashboardAPI?.data.fitness);
			setIsEmpty(uesDashboardAPI?.data?.status == "empty");
		}
	}, [uesDashboardAPI?.data]);

	const getIconUrl = (name: string) => {
		const iconURL = new URL(`../../assets/icons/${name}.svg`, import.meta.url).href;
		return iconURL;
	};

	return (
		<Grid2 marginTop={1} container spacing={1} alignItems="stretch">
			{isEmpty ? (<EmptyDashboardCard name="nutrition" />) : (healthData.map(({ data, icon, label }, index) => (
				<Grid2 xs={12} sm={6} md={3} key={index} spacing={3} padding="0px 16px">
					<Box
						sx={{
							width: "98%",
							backgroundColor: "#fff",
							display: "flex",
							flexDirection: "column",
							"&:hover": {
								cursor: "pointer",
								" & img": {
									transition: "0.5s all ease-in-out",
									transform: "scale(1.4)",
								},
							},
						}}
						borderRadius="8px"
						padding="8px 16px 0px 16px"
						marginBottom="16px"
					>
						<Box
							gap={1}
							display="flex"
							justifyContent="space-between"
							flexDirection="row"
							alignItems="center"
						>
							<Typography
								fontWeight={500}
								fontSize="16px"
								lineHeight="19px"
								color={theme.palette.primary.main}
							>
								{label}
							</Typography>
							{/* <img width="32" height="32" src={getIconUrl(icon)} alt={label} /> */}
							{(metricIcons as any[]).map((metricIcon) => {
								if (metricIcon.image_name == icon) {
									return (
										<img
											key={metricIcon._id}
											width="32"
											height="32"
											src={metricIcon.image_data}
											alt={label}
										/>
									);
								}
							})}
						</Box>
						<Box marginTop="10px">
							<ResponsiveContainer height="100%" width="100%" minHeight="130px">
								<LineChart
									data={data}
									margin={{
										top: 5,
										right: 5,
										left: -32,
									}}
								>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="name" fontSize="8px" />
									<YAxis
										fontSize="8px"
										type="number"
										domain={[data[0].minGraphRange, data[0].maxGraphRange]}
										tickCount={10}
									/>
									{/* <Line type="linear" dataKey="value" stroke="#FF696D" /> */}
									<Line type="linear" dataKey="min" stroke="#324DDD" />
									<Line type="linear" dataKey="max" stroke="#15AD64" />
								</LineChart>
							</ResponsiveContainer>
						</Box>
					</Box>
				</Grid2>
			)
			))}
		</Grid2>
	);
};
