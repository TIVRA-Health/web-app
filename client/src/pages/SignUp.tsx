import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Paper,
	Stack,
	Toolbar,
	Typography,
	useTheme,
	useMediaQuery,
	Grid,
} from "@mui/material";
import { SignInSignUpGrid, TLink } from "components/shared";

import { appLinks, uiStrings } from "main";
import { Outlet, To, useLocation /*useNavigate*/ } from "react-router-dom";
import logoSample from "../assets/images/logo.svg";
import "../css/SignUp.css";
import { FunctionComponent, useState } from 'react';
import arrows from "../assets/images/arrows.svg";
import Line47 from "../assets/images/Line 47.svg"
interface IStepListItemProps {
	to: To;
	isSelected: boolean;
	primary: string;
	secondary: string;
	isAlreadyProcessed: boolean;
}


const StepListItem = ({ to, isSelected, primary, secondary }: IStepListItemProps) => {
	//const navigate = useNavigate();
	const color = isSelected ? "#FFF" : "#DAB4FF";

	return (
		<ListItem
			sx={{
				backgroundColor: isSelected ? "#2e0d4e" : "transparent",
				color,
				borderTopRightRadius: "50px",
				borderBottomRightRadius: "50px",
			}}
			disablePadding
		>
			<ListItemButton
				//onClick={() => navigate(`/sign-up/${to}`)}
				sx={{ opacity: 1, paddingLeft: "50px", borderRadius: "50px" }}
			>
				<ListItemText
					secondaryTypographyProps={{
						color,
						fontSize: "14px",
						lineHeight: "17px",
						fontWeight: 300,
						marginTop: "6px",
					}}
					primaryTypographyProps={{
						color,
						fontSize: "16px",
						lineHeight: "19px",
						fontWeight: 700,
					}}
					primary={primary}
					secondary={secondary}
				/>
			</ListItemButton>
		</ListItem>
	);
};

const Steps: FunctionComponent = () => {
	return (
		<div style={{ position: "relative", width: "auto", color: "#000", marginTop: "-75px", }}>

			<img style={{ position: "relative", top: "", width: "100%", height: "9px", }} alt="" src={arrows} />
		</div>);
};
const Line: FunctionComponent = () => {
	return (
		<img style={{ alignmentBaseline: "central", width: "100%", height: "2px", marginTop: "56px", }} alt="" src={Line47} />);
};
export default Steps;
const Header = () => {
	const theme = useTheme();
	const { appTitle1 } = uiStrings;
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	return (
		<Toolbar
			sx={{
				padding: isMobile ? " 15px" : "25px",
				flexDirection: isMobile ? " " : "column",
				alignItems: isMobile ? " right" : "center",
				justifyContent: isMobile ? " rigth" : "center",
				backgroundColor: theme.palette.primary.main,
			}}
		>
			<Box
				alignSelf="center"
				component="img"
				sx={{
					height: isMobile ? "36px " : "46px",
					width: isMobile ? " 40px" : "50px",
				}}
				alt={appTitle1}
				src={logoSample}
			/><TLink to={appLinks.index}>
			<Stack display="flex" flexDirection="row" marginTop={1}>
				<Typography
					sx={{
						fontSize: isMobile ? " 18px" : "18px",
						fontWeight: 400,
						fontStyle: "normal",
						color: "#FFFFFF",
					}}
				>
					TIVRA
				</Typography>
				<Typography
					sx={{
						fontSize: "18px",
						fontWeight: 400,
						fontStyle: "normal",
						color: "#ED2F2F",
					}}
					marginLeft={0.5}
				>
					Health
				</Typography>
			</Stack>
			</TLink>
		</Toolbar>
	);
};
export const SignUp = () => {
	const theme = useTheme();

	const [isProcessedCreateAccount, setCreateAccount] = useState(Boolean);
	const [isProcessedCreateProfile, setCreateProfile] = useState(Boolean);
	const [isProcessedDeviceRegistration, setDeviceRegistration] = useState(Boolean);
	const [isProcessedPaymentDetails, setPaymentDetails] = useState(Boolean);

	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const {
		signUp: {
			createYourAccount,
			registerYourDevice,
			createYourProfile,
			paymentDetails: paymentDetailsSubTitle,
			signUp,
			step1,
			step2,
			step3,
			step4,
			stepm1,
			stepm2,
			stepm3,
			stepm4,
		},
	} = uiStrings;


	const StepListItemMobile = ({ to, isSelected, primary, secondary, isAlreadyProcessed }: IStepListItemProps) => {
		const alreadyProcessedColor = "#391061";
		if (primary === '1' && isSelected) {
			setCreateAccount(true);
		} else if (primary === '2' && isSelected) {
			setPaymentDetails(true);
		} else if (primary === '3' && isSelected) {
			setCreateProfile(true);
		} else if (primary === '4' && isSelected) {
			setDeviceRegistration(true);
		}

		if (primary === "1" && isProcessedCreateAccount) {
			isSelected = true;
		} else if (primary === "2" && isProcessedPaymentDetails) {
			isSelected = true;
		} else if (primary === "3" && isProcessedCreateProfile) {
			isSelected = true;
		} else if (primary === "4" && isProcessedDeviceRegistration) {
			isSelected = true;
		}
		const backgroundColor = (isAlreadyProcessed && !isSelected ? alreadyProcessedColor : (isSelected ? "#391061" : "#fff"));
		const color = (isAlreadyProcessed && !isSelected ? alreadyProcessedColor : (isSelected ? "#391061" : "#3A3A3A"));
		return (
			<ListItem
				sx={{
					textAlign: "Center",
					margin: "10px",

				}}
				disablePadding
			>


				<ListItemText
					secondaryTypographyProps={{
						color,
						textAlign: "center",
						fontSize: "11px",
						lineHeight: "13px",
						fontWeight: isSelected ? "900" : "900",
						marginTop: "10px",
					}}


					primaryTypographyProps={{
						color: isSelected ? "#fff" : "#3A3A3A",

						fontSize: "11px",
						marginTop: "6px",
						lineHeight: "16px",
						fontWeight: isSelected ? "900" : "300",

					}}
					primary={
						<div style={{
							backgroundColor, display: "inline-block", borderRadius: "50%", border: "1px solid #391061", boxSizing: "border-box", width: "20px", height: "20px",
							textAlign: "center"
						}}>
							{primary}
						</div>
					}
					secondary={secondary}
				/>

			</ListItem>
		);
	};


	const location = useLocation();
	let createAccount = false;
	let createProfile = false;
	let deviceRegistration = false;
	let paymentDetails = false;
	if (location.pathname.includes(appLinks.createProfile)) {
		createProfile = true;
	} else if (location.pathname.includes(appLinks.createAccount)) {
		createAccount = true;
	} else if (location.pathname.includes(appLinks.paymentDetails)) {
		paymentDetails = true;
	} else if (location.pathname.includes(appLinks.deviceRegistration)) {
		deviceRegistration = true;
	}

	if (!isMobile) {
		return (
			<SignInSignUpGrid
				contentLeft={
					<Paper
						elevation={0}
						variant="outlined"
						square
						sx={{
							position: "relative",
							overflowX: "hidden",
							overflowY: "auto",
							backgroundColor: theme.palette.primary.main,
							height: "100vh",
							border: "none",
						}}
					>
						<Header />
						<Stack>
							<Typography
								textAlign="left"
								color="#FFF"
								margin="20px 0"
								paddingLeft="50px"
								fontWeight={700}
								lineHeight="29px"
								fontSize="24px"
							>
								{!isMobile && signUp}
							</Typography>
							<List >
								<StepListItem
									isSelected={createAccount}
									isAlreadyProcessed={false}
									to={appLinks.createAccount}
									primary={step1}
									secondary={createYourAccount}
								/>
								<StepListItem
									isSelected={paymentDetails}
									isAlreadyProcessed={false}
									to={appLinks.paymentDetails}
									primary={step2}
									secondary={paymentDetailsSubTitle}
								/>
								<StepListItem
									isSelected={createProfile}
									isAlreadyProcessed={false}
									to={appLinks.createProfile}
									primary={step3}
									secondary={createYourProfile}
								/>
								<StepListItem
									isSelected={deviceRegistration}
									isAlreadyProcessed={false}
									to={appLinks.deviceRegistration}
									primary={step4}
									secondary={registerYourDevice}
								/>
							</List>
						</Stack>

					</Paper>
				}
				contentRight={
					<Paper
						elevation={0}
						variant="outlined"
						square
						sx={{
							overflowX: "hidden",
							overflowY: "auto",
							display: "flex",
							justifyContent: "center",
							backgroundColor: theme.palette.common.white,
							height: "100vh",
							border: "none",
						}}
					>

						<Outlet />
						<Stack>
							<Typography
								textAlign="left"
								color="#FFF"
								margin="20px 0"
								paddingLeft="50px"
								fontWeight={700}
								lineHeight="29px"
								fontSize="24px"
							>
								{signUp}
							</Typography>
						</Stack>
					</Paper>
				}
			/>
		);
	}
	return (
		// Render an alternative mobile view if needed
		<div>
			{<Paper
				elevation={0}
				variant="outlined"
				square
				sx={{

					position: "absolute",
					overflowX: "hidden",
					overflowY: "auto",
					backgroundColor: "",
					height: "100vh",
					border: "none",
				}}
			>
				<Header />
				<Stack >
					{/* <Typography
						textAlign="left"
						color="#FFF"
						margin="20px 0"
						paddingLeft="50px"
						fontWeight={700}
						lineHeight="29px"
						fontSize="24px"
					>
						{!isMobile && signUp}
					</Typography> */}
					<Grid display={"inherit"}  >
						<StepListItemMobile
							isSelected={createAccount}
							isAlreadyProcessed={createAccount}
							to={appLinks.createAccount}
							primary={stepm1}
							secondary={createYourAccount}
						/>
						<StepListItemMobile
							isSelected={paymentDetails}
							isAlreadyProcessed={paymentDetails}
							to={appLinks.paymentDetails}
							primary={stepm2}
							secondary={paymentDetailsSubTitle}
						/>
						<StepListItemMobile
							isSelected={createProfile}
							isAlreadyProcessed={createProfile}
							to={appLinks.createProfile}
							primary={stepm3}
							secondary={createYourProfile}
						/>
						<StepListItemMobile
							isSelected={deviceRegistration}
							isAlreadyProcessed={deviceRegistration}
							to={appLinks.deviceRegistration}
							primary={stepm4}
							secondary={registerYourDevice}
						/>

					</Grid>
				</Stack>
				<Steps />
				<Line />
				<div style={{ marginTop: '0px' }}>
					<Outlet />
				</div>
				<Typography

					textAlign="center"
					color="#FFF"
					margin=""
					paddingLeft="30px"
					fontWeight={700}
					lineHeight="29px"
					fontSize="24px"
				>
					{signUp}
				</Typography>

			</Paper>
			}

		</div>

	);
};