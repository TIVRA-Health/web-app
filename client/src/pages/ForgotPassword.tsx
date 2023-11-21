import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import { AppBar, Button, IconButton, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { FilledTextFieldM, RHFTextField, TLink } from "components/shared";
import { appLinks } from "main";
import { EmailRegExp, PasswordRegExp } from "main/constants";
import { uiStrings } from "main/uiStrings";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import full from "../assets/images/Rectangle73.png";
import box3 from "../assets/images/box3.png";
import logoSample from "../assets/images/logo.svg";
import mainImage from "../assets/images/main_1.svg";

import { useOtpGenerationAPI, useOtpValidationAPI } from "api/signUpAccountAPI";
import { toast } from "react-toastify";
import down from "../assets/images/down.png";
import "../css/Homepage.css";
import { usePutResetPasswordAPI } from "api/accountCreateAPI";

interface ISignInState {
	username: string;
	password: string;
	persistUser: boolean;
}

const defaultValues: ISignInState = {
	password: "",
	persistUser: false,
	username: "",
};

let profiles = [] as any;
const Header = () => {
	const { appTitle1 } = uiStrings;
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<AppBar position="sticky">
			<Toolbar
				sx={{
					padding: "25px",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: theme.palette.primary.main,
				}}
			>
				<Box
					alignSelf="center"
					component="img"
					sx={{
						height: "46px",
						width: "50px",
					}}
					alt={appTitle1}
					src={logoSample}
				/>
				<TLink to={appLinks.index}>
					<Stack display="flex" flexDirection="row" marginTop={1}>
						<Typography
							sx={{
								fontSize: "18px",
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
		</AppBar>
	);
};

const Mobile = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	return (
		<Toolbar
			sx={{

				padding: "25px",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Box
				component="img"
				sx={{
					height: "46px",
					width: "50px",
				}}
				src={logoSample}
			/>
			<TLink to={appLinks.index}>
				<Stack display="flex" flexDirection="row" marginTop={1}>
					<Typography
						sx={{
							fontSize: "18px",
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
const Login = () => {
	const { handleSubmit, control, register, getValues } = useForm({
		defaultValues,
		mode: "onChange",
	});

	const {
		signIn: { forgot, resetPassword, ButtonText, setButtonText, Submit, confirmPassword, password, required },
		validation: { emailFormat, passwordValidation1, passwordMatch },
	} = uiStrings;

	const navigate = useNavigate();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	// State to manage OTP input visibility, button text, and reset password form
	const [successMessage, setSuccessMessage] = useState(false);
	const [showOTPInput, setShowOTPInput] = useState(false);
	const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);

	const generateOtp = useOtpGenerationAPI();
	const validateOtp = useOtpValidationAPI();
	const resetPasswordAPI = usePutResetPasswordAPI();

	const onSubmit = async (data: any) => {
		if (showOTPInput && !showResetPasswordForm) {
			validateOtp(
				{ emailId: data?.email, otp: data?.otp },
				{
					onSuccess: (res) => {
						console.log("validate user: ", res);
						setShowResetPasswordForm(true);
					},
					onError: (err) => {
						console.log(err);
					},
				}
			);
		} else if (showResetPasswordForm) {
			resetPasswordAPI(
				{ ...data },
				{
					onSuccess: (res) => {
						if (res.status === "success") {
							setSuccessMessage(true);
						}
					},
					onError: (err) => {
						console.log(err);
					},
				}
			);
		} else {
			generateOtp(
				{ emailId: data?.email },
				{
					onSuccess: (res) => {
						console.log("Otp sent: ", res);
						toast.success("Otp generated successfully");
						setShowOTPInput(true);
					},
					onError: (err) => {
						console.log(err);
					},
				}
			);
		}
	};

	return (
		<>
			<Box
				color="text.primary"
				width={isMobile ? "250px" : "300px"}
				paddingY={3}
				paddingX={5}
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					marginTop: "50px",
					backgroundColor: isMobile ? "#ffffff" : "#ffffff",
					borderRadius: "8px",
					padding: isMobile ? "10px" : "24px",
				}}
			>
				<Stack gap={1.5} paddingBottom={0} justifyItems="center" alignItems="center">
					<Typography
						sx={{
							color: "#000000",
							fontWeight: 400,
							lineHeight: "29px",
							fontSize: "24px",
							marginBottom: "15px",
						}}
					>
						{showResetPasswordForm ? resetPassword : forgot}
					</Typography>
					{successMessage ? (
						<div className="success-message">

							<div className="container">
								<div className="circle">
									<span className="tick">&#10003;</span>
								</div>
								<div className="text">
									<p className="pass">Password reset successful</p>
									<p>Your password has now been reset.
										<Button
											type="button"
											size="small"
											disableRipple
											sx={(theme) => ({
												fontSize: "16px",
												lineHeight: "17px",
												fontWeight: "600",
												padding: "0px",
												color: theme.palette.secondary.main,
												backgroundColor: "transparent",
												"&:hover": {
													backgroundColor: "transparent",
												},
												"&:focus": {
													backgroundColor: "transparent",
												},
												"&:active": {
													backgroundColor: "transparent",
												},
											})}
											variant="text"
											onClick={() => {
												navigate(`${appLinks.index}`, { replace: true });
											}}
										>
											Click here
										</Button> to continue</p>
								</div>
							</div>
						</div>
					) : (showResetPasswordForm ? (
						<>
							<Grid2 xs={12} sx={{ paddingTop: isMobile ? "" : "5px" }}>
								<FilledTextFieldM
									type="password"
									name="password"
									label={password}
									control={control}
									required={{
										value: true,
										message: "password is required",
									}}
									validate={{
										matchPattern: (v) => PasswordRegExp.test(v) || passwordValidation1,
									}}
								/>
							</Grid2>
							<Grid2 xs={12} sx={{ paddingTop: isMobile ? "" : "5px" }}>
								<FilledTextFieldM
									type="password"
									name="confirmPassword"
									label={confirmPassword}
									control={control}
									required={{
										value: true,
										message: "Confirm password is required",
									}}
									validate={(value) => {
										const { password } = getValues();
										return password === value || passwordMatch;
									}}
								/>
							</Grid2>
						</>
					) : (
						<>
							<RHFTextField
								name="email"
								placeholder="Email"
								control={control}
								pattern={{
									value: EmailRegExp,
									message: emailFormat,
								}}
								required={{
									value: true,
									message: required,
								}}
							/>
							{showOTPInput && (
								<RHFTextField
									name="otp"
									control={control}
								// Add validation rules for OTP input if needed
								/>
							)}
						</>
					))}
					{!successMessage && <Button
						fullWidth
						type="button"
						variant="contained"
						sx={{
							mt: 3,
							py: 1.5,
						}}
						onClick={handleSubmit(onSubmit)}
					>
						{showOTPInput && !showResetPasswordForm
							? "Valdiate OTP"
							: showResetPasswordForm
								? "Reset Password"
								: ButtonText}
					</Button>}
				</Stack>
			</Box>
		</>
	);
};

const Box1 = () => {
	return (
		<Box>
			<Typography color="#fff" fontSize="22px">
				Fitness is not about being better than
			</Typography>
			<Typography
				sx={{
					fontWeight: 900,
					fontSize: "48px",
					color: "#000",
					lineHeight: "48px",
					textShadow: "1px 0 0 #fff, 0 -1px 0 #fff, 0 1px 0 #fff, -1px 0 0 #fff",
				}}
			>
				someone else
			</Typography>
		</Box>
	);
};

const Box2 = () => {
	return (
		<Box>
			<Typography color="#fff" fontSize="22px">
				It&apos;s about being better than
			</Typography>
			<Typography
				color="#fff"
				sx={{
					fontWeight: 700,
					lineHeight: "58px",
					fontSize: "58px",
				}}
			>
				you used to be
			</Typography>
		</Box>
	);
};

const Footer = () => {
	const theme = useTheme();
	const {
		appTitle1,
		signIn: { privacyStatement },
	} = uiStrings;

	return (
		<Box
			padding="60px"
			sx={{ backgroundColor: "#000" }}
			display="flex"
			alignItems="center"
			justifyContent="space-between"
		>
			<Box>
				<Box display="flex" alignItems="center" gap={2} marginBottom="10px">
					<Box
						component="img"
						sx={{
							height: "46px",
							width: "50px",
						}}
						alt={appTitle1}
						src={logoSample}
					/>
					<TLink to={appLinks.index}>
						<Stack display="flex" flexDirection="row">
							<Typography
								sx={{
									fontSize: "18px",
									fontWeight: 400,
									fontStyle: "normal",
									color: "#ED2F2F",
								}}
							>
								TIVRA
							</Typography>
							<Typography
								sx={{
									fontSize: "18px",
									fontWeight: 400,
									fontStyle: "normal",
									color: "#FFFFFF",
								}}
								marginLeft={0.5}
							>
								Health
							</Typography>
						</Stack>
					</TLink>
				</Box>
				<TLink
					color={theme.palette.text.secondary}
					to={appLinks.forgotPassword}
					fontSize="14px"
					fontWeight={500}
					marginLeft="10px"
				>
					{privacyStatement}
				</TLink>
			</Box>
			<Box>
				<Box marginBottom={2}>
					<Typography
						textAlign="right"
						color={theme.palette.text.secondary}
						sx={{
							fontSize: "18px",
							fontWeight: 400,
							fontStyle: "normal",
						}}
						marginLeft={0.5}
					>
						Follow Us On:
					</Typography>
					<Stack display="flex" flexDirection="row" gap={1} padding={2} justifyContent="right">
						<IconButton disableRipple size="large" sx={{ p: 0 }}>
							<LinkedInIcon fontSize="large" sx={{ color: "#0A66C2" }} />
						</IconButton>
						<IconButton disableRipple size="large" sx={{ p: 0 }}>
							<InstagramIcon fontSize="large" sx={{ color: "#E4405F" }} />
						</IconButton>
						<IconButton disableRipple size="large" sx={{ p: 0 }}>
							<TwitterIcon fontSize="large" sx={{ color: "#00acee" }} />
						</IconButton>
					</Stack>
				</Box>
				<Typography
					color={theme.palette.text.secondary}
					sx={{
						fontSize: "14px",
						fontWeight: 400,
						fontStyle: "normal",
					}}
				>
					&copy; 2023-2024 by TIVRA Health
				</Typography>
			</Box>
		</Box>
	);
};

const Box3 = () => {
	const theme = useTheme();
	const navigate = useNavigate();

	return (
		<Box
			sx={{
				backgroundColor: "#F5F5F5",
				background: "url(" + box3 + ") no-repeat",
				minHeight: "857px",
				position: "relative",
				backgroundPosition: "30% 72%",
			}}
		>	<Grid2 container>
				<Grid2 xl={6} md={6} position="relative" direction="column">
					<Box
						marginLeft="81px"
						marginTop="-45px"
						width="fit-content"
						paddingY="30px"
						paddingX="50px"
						position="relative"
						sx={{
							borderTopLeftRadius: "30px",
							borderTopRightRadius: "30px",
							borderBottomLeftRadius: "30px",
							backgroundColor: "#Fff",
							"&::after": {
								content: '""',
								position: "absolute",
								top: "165px",
								right: 0,
								width: 0,
								height: 0,
								borderTop: "solid 75px #fff",
								borderLeft: "solid 40px transparent",
								borderRight: "solid 0px transparent",
							},
						}}
					>
						<Typography color="#000" fontSize="32px" fontWeight={300} lineHeight={"38px"}>
							Start your journey with just
						</Typography>
						<Typography
							color={theme.palette.primary.main}
							sx={{
								fontWeight: 700,
								fontSize: "48px",
								lineHeight: "68px",
							}}
						>
							$9.99 per month
						</Typography>
					</Box>
				</Grid2>
				<Grid2 xl={6} md={6} direction="column">
					<Box
						sx={{
							marginTop: "90px", // Default marginTop value
							"@media (max-width: 768px)": {
								marginTop: "500px",
								left: "30px",
								paddingLeft: "100px", // Set the marginTop to 125px for screens with a maximum width of 768px or less
							},
						}}
					>
						<Typography
							color={theme.palette.primary.main}
							sx={{
								fontWeight: 700,
								fontSize: "58px",
								lineHeight: "58px",
							}}
						>
							Smart platform
						</Typography>
						<Typography
							color={theme.palette.primary.main}
							fontSize="44px"
							fontWeight={300}
							lineHeight={"58px"}
						>
							to track your fitness
						</Typography>
						<Typography marginTop={2} color="#000" fontSize="30px" fontWeight={500} whiteSpace="pre-wrap">
							Tailored subscriptions to your
						</Typography>
						<Typography
							color="#000"
							fontSize="30px"
							fontWeight={500}
							whiteSpace="pre-wrap"
							lineHeight="40px"
						>
							specific needs
						</Typography>
						<Button
							type="button"
							size="large"
							variant="contained"
							sx={{
								mt: 3,
								py: 1.5,
							}}
							onClick={() => {
								navigate(`${appLinks.signUp}/${appLinks.createAccount}`);
							}}
						>
							Start your journey
						</Button>
					</Box>
				</Grid2>
			</Grid2>
		</Box>
	);
};

const MobileBox = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	return (
		<Box
			sx={{

				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				minHeight: "340px",
				position: "relative",
				margin: "0 100px", // Center horizontally by setting left and right margin
				background: "url(" + down + ") no-repeat",
				backgroundPosition: "70% 50%",
			}}
		>
			<div className="ellipse-11"></div>
			<div className="ellipse-22"></div>
			<div className="ellipse-33"></div>
			<Grid2 container>
				<Grid2 xl={4} md={4} position="relative" direction="column">
					<Box
						marginLeft="-70px"
						marginTop="100px"
						width="fit-content"
						padding="10px"
						paddingX=""
						position="relative"
						sx={{
							borderTopLeftRadius: "25px",
							borderTopRightRadius: "25px",
							borderBottomLeftRadius: "25px",
							backgroundColor: "#Fff",
							"&::after": {
								content: '""',
								position: "absolute",
								top: "76px",
								right: 0,
								width: 0,
								height: 0,
								borderTop: "solid 40px #fff",
								borderLeft: "solid 20px transparent",
								borderRight: "solid 0px transparent",
							},
						}}
					>
						<Typography
							color="#000"
							fontSize="13px"
							marginRight={"9px"}
							fontWeight={500}
							lineHeight={"35px"}
							paddingLeft={"18px"}
						>
							Start your journey with just
						</Typography>
						<Typography
							color={theme.palette.primary.main}
							sx={{
								paddingLeft: "15px",
								fontWeight: "700",
								fontSize: "20px",
								lineHeight: "35px",
							}}
						>
							$9.99 per month
						</Typography>
					</Box>
				</Grid2>
				<Grid2 xl={6} md={6} direction="column">
					<Box marginTop="150px" marginLeft={"0px"}>
						<Typography
							sx={{
								marginLeft: "5px",
								fontWeight: "700",
								fontSize: "18.5px",
								lineHeight: "20px",
								color: "white",
							}}
						>
							Smart platform
						</Typography>
						<Typography
							marginLeft="5px"
							color="white"
							fontSize="15px"
							fontWeight={300}
							lineHeight={"30px"}
						>
							to track your fitness
						</Typography>
						<Typography
							marginLeft="5px"
							color="white"
							fontSize="10px"
							fontWeight={300}
							whiteSpace="pre-wrap"
							lineHeight="10px"
							marginTop="5px"
						>
							Tailored subscriptions<br></br> to your specific needs
						</Typography>
						<Button

							type="button"
							size="large"
							variant="contained"
							sx={{
								marginTop: "5px",
								mt: 3,
								py: 1.5,
							}}
							onClick={() => {
								navigate(`${appLinks.signUp}/${appLinks.createAccount}`);
							}}
						>
							Start your journey
						</Button>
					</Box>
				</Grid2>
			</Grid2>
		</Box>

	);
}


export const ForgotPassword = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<>
			{!isMobile && <Header />}
			<main>
				{/* Background Image box */}
				<Box
					minHeight={"100vh"}
					sx={{
						backgroundColor: "",
						padding: isMobile ? " " : "130px 0px 200px 0px",
						background: isMobile ? "url(" + full + ")" : "url(" + mainImage + ")",
						backgroundSize: "cover",
						width: "100%",
						minHeight: isMobile ? "100vh " : "70vh",
						position: "relative",
						"&::before": {
							content: '""',
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							background: isMobile
								? "linear-gradient(180deg, rgba(57, 16, 97, 0.9) 13.85%, rgba(234, 55, 107, 0.9))"
								: "linear-gradient(180deg, #000, rgba(0, 0, 0, 0) 36.46%, rgba(0, 0, 0, 0) 68.23%, #000)",
						},
					}}
				>
					{" "}
					{isMobile && <Mobile />}
					<Box
						sx={{
							position: "absolute",
							top: isMobile ? "50%" : " ", // Center vertically in the viewport
							transform: !isMobile ? "" : "translateY(-50%)",
							zIndex: 999,
							right: isMobile ? 0 : "60px",
							left: !isMobile ? "" : "10px",
							justifyContent: "center",
							alignItems: "center",
							display: "flex",
							flexDirection: "column",
							marginTop: isMobile ? "0px" : "-20px",
						}}
					>
						<Login />
						{isMobile && <MobileBox />}
					</Box>

					{/* central boxes */}
					{!isMobile && (
						<Box
							padding="25px"
							paddingLeft="100px"
							sx={{
								backgroundColor: isMobile ? " " : "rgba(0,0,0,0.3)",
								marginTop: "20px", // Default marginTop value
								"@media (max-width: 1288px)": {
									marginTop: "360px", // Set the marginTop to 125px for screens with a maximum width of 768px
								},
							}}
						>
							<Box display="flex" flexDirection="row" gap={2}>
								<Box width="fit-content">{!isMobile && <Box1 />}</Box>
								<Box width="fit-content" marginTop="70px" marginBottom="20px">
									{!isMobile && <Box2 />}
								</Box>
							</Box>
						</Box>
					)}
				</Box>
				{!isMobile && <Box3 />}
			</main>
			{!isMobile && (
				<footer>
					<Footer />
				</footer>
			)}
		</>
	);
};
