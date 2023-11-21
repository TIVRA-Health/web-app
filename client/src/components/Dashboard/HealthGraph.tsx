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
// 		// uv: 400,
// 		value: -200,
// 		// avg: -300,
// 		min: -400,
// 		max: 400,
// 		minGraphRange: -950,
// 		maxGraphRange: 950,
// 	},
// 	{
// 		name: "Feb",
// 		// uv: -600,
// 		value: 400,
// 		// avg: -300,
// 		min: -400,
// 		max: 400,
// 		minGraphRange: -950,
// 		maxGraphRange: 950,
// 	},
// 	{
// 		name: "Mar",
// 		// uv: -400,
// 		value: 900,
// 		// avg: -300,
// 		min: -400,
// 		max: 400,
// 		minGraphRange: -950,
// 		maxGraphRange: 950,
// 	},
// 	{
// 		name: "Apr",
// 		// uv: -800,
// 		value: -300,
// 		// avg: -300,
// 		min: -400,
// 		max: 400,
// 		minGraphRange: -950,
// 		maxGraphRange: 950,
// 	},
// 	{
// 		name: "May",
// 		// uv: 1000,
// 		value: -150,
// 		// avg: -300,
// 		min: -400,
// 		max: 400,
// 		minGraphRange: -950,
// 		maxGraphRange: 950,
// 	},
// 	{
// 		name: "Jun",
// 		// uv: 250,
// 		value: 550,
// 		// avg: -300,
// 		min: -400,
// 		max: 400,
// 		minGraphRange: -950,
// 		maxGraphRange: 950,
// 	},
// 	{
// 		name: "Jul",
// 		// uv: 100,
// 		value: 430,
// 		// avg: -300,
// 		min: -400,
// 		max: 400,
// 		minGraphRange: -950,
// 		maxGraphRange: 950,
// 	},
// ];

// const healthData: IGraphData[] = [
// 	{
// 		label: "Heart Rate",
// 		icon: RedHeartSVG,
// 		data,
// 	},
// 	{
// 		label: "Heart Rate Variability",
// 		icon: HeartRateSVG,
// 		data,
// 	},
// 	{ data, label: "Stress", icon: StressSVG },
// 	{ data, label: "Respiration", icon: RespirationSVG },
// 	{ data, label: "VOx", icon: VoxSVG },
// 	{
// 		data,
// 		label: "Pulse O2",
// 		icon: PulseSVG,
// 	},
// 	{
// 		data,
// 		label: "Weight",
// 		icon: WeightSVG,
// 	},
// 	{ data, label: "Blood Pressure", icon: BPSVG },
// 	{
// 		data,
// 		label: "Mental Assessment",
// 		icon: MentalSVG,
// 	},
// ];

export const HealthGraph = () => {
	const theme = useTheme();

	const uesDashboardAPI: any = useGetUserDashboardAPI("hourly");
	const [healthData, setHealthData] = useState<any[]>([]);
	const [isEmpty, setIsEmpty] = useState(false);
	useEffect(() => {
		if (uesDashboardAPI?.data) {
			setHealthData(uesDashboardAPI?.data.health);
			setIsEmpty(uesDashboardAPI?.data?.status == "empty");
		}
	}, [uesDashboardAPI?.data]);

	const getIconUrl = (name: string) => {
		const iconURL = new URL(`../../assets/icons/${name}.svg`, import.meta.url).href;
		return iconURL;
	};

	const metric = window.localStorage.getItem(STORAGE_ICON_KEY);
	const metricIcons = JSON.parse(String(metric));

	return (
		<Grid2 marginTop={1} container spacing={1} alignItems="stretch">
			{isEmpty ? (<EmptyDashboardCard name="health" />) : (healthData.map(({ data, icon, label }, index) => (
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
									<Line type="linear" dataKey="value" stroke="#FF696D" />
									{/* <Line type="linear" dataKey="uv" stroke="#324DDD" /> */}
									<Line type="linear" dataKey="min" stroke="#15AD64" />
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
