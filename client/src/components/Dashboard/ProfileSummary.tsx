import { Avatar, Box, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useTheme } from "@mui/material/styles";
import { useUserInfoGetAPI } from "api/useLoginAPI";
import { STORAGE_ICON_KEY } from "main";
import { useEffect, useState } from "react";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { InfoChip, InfoChipm } from "./InfoChip";

const metric = window.localStorage.getItem(STORAGE_ICON_KEY);
const metricIcons = JSON.parse(String(metric));

const footImage = "foot";
const heartImage = "heart";
const fireImage = "fire";

export const ProfileSummary = ({
	showBasicOnly = false,
	size = 48,
	border = true,
	role,
	name,
	showEllipsisName = false,
}: {
	showBasicOnly?: boolean;
	role: string;
	size?: number;
	border?: boolean;
	showEllipsisName?: boolean;
	name: string;
}) => {
	const theme = useTheme();

	const [userInfo, setUserInfo] = useState<any>({});
	const userInfoGetAPI: any = useUserInfoGetAPI();

	useEffect(() => {
		userInfoGetAPI("", {
			onSuccess: (res: any) => {
				setUserInfo(res);

				if (res?.firstName) {
					const healthFitness = res.healthFitness;
					let age = "";
					if (res.demographic?.dob) {
						const dob = res?.demographic?.dob;
						const currentDate = new Date();
						const birthDate = new Date(dob);
						const ageInMilliseconds = currentDate.getTime() - birthDate.getTime();
						const ageInYears = ageInMilliseconds / (365 * 24 * 60 * 60 * 1000);

						age = `${Math.floor(ageInYears)} yrs`;
					}
					const demographic = [
						{
							label: "Age",
							value: age != "" ? age : "0",
						},
						{
							label: "Weight",
							value: healthFitness?.weight,
						},
						{
							label: "Height",
							value: healthFitness?.height,
						},
					];

					setDemographic(demographic);
				}
			},
			onError: (err: any) => {
				console.log(err);
			},
		});
	}, [userInfoGetAPI?.data]);

	const [demographic, setDemographic] = useState<any[]>([]);

	return (
		<Box
			display="flex"
			justifyContent="space-between"
			borderRadius="8px"
			alignItems="center"
			sx={{ backgroundColor: "#fff" }}
		>
			<Box display="flex" flexDirection="column" flexGrow={1} gap={2}>
				<Box display="flex" flexDirection="row" alignItems="center">
					<Avatar
						alt="Profile"
						src={userInfo?.profileImage}
						sx={{
							width: size,
							height: size,
							border: border ? "2px solid #E2C4FF" : "2px solid #fff",
						}}
					/>
					<Box display="flex" flexDirection="column" marginLeft={1}>
						<Typography
							fontSize="16px"
							fontWeight={600}
							lineHeight="19px"
							color="#000000"
							title={name}
							sx={
								showEllipsisName
									? {
											maxWidth: "120px",
											textOverflow: "ellipsis",
											whiteSpace: "nowrap",
											overflow: "hidden",
									  }
									: undefined
							}
						>
							{name}
						</Typography>
						<Typography fontSize="12px" fontWeight={400} lineHeight="15px" color="#6F6F6F">
							{role}
						</Typography>
					</Box>
				</Box>
				{!showBasicOnly && (
					<Box display="flex" flexDirection="row" gap={0}>
						{demographic.map(({ value, label }, index) => {
							return <InfoChip key={index} label={label} value={value} />;
						})}
					</Box>
				)}
			</Box>
			{!showBasicOnly && (
				<Box>
					<Grid2 spacing={0} gap={1} container flexDirection="row">
						<Grid2 borderRadius="8px" gap="8px">
							<Box
								sx={{
									minWidth: "135px",
									padding: "8px 16px",
									display: "flex",
									flexDirection: "row",
									borderRadius: "8px",
									background: "linear-gradient(180deg, #391061 0%, #7A2C96 100%)",
									gap: "16px",
									alignItems: "center",
									height: "100%",
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
									<div style={{ width: "56px", height: "56px" }}>
										<CircularProgressbarWithChildren
											styles={buildStyles({
												backgroundColor: "#fff",
												textColor: "#fff",
												trailColor: "#fff",
												pathColor: theme.palette.secondary.main,
												textSize: "12px",
											})}
											value={25}
										>
											<Typography color="#fff" fontSize="14px" fontWeight={600} lineHeight="17px">
												250
											</Typography>
											<Typography
												color="#fff"
												fontSize="8.24px"
												fontWeight={300}
												lineHeight="10px"
											>
												of 5000
											</Typography>
										</CircularProgressbarWithChildren>
									</div>
								</Box>
							</Box>
						</Grid2>
						<Grid2>
							<Box
								sx={{
									minWidth: "135px",
									padding: "8px 16px",
									display: "flex",
									flexDirection: "row",
									borderRadius: "8px",
									background: "linear-gradient(180deg, #391061 0%, #7A2C96 100%)",
									gap: "16px",
									alignItems: "center",
									height: "100%",
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
										fontSize="14px"
										fontWeight={600}
										lineHeight="16.94px"
										color="#ffffff"
										textAlign="center"
									>
										180
									</Typography>
									<Typography
										fontSize="12px"
										fontWeight={300}
										lineHeight="14.52px"
										color="#FFFFFF"
										textAlign="center"
									>
										BPM
									</Typography>
								</Box>
							</Box>
						</Grid2>
						<Grid2>
							<Box
								sx={{
									minWidth: "135px",
									padding: "8px 16px",
									display: "flex",
									flexDirection: "row",
									borderRadius: "8px",
									background: "linear-gradient(180deg, #391061 0%, #7A2C96 100%)",
									gap: "16px",
									alignItems: "center",
									height: "100%",
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
										fontSize="14px"
										fontWeight={600}
										lineHeight="16.94px"
										color="#ffffff"
										textAlign="center"
									>
										150
									</Typography>
									<Typography
										fontSize="12px"
										fontWeight={300}
										lineHeight="14.52px"
										color="#FFFFFF"
										textAlign="center"
									>
										Calories
									</Typography>
								</Box>
							</Box>
						</Grid2>
					</Grid2>
				</Box>
			)}
		</Box>
	);
};

export const ProfileSummary1 = ({
	showBasicOnly = false,
	size = 48,
	border = true,
	role,
	name,
	showEllipsisName = false,
}: {
	showBasicOnly?: boolean;
	role: string;
	size?: number;
	border?: boolean;
	showEllipsisName?: boolean;
	name: string;
}) => {
	const theme = useTheme();

	const [userInfo, setUserInfo] = useState<any>({});
	const [demographic, setDemographic] = useState<any[]>([]);
	const userInfoGetAPI: any = useUserInfoGetAPI();

	useEffect(() => {
		userInfoGetAPI("", {
			onSuccess: (res: any) => {
				setUserInfo(res);

				if (res?.firstName) {
					const healthFitness = res.healthFitness;
					let age = "";
					if (res.demographic?.dob) {
						const dob = res?.demographic?.dob;
						const currentDate = new Date();
						const birthDate = new Date(dob);
						const ageInMilliseconds = currentDate.getTime() - birthDate.getTime();
						const ageInYears = ageInMilliseconds / (365 * 24 * 60 * 60 * 1000);

						age = `${Math.floor(ageInYears)} yrs`;
					}
					const demographic = [
						{
							label: "Age",
							value: age != "" ? age : "0",
						},
						{
							label: "Weight",
							value: healthFitness?.weight,
						},
						{
							label: "Height",
							value: healthFitness?.height,
						},
					];

					setDemographic(demographic);
				}
			},
			onError: (err: any) => {
				console.log(err);
			},
		});
	}, [userInfoGetAPI]);

	return (
		<Box
			paddingLeft={"60px"}
			paddingTop={"-20px"}
			paddingBottom={"15px"}
			display="flex"
			flexDirection="column"
			flexGrow={1}
			gap={2}
		>
			<Box display="flex" flexDirection="row" alignItems="center">
				<Avatar
					alt="Profile"
					src={userInfo?.profileImage}
					sx={{
						width: size,
						height: size,
						border: border ? "2px solid #E2C4FF" : "2px solid #fff",
					}}
				/>
				<Box display="flex" flexDirection="column" marginLeft={1}>
					<Typography
						fontSize="16px"
						fontWeight={600}
						lineHeight="19px"
						color="#ffff"
						title={name}
						sx={
							showEllipsisName
								? {
										maxWidth: "120px",
										textOverflow: "ellipsis",
										whiteSpace: "nowrap",
										overflow: "hidden",
								  }
								: undefined
						}
					>
						{name}
					</Typography>
					<Typography fontSize="12px" fontWeight={400} lineHeight="15px" color="#ffff">
						{role}
					</Typography>
				</Box>
			</Box>
			{!showBasicOnly && (
				<Box display="flex" flexDirection="row" gap={1.5}>
					{demographic.map(({ value, label }, index) => {
						return <InfoChipm key={index} label={label} value={value} />;
					})}
				</Box>
			)}
		</Box>
	);
};
export const ProfileSummaryM = ({
	showBasicOnly = false,
	size = 48,
	border = true,
	role,
	name,
	showEllipsisName = false,
}: {
	showBasicOnly?: boolean;
	role: string;
	size?: number;
	border?: boolean;
	showEllipsisName?: boolean;
	name: string;
}) => {
	const theme = useTheme();

	return (
		<Box>
			<Grid2 spacing={0} gap={2} container flexDirection="row">
				<Grid2 borderRadius="8px" gap="2" width={"30%"}>
					<Box
						sx={{
							padding: "0px 3px",
							display: "flex",
							flexDirection: "row",
							borderRadius: "8px",
							background: "linear-gradient(180deg, #391061 0%, #7A2C96 100%)",
							gap: "1px",
							alignItems: "center",
							height: "100%",
						}}
					>
						{/* <img width="25" height="25" src={footImage} alt="footImage" /> */}
						{(metricIcons as any[]).map((metricIcon) => {
							if (metricIcon.image_name == footImage) {
								return (
									<img
										key={metricIcon._id}
										width="25"
										height="25"
										src={metricIcon.image_data}
										alt="footImage"
									/>
								);
							}
						})}
						<Box flexGrow={1}>
							<div style={{ width: "55px", height: "55px" }}>
								<CircularProgressbarWithChildren
									styles={buildStyles({
										backgroundColor: "#fff",
										textColor: "#fff",
										trailColor: "#fff",
										pathColor: theme.palette.secondary.main,
										textSize: "12px",
									})}
									value={60}
								>
									<Typography color="#fff" fontSize="14px" fontWeight={600} lineHeight="17px">
										3000
									</Typography>
									<Typography color="#fff" fontSize="8.24px" fontWeight={300} lineHeight="10px">
										of 5000
									</Typography>
								</CircularProgressbarWithChildren>
							</div>
						</Box>
					</Box>
				</Grid2>
				<Grid2 width={"30%"}>
					<Box
						sx={{
							padding: "0px 3px",
							display: "flex",
							flexDirection: "row",
							borderRadius: "8px",
							background: "linear-gradient(180deg, #391061 0%, #7A2C96 100%)",
							gap: "1px",
							alignItems: "center",
							height: "100%",
						}}
					>
						{/* <img width="25" height="25" src={heartImage} alt="heartImage" /> */}
						{(metricIcons as any[]).map((metricIcon) => {
							if (metricIcon.image_name == heartImage) {
								return (
									<img
										key={metricIcon._id}
										width="25"
										height="25"
										src={metricIcon.image_data}
										alt="heartImage"
									/>
								);
							}
						})}
						<Box flexGrow={1}>
							<Typography
								fontSize="14px"
								fontWeight={600}
								lineHeight="16.94px"
								color="#ffffff"
								textAlign="center"
							>
								180
							</Typography>
							<Typography
								fontSize="12px"
								fontWeight={300}
								lineHeight="14.52px"
								color="#FFFFFF"
								textAlign="center"
							>
								BPM
							</Typography>
						</Box>
					</Box>
				</Grid2>
				<Grid2 width={"29%"}>
					<Box
						sx={{
							padding: "0px 3px",
							display: "flex",
							flexDirection: "row",
							borderRadius: "8px",
							background: "linear-gradient(180deg, #391061 0%, #7A2C96 100%)",
							gap: "1px",
							alignItems: "center",
							height: "100%",
						}}
					>
						{/* <img width="25" height="25" src={fireImage} alt="fireImage" /> */}
						{(metricIcons as any[]).map((metricIcon) => {
							if (metricIcon.image_name == fireImage) {
								return (
									<img
										key={metricIcon._id}
										width="25"
										height="25"
										src={metricIcon.image_data}
										alt="fireImage"
									/>
								);
							}
						})}
						<Box flexGrow={1}>
							<Typography
								fontSize="14px"
								fontWeight={600}
								lineHeight="16.94px"
								color="#ffffff"
								textAlign="center"
							>
								150
							</Typography>
							<Typography
								fontSize="12px"
								fontWeight={300}
								lineHeight="14.52px"
								color="#FFFFFF"
								textAlign="center"
							>
								Calories
							</Typography>
						</Box>
					</Box>
				</Grid2>
			</Grid2>
		</Box>
	);
};
