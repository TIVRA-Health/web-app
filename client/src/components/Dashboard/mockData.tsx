// import { IDataItem } from "./DataItem.types";
// import RedHeartSVG from "../../assets/icons/redheart.svg";
// import HeartRateSVG from "../../assets/icons/heartrate.svg";
// import StressSVG from "../../assets/icons/Iconstress.svg";
// import RespirationSVG from "../../assets/icons/Iconlungs.svg";
// import VoxSVG from "../../assets/icons/IconVOx.svg";
// import PulseSVG from "../../assets/icons/Iconpulse.svg";
// import WeightSVG from "../../assets/icons/Iconweight.svg";
// import BPSVG from "../../assets/icons/IconBP.svg";
// import MentalSVG from "../../assets/icons/IconMental.svg";
// import userImage from "../../assets/images/user.png";
// import Running from "../../assets/icons/Iconrun.svg";
// import { Typography } from "@mui/material";

// export const healthData: IDataItem[] = [
// 	// {
// 	// 	type: "progress",
// 	// 	label: "Heart Rate",
// 	// 	icon: RedHeartSVG,
// 	// 	progressValue: 25,
// 	// 	progressLabel: (
// 	// 		<>
// 	// 			<Typography color="#000000" fontSize="16px" fontWeight={600} lineHeight="19px">
// 	// 				250
// 	// 			</Typography>
// 	// 			<Typography color="#000000" fontSize="12px" fontWeight={300} lineHeight="15px">
// 	// 				of 5000
// 	// 			</Typography>
// 	// 		</>
// 	// 	),
// 	// },
// 	{ type: "string", label: "Heart Rate", icon: RedHeartSVG, value: "72" },
// 	{
// 		type: "string",
// 		label: "Heart Rate Variability",
// 		icon: HeartRateSVG,
// 		value: "40",
// 	},
// 	{ type: "string", label: "Stress", icon: StressSVG, value: "15" },
// 	{ type: "string", label: "Respiration", icon: RespirationSVG, value: "20" },
// 	{ type: "string", label: "VOx", icon: VoxSVG, value: "46" },
// 	{
// 		type: "progress",
// 		label: "Pulse O2",
// 		icon: PulseSVG,
// 		progressValue: 90,
// 		progressLabel: (
// 			<Typography color={"#000000"} fontWeight={600} fontSize="16px" lineHeight="19px" textAlign="center">
// 				{90}
// 			</Typography>
// 		),
// 	},
// 	{
// 		type: "string",
// 		label: "Weight",
// 		icon: WeightSVG,
// 		value: "186",
// 		secondaryValue: "Pounds",
// 	},
// 	{ type: "string", label: "Blood Pressure", icon: BPSVG, value: "132/72" },
// 	{
// 		type: "string",
// 		label: "Mental Assessment",
// 		icon: MentalSVG,
// 		value: "Not ",
// 		customLabelColor: "#15AD64",
// 		customFontSize: "16px",
// 		customLineHeight: "19px",
// 	},
// ];

// const createData = (index: number) => {
// 	const isEven = index % 2 === 0;
// 	return {
// 		id: index + 1,
// 		player: {
// 			name: isEven ? `Peter Parker ${index + 1}` : `Parker Peter ${index + 1}`,
// 			icon: userImage,
// 			active: isEven,
// 		},
// 		heartRate: {
// 			icon: RedHeartSVG,
// 			value: 46 + index,
// 			unit: "bpm",
// 		},
// 		heartRateVariability: {
// 			value: 50 + index,
// 			icon: HeartRateSVG,
// 		},
// 		running: {
// 			value: 46 + index,
// 			unit: "Kms",
// 			icon: Running,
// 		},
// 	};
// };

// export const rows = Array(5)
// 	.fill(0)
// 	.map((x, i) => createData(i));
