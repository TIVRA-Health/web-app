import { Box, Chip, MenuItem, Select, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useGetTeammateDetailAPI } from "api/useTeamAPI";
import { STORAGE_ICON_KEY } from "main";
import { useEffect, useState } from "react";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import { useSearchParams } from "react-router-dom";
import "../../css/TeammateProfile.css";
import { ProfileSummary } from "./ProfileSummary";

type DataType = "health" | "fitness" | "nutrition";
const dataTypes: { label: string; value: DataType }[] = [
	{
		label: "Health",
		value: "health",
	},
	{
		label: "Fitness",
		value: "fitness",
	},
	{
		label: "Nutrition",
		value: "nutrition",
	},
];

const footImage = "foot";
const heartImage = "heart";
const fireImage = "fire";

export const TeammateProfile = ({ mateId, rows }: { mateId: string; rows: any[] }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const [searchParams, setSearchParams] = useSearchParams();
	const mateFilterBy = searchParams.get("mateFilterBy") ?? "live";

	const [selectedType, setSelectedType] = useState<DataType>("health");
	const [data, setData] = useState<any[]>([]);

	const getTeammateDetailAPI: any = useGetTeammateDetailAPI(mateFilterBy, mateId);
	console.log("Rows: ", rows);
	console.log("loading teammate profile");
	useEffect(() => {
		if (getTeammateDetailAPI?.data) {
			const index = getTeammateDetailAPI?.data?.health;
			if (index) {
				console.log("Selected type: ", selectDataType);
				if (selectedType === "health") {
					setData(getTeammateDetailAPI?.data?.health);
				} else if (selectedType === "fitness") {
					setData(getTeammateDetailAPI?.data?.fitness);
				} else if (selectedType === "nutrition") {
					setData(getTeammateDetailAPI?.data?.nutrition);
				}
			}
		}
	}, [getTeammateDetailAPI?.data]);

	const changeFilter = ({ target: { value } }: any) => {
		searchParams.set("mateFilterBy", value);
		setSearchParams(searchParams);
	};

	const selectDataType = (type: DataType) => () => {
		setSelectedType(type);
	};

	const getIconUrl = (name: string) => {
		const iconURL = new URL(`../../assets/icons/${name}.svg`, import.meta.url).href;
		return iconURL;
	};

	const metric = window.localStorage.getItem(STORAGE_ICON_KEY);
	const metricIcons = JSON.parse(String(metric));

	if (mateId == "") return null;

	// const data =
	// 	selectedType === "health"
	// 		? healthData.slice(0, 5)
	// 		: selectedType === "fitness"
	// 		? healthData.slice(0, 2)
	// 		: healthData.slice(0, 3);

	const profile = rows.find((x) => x.id === mateId)?.player.name ?? "";
	if (!isMobile) {
		return (
			<Box padding="16px 16px" sx={{ backgroundColor: "#fff" }} borderRadius="8px" height="100%">
				<Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
					<Box
						paddingBottom="6px"
						sx={{ backgroundColor: "#fff" }}
						borderRadius="8px"
						display="flex"
						alignItems="center"
					>
						<ProfileSummary
							name={profile}
							showEllipsisName={true}
							showBasicOnly={true}
							role="Mild Fielder"
							size={72}
							border={false}
						/>
					</Box>
					<Select
						value={mateFilterBy}
						onChange={changeFilter}
						displayEmpty
						size="small"
						sx={(theme) => ({
							borderRadius: "4px",
							color: "#fff",
							backgroundColor: theme.palette.secondary.main,
							"& .MuiSvgIcon-root": {
								color: "white",
							},
							"& fieldset": { border: "none" },
							minWidth: "106px",
							border: "none",
						})}
					>
						<MenuItem value={"live"}>Live</MenuItem>
						<MenuItem value={"weekly"}>Weekly</MenuItem>
						<MenuItem value={"monthly"}>Monthly</MenuItem>
						<MenuItem value={"yearly"}>Yearly</MenuItem>
					</Select>
				</Box>
				<Stack display="flex" flexDirection="row" gap={2} marginTop={2}>
					<Box
						sx={{
							width: "100%",
							padding: "3px 8px",
							display: "flex",
							flexDirection: "row",
							borderRadius: "8px",
							background: "linear-gradient(180deg, #391061 0%, #7A2C96 100%)",
							gap: "5px",
							alignItems: "center",
						}}
					>
						{/* <img width="32" height="32" src={footImage} alt="footImage" /> */}
						{(metricIcons as any[]).map((metricIcon) => {
							if (metricIcon.image_name == footImage) {
								return (
									<img
										key={metricIcon._id}
										width="32"
										height="32"
										src={metricIcon.image_data}
										alt="footImage"
									/>
								);
							}
						})}
						<Box flexGrow={1}>
							<div style={{ width: "36px", height: "36px" }}>
								<CircularProgressbarWithChildren
									styles={buildStyles({
										backgroundColor: "#fff",
										textColor: "#fff",
										trailColor: "#fff",
										pathColor: theme.palette.secondary.main,
										textSize: "12px",
									})}
									value={55}
								>
									<Typography color="#fff" fontSize="10px" fontWeight={600} lineHeight="13px">
										2500
									</Typography>
									<Typography color="#fff" fontSize="6px" fontWeight={300} lineHeight="10px">
										of 10000
									</Typography>
								</CircularProgressbarWithChildren>
							</div>
						</Box>
					</Box>
					<Box
						sx={{
							width: "100%",
							padding: "3px 8px",
							display: "flex",
							flexDirection: "row",
							borderRadius: "8px",
							background: "linear-gradient(180deg, #391061 0%, #7A2C96 100%)",
							gap: "5px",
							alignItems: "center",
						}}
					>
						{/* <img width="32" height="32" src={heartImage} alt="heartImage" /> */}
						{(metricIcons as any[]).map((metricIcon) => {
							if (metricIcon.image_name == heartImage) {
								return (
									<img
										key={metricIcon._id}
										width="32"
										height="32"
										src={metricIcon.image_data}
										alt="heartImage"
									/>
								);
							}
						})}
						<Box flexGrow={1}>
							<Typography
								fontSize="10px"
								fontWeight={600}
								lineHeight="13px"
								color="#ffffff"
								textAlign="center"
							>
								180
							</Typography>
							<Typography
								fontSize="9px"
								fontWeight={300}
								lineHeight="11px"
								color="#FFFFFF"
								textAlign="center"
							>
								BPM
							</Typography>
						</Box>
					</Box>
					<Box
						sx={{
							width: "100%",
							padding: "3px 8px",
							display: "flex",
							flexDirection: "row",
							borderRadius: "8px",
							background: "linear-gradient(180deg, #391061 0%, #7A2C96 100%)",
							gap: "5px",
							alignItems: "center",
						}}
					>
						{/* <img width="32" height="32" src={fireImage} alt="fireImage" /> */}
						{(metricIcons as any[]).map((metricIcon) => {
							if (metricIcon.image_name == fireImage) {
								return (
									<img
										key={metricIcon._id}
										width="32"
										height="32"
										src={metricIcon.image_data}
										alt="fireImage"
									/>
								);
							}
						})}
						<Box flexGrow={1}>
							<Typography
								fontSize="10px"
								fontWeight={600}
								lineHeight="13px"
								color="#ffffff"
								textAlign="center"
							>
								150
							</Typography>
							<Typography
								fontSize="9px"
								fontWeight={300}
								lineHeight="11px"
								color="#FFFFFF"
								textAlign="center"
							>
								Calories
							</Typography>
						</Box>
					</Box>
				</Stack>
				<Stack display="flex" flexDirection="row" justifyContent="space-between" marginTop={3}>
					{dataTypes.map(({ label, value }) => {
						const selected = selectedType === value;
						return (
							<Chip
								key={label}
								sx={(theme) => ({
									width: "fit-content",
									backgroundColor: selected ? theme.palette.secondary.main : "#F5F5F5",
									color: selected ? "#FFFFFF" : "#3A3A3A",
									fontWeight: 500,
									fontSize: "12px",
									lineHeight: "15px",
								})}
								label={label}
								onClick={selectDataType(value)}
							/>
						);
					})}
				</Stack>
				<Stack
					className="rahuj"
					display="grid"
					flexDirection="column"
					justifyContent="space-between"
					marginTop={3}
					gap={1}
				>
					{data.map(
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
							<Box
								key={index}
								padding="3px 8px"
								sx={{
									backgroundColor: "#F5F5F5",
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
								gap="16px"
								minHeight="91px"
								borderRadius="8px"
							>
								<Box
									flexGrow={1}
									gap={1}
									display="flex"
									flexDirection="row"
									alignItems="center"
									borderRight="2px solid #DFDFDF"
									paddingY="14px"
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
										<div
											style={{ width: "75px", height: "75px", color: "black", fontWeight: "700" }}
										>
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
						)
					)}
				</Stack>
			</Box>
		);
	}
	return (
		<Box padding="15px " sx={{ backgroundColor: "#fff" }} borderRadius="8px" height="100%">
			<Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
				<Box
					paddingBottom="6px"
					sx={{ backgroundColor: "#fff" }}
					borderRadius="8px"
					display="flex"
					alignItems="center"
				>
					<ProfileSummary
						name={profile}
						showEllipsisName={true}
						showBasicOnly={true}
						role="Mild Fielder"
						size={72}
						border={false}
					/>
				</Box>
				<Select
					value={mateFilterBy}
					onChange={changeFilter}
					displayEmpty
					size="small"
					sx={(theme) => ({
						borderRadius: "4px",
						color: "#fff",
						backgroundColor: theme.palette.secondary.main,
						"& .MuiSvgIcon-root": {
							color: "white",
						},
						"& fieldset": { border: "none" },
						minWidth: "80px",
						border: "none",
					})}
				>
					<MenuItem value={"live"}>Live</MenuItem>
					<MenuItem value={"weekly"}>Weekly</MenuItem>
					<MenuItem value={"monthly"}>Monthly</MenuItem>
					<MenuItem value={"yearly"}>Yearly</MenuItem>
				</Select>
			</Box>
			<Stack display="flex" flexDirection="row" gap={1} marginTop={2}>
				<Box
					sx={{
						width: "100%",
						padding: "3px 8px",
						display: "flex",
						flexDirection: "row",
						borderRadius: "8px",
						background: "linear-gradient(180deg, #391061 0%, #7A2C96 100%)",
						gap: "5px",
						alignItems: "center",
					}}
				>
					{/* <img width="32" height="32" src={footImage} alt="footImage" /> */}
					{(metricIcons as any[]).map((metricIcon) => {
						if (metricIcon.image_name == footImage) {
							return (
								<img
									key={metricIcon._id}
									width="32"
									height="32"
									src={metricIcon.image_data}
									alt="footImage"
								/>
							);
						}
					})}
					<Box flexGrow={1}>
						<div style={{ width: "36px", height: "36px" }}>
							<CircularProgressbarWithChildren
								styles={buildStyles({
									backgroundColor: "#fff",
									textColor: "#fff",
									trailColor: "#fff",
									pathColor: theme.palette.secondary.main,
									textSize: "12px",
								})}
								value={55}
							>
								<Typography color="#fff" fontSize="10px" fontWeight={600} lineHeight="13px">
									2500
								</Typography>
								<Typography color="#fff" fontSize="6px" fontWeight={300} lineHeight="10px">
									of 10000
								</Typography>
							</CircularProgressbarWithChildren>
						</div>
					</Box>
				</Box>
				<Box
					sx={{
						width: "100%",
						padding: "3px 8px",
						display: "flex",
						flexDirection: "row",
						borderRadius: "8px",
						background: "linear-gradient(180deg, #391061 0%, #7A2C96 100%)",
						gap: "5px",
						alignItems: "center",
					}}
				>
					{/* <img width="32" height="32" src={heartImage} alt="heartImage" /> */}
					{(metricIcons as any[]).map((metricIcon) => {
						if (metricIcon.image_name == heartImage) {
							return (
								<img
									key={metricIcon._id}
									width="32"
									height="32"
									src={metricIcon.image_data}
									alt="heartImage"
								/>
							);
						}
					})}
					<Box flexGrow={1}>
						<Typography
							fontSize="10px"
							fontWeight={600}
							lineHeight="13px"
							color="#ffffff"
							textAlign="center"
						>
							180
						</Typography>
						<Typography
							fontSize="9px"
							fontWeight={300}
							lineHeight="11px"
							color="#FFFFFF"
							textAlign="center"
						>
							BPM
						</Typography>
					</Box>
				</Box>
				<Box
					sx={{
						width: "100%",
						padding: "3px 8px",
						display: "flex",
						flexDirection: "row",
						borderRadius: "8px",
						background: "linear-gradient(180deg, #391061 0%, #7A2C96 100%)",
						gap: "5px",
						alignItems: "center",
					}}
				>
					{/* <img width="32" height="32" src={fireImage} alt="fireImage" /> */}
					{(metricIcons as any[]).map((metricIcon) => {
						if (metricIcon.image_name == fireImage) {
							return (
								<img
									key={metricIcon._id}
									width="32"
									height="32"
									src={metricIcon.image_data}
									alt="fireImage"
								/>
							);
						}
					})}
					<Box flexGrow={1}>
						<Typography
							fontSize="10px"
							fontWeight={600}
							lineHeight="13px"
							color="#ffffff"
							textAlign="center"
						>
							150
						</Typography>
						<Typography
							fontSize="9px"
							fontWeight={300}
							lineHeight="11px"
							color="#FFFFFF"
							textAlign="center"
						>
							Calories
						</Typography>
					</Box>
				</Box>
			</Stack>
			<Stack display="flex" flexDirection="row" justifyContent="space-between" marginTop={3}>
				{dataTypes.map(({ label, value }) => {
					const selected = selectedType === value;
					return (
						<Chip
							key={label}
							sx={(theme) => ({
								width: "fit-content",
								backgroundColor: selected ? theme.palette.secondary.main : "#F5F5F5",
								color: selected ? "#FFFFFF" : "#3A3A3A",
								fontWeight: 500,
								fontSize: "12px",
								lineHeight: "15px",
							})}
							label={label}
							onClick={selectDataType(value)}
						/>
					);
				})}
			</Stack>
			<Stack
				className="rahug"
				display="grid"
				flexDirection="column"
				justifyContent="space-between"
				marginTop={3}
				gap={1}
			>
				{data.map(
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
						<Box
							key={index}
							padding="3px 8px"
							sx={{
								backgroundColor: "#F5F5F5",
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
							gap="5px"
							height="70px"
							width={235}
							borderRadius="8px"
						>
							<Box
								flexGrow={1}
								gap={1}
								display="flex"
								flexDirection="row"
								alignItems="center"
								borderRight="2px solid #DFDFDF"
								paddingY="14px"
								width={110}
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
									<div style={{ width: "60px", height: "60px", color: "black", fontWeight: "600" }}>
										<CircularProgressbarWithChildren
											styles={buildStyles({
												backgroundColor: "#fff",

												// textColor: "#fff",
												// trailColor: "#DFDFDF",
												pathColor: theme.palette.secondary.main,
												textSize: "12px",
											})}
											value={progressValue}
										>
											{progressLabel}
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
					)
				)}
			</Stack>
		</Box>
	);
};
