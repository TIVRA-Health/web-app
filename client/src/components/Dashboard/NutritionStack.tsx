import { Box, Typography, useMediaQuery } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useTheme } from "@mui/material/styles";
import { useGetUserDashboardAPI } from "api/useDashboardDataAPI";
import { STORAGE_ICON_KEY } from "main";
import { useEffect, useState } from "react";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import { EmptyDashboardCard } from "components/shared/EmptyDashboardCard";
export const NutritionStack = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const uesDashboardAPI: any = useGetUserDashboardAPI("live");
	const [healthData, setHealthData] = useState<any[]>([]);
	const [isEmpty, setIsEmpty] = useState(false);

	useEffect(() => {
		if (uesDashboardAPI?.data) {
			setHealthData(uesDashboardAPI?.data.nutrition);
			setIsEmpty(uesDashboardAPI?.data?.status == "empty");
		}
	}, [uesDashboardAPI?.data]);

	const getIconUrl = (name: string) => {
		const iconURL = new URL(`../../assets/icons/${name}.svg`, import.meta.url).href;
		return iconURL;
	};

	const metric = window.localStorage.getItem(STORAGE_ICON_KEY);
	const metricIcons = JSON.parse(String(metric));

	if (!isMobile) {
		return (
			<Grid2 marginTop={1} container spacing={1} alignItems="stretch">
				{isEmpty ? (<EmptyDashboardCard name="nutrition" />) : (healthData &&
					healthData.map(
						(
							{
								icon,
								label,
								type,
								value,
								progressLabel,
								progressValue,
								customLabelColor,
								secondaryValue,
								customFontSize,
								customLineHeight,
							},
							index
						) => (
							<Grid2 xs={12} sm={6} md={3} key={index} spacing={3} padding="8px 16px">
								<Box
									padding="8px 16px"
									sx={{
										backgroundColor: "#fff",
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
										"&:hover": {
											cursor: "pointer",
											" & img": {
												transition: "0.5s all ease-in-out",
												transform: "scale(1.5)",
											},
										},
									}}
									borderRadius="8px"
									gap="16px"
									height="100%"
									minHeight="91px"
								>
									<Box
										flexGrow={1}
										gap={1}
										display="flex"
										flexDirection="column"
										borderRight="2px solid #DFDFDF"
									>
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
										<Typography
											fontWeight={400}
											fontSize="14px"
											lineHeight="17px"
											color={theme.palette.primary.main}
										>
											{label}
										</Typography>
									</Box>
									<Box width="84px">
										{type === "progress" && progressValue ? (
											<div style={{ width: "75px", height: "75px" }}>
												<CircularProgressbarWithChildren
													styles={buildStyles({
														backgroundColor: "#fff",
														textColor: "#fff",
														trailColor: "#DFDFDF",
														pathColor: theme.palette.secondary.main,
														textSize: "12px",
													})}
													value={progressValue}
												>
													<Typography
														color={customLabelColor ?? "#000000"}
														fontWeight={600}
														fontSize={customFontSize ?? "24px"}
														lineHeight={customLineHeight ?? "29px"}
														textAlign="center"
													>
														{progressLabel}
													</Typography>
												</CircularProgressbarWithChildren>
											</div>
										) : (
											<Box>
												<Typography
													color={customLabelColor ?? "#000000"}
													fontWeight={600}
													fontSize={customFontSize ?? "24px"}
													lineHeight={customLineHeight ?? "29px"}
													textAlign="center"
												>
													{value}
												</Typography>
												{secondaryValue && (
													<Typography
														color={"#6F6F6F"}
														fontWeight={300}
														fontSize="12px"
														lineHeight="15px"
														textAlign="center"
													>
														{secondaryValue}
													</Typography>
												)}
											</Box>
										)}
									</Box>
								</Box>
							</Grid2>

						)
					))}
			</Grid2>
		);
	}
	return (
		<Grid2 marginTop={1} container spacing={1} alignItems="stretch">
			{isEmpty ? (<EmptyDashboardCard name="nutrition" />) : (healthData &&
				healthData.map(
					(
						{
							icon,
							label,
							type,
							value,
							progressLabel,
							progressValue,
							customLabelColor,
							secondaryValue,
							customFontSize,
							customLineHeight,
						},
						index
					) => (
						<Grid2 xs={6} key={index} spacing={3} padding="4px 8px">
							<Box
								padding="8px 16px"
								sx={{
									backgroundColor: "#fff",
									display: "flex", // Display icon, label, value, and secondaryValue in the same row
									flexDirection: "column", // Stack elements vertically
									alignItems: "flex-start", // Align items vertically at the start
									justifyContent: "space-between",
									"&:hover": {
										cursor: "pointer",
										" & img": {
											transition: "0.5s all ease-in-out",
											transform: "scale(1.5)",
										},
									},
								}}
								borderRadius="8px"
								gap={0} // Reduce the gap to 0
								height="100%"
								minHeight="91px"
							>
								{" "}
								<div style={{ display: "flex", width: "100%" }}>
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
									<div style={{ justifyContent: "space-between" }}>
										<Typography
											padding={"10px"}
											fontWeight={400}
											fontSize="14px"
											lineHeight="17px"
											color={theme.palette.primary.main}
										>
											{label}
										</Typography>
									</div>
								</div>
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										width: "100%",
										textAlign: "left",
										paddingLeft: "65px",
									}}
								>
									{type === "progress" && progressValue ? (
										<div style={{ width: "60px", height: "60px" }}>
											<CircularProgressbarWithChildren
												styles={buildStyles({
													backgroundColor: "#fff",
													textColor: "#fff",
													trailColor: "#DFDFDF",
													pathColor: theme.palette.secondary.main,
													textSize: "12px",
												})}
												value={progressValue}
											>
												{progressLabel}
											</CircularProgressbarWithChildren>
										</div>
									) : (
										<Box style={{ width: "100%" }}>
											<div style={{ textAlign: "right" }}>
												<Typography
													color={customLabelColor ?? "#000000"}
													fontWeight={600}
													fontSize={customFontSize ?? "24px"}
													lineHeight={customLineHeight ?? "29px"}
													textAlign="right"
												>
													{value}
												</Typography>
											</div>
											{secondaryValue && (
												<div style={{ textAlign: "right" }}>
													<Typography
														color={"#6F6F6F"}
														fontWeight={300}
														fontSize="12px"
														lineHeight="15px"
														textAlign="right"
													>
														{secondaryValue}
													</Typography>
												</div>
											)}
										</Box>
									)}
								</div>
							</Box>
						</Grid2>
				
				)
				))}
		</Grid2>
	);
};
