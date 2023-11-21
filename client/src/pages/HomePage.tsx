import { CheckBoxOutlineBlankOutlined, Lock, Person2 } from "@mui/icons-material";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
	AppBar,
	Button,
	Checkbox,
	FormControlLabel,
	IconButton,
	Stack,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { usePaymentPlanRoleAPI } from "api/accountCreateAPI";
import { useGetIconAPI, useUserRolesGetAPI } from "api/useInMemoryAPI";
import { useLoginAPI, useUserInfoGetAPI } from "api/useLoginAPI";
import { RHFTextField, TLink } from "components/shared";
import { useLocalStorage } from "hooks/useLocalStorage";
import { STORAGE_USER_INFO_KEY, appLinks, dashboardLinks } from "main";
import { EmailRegExp } from "main/constants";
import { uiStrings } from "main/uiStrings";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import full from "../assets/images/Rectangle73.png";
import box3 from "../assets/images/box3.png";
import down from "../assets/images/down.png";
import logoSample from "../assets/images/logo.svg";
import mainImage from "../assets/images/main_1.svg";
import "../css/Homepage.css";
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
		</Toolbar>
	);
};

const Login = () => {
	const { handleSubmit, control, register } = useForm({
		defaultValues,
		mode: "onChange",
	});
	const {
		signIn: { username, password, loginButtonText, rememberMe, forgotPassword, doNotHaveAccount, signUp, login },
		validation: { emailFormat, required },
	} = uiStrings;
	const navigate = useNavigate();
	const [loginSuccess, setLoginSuccess] = useState(false);
	const [, setUser] = useLocalStorage(STORAGE_USER_INFO_KEY, null);

	const onLogin = () => {
		setLoginSuccess(true);
	};

	const signInMutation = useLoginAPI(onLogin);
	let paymentRoles: any = usePaymentPlanRoleAPI(loginSuccess);

	const [userInfo, setUserInfo] = useState<any>({});
	const userInfoGetAPI: any = useUserInfoGetAPI();

	const onSubmit = async (data: any) => {
		signInMutation.mutate(
			{ ...data },
			{
				onSuccess: async (resp) => {
					console.log(resp);
					userInfoGetAPI("", {
						onSuccess: (res: any) => {
							// console.log(res);
							setUser(res);
							navigate(`${appLinks.dashboard}/${dashboardLinks.overview}`);
						},
						onError: (err: any) => {
							console.log(err);
						},
					});
				},
				onError: (err) => {
					console.log(err);
				},
			}
		);
	};

	// useEffect(() => {
	// 	if (paymentRoles?.data && userInfo?.data) {
	// 		const profiles = paymentRoles?.data;
	// 		const userData = userInfo?.data;
	// 		setUser({ ...userData });

	// 		const displayCorporate = profiles.find((pro: { id: any }) => pro.id === userData?.paymentPlanRole?.roleId);
	// 		if (userData.registrationId === 1) {
	// 			navigate(`${appLinks.signUp}/${appLinks.paymentDetails}`);
	// 		} else if (
	// 			(userData.registrationId === 2 ||
	// 				userData.registrationId === 3 ||
	// 				userData.registrationId === 4 ||
	// 				userData.registrationId === 5) &&
	// 			displayCorporate.corporateAffiliation
	// 		) {
	// 			navigate(`${appLinks.signUp}/${appLinks.createProfile}/true`);
	// 		} else if (
	// 			(userData.registrationId === 2 ||
	// 				userData.registrationId === 3 ||
	// 				userData.registrationId === 4 ||
	// 				userData.registrationId === 5) &&
	// 			!displayCorporate.corporateAffiliation
	// 		) {
	// 			navigate(`${appLinks.signUp}/${appLinks.createProfile}/false`);
	// 		} else {
	// 			navigate(`${appLinks.dashboard}/${dashboardLinks.overview}`);
	// 		}
	// 	}
	// }, [paymentRoles?.data, userInfo?.data, loginSuccess]);

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	return (
		<>
			<Box
				sx={{
					backgroundColor: isMobile ? " " : "#ffffff",
					borderRadius: "8px",
					padding: "24px",
				}}
			>
				<Stack gap={1.7} paddingBottom={0} justifyItems="center" alignItems="center">
					<Typography
						sx={{
							color: "#000000",
							fontWeight: 400,
							lineHeight: "29px",
							fontSize: "24px",
							marginBottom: "15px",
						}}
					>
						{!isMobile && login}
					</Typography>
					<RHFTextField
						name="username"
						placeholder={username}
						control={control}
						pattern={{
							value: EmailRegExp,
							message: emailFormat,
						}}
						required={{
							value: true,
							message: required,
						}}
						size="small"
						startAdornment={<Person2 fontSize="small" />}
						sx={{ width: "320px", height: "46px" }}
						inputProps={{ style: { padding: "12px" } }}
					/>
					<RHFTextField
						size="small"
						name="password"
						type="password"
						control={control}
						required={{
							value: true,
							message: required,
						}}
						placeholder={password}
						startAdornment={<Lock fontSize="small" />}
						sx={{ width: "320px", height: "46px" }}
						inputProps={{ style: { padding: "12px" } }}
					/>
					<Button
						disabled={signInMutation.isLoading}
						fullWidth
						type="button"
						variant="contained"
						sx={{
							mt: 3,
							py: 1.5,
						}}
						onClick={handleSubmit(onSubmit)}
					>
						{loginButtonText}
					</Button>
					<Stack width="100%" flexDirection="row" justifyContent="space-between" alignItems="center">
						<FormControlLabel
							control={
								<Checkbox
									// control={control}
									icon={<CheckBoxOutlineBlankOutlined sx={{ strokeWidth: 0 }} />}
									checkedIcon={<CheckBoxOutlinedIcon />}
									size="small"
									sx={{
										color: "#898989",
										strokeWidth: 1,
										"&.Mui-checked": {
											color: "#898989",
										},
									}}
									{...register("persistUser")}
								/>
							}
							label={
								<Box fontWeight={500} lineHeight="15px" color="#000000" component="div" fontSize="14px">
									{rememberMe}
								</Box>
							}
						/>
						<TLink
							color="#000000"
							to={appLinks.forgotPassword}
							fontSize="14px"
							fontWeight={500}
							sx={{
								borderBottom: "1px solid",
							}}
						>
							{forgotPassword}
						</TLink>
					</Stack>
				</Stack>
			</Box>
			<Stack direction="row" padding={2} alignItems="center" justifyContent={"center"}>
				<Box fontSize={13}>{doNotHaveAccount}</Box>
				<Button
					type="button"
					size="small"
					sx={(theme) => ({
						color: theme.palette.secondary.main,
						backgroundColor: theme.palette.background.default,
						"&:hover": {
							backgroundColor: theme.palette.background.default,
						},
						"&:focus": {
							backgroundColor: theme.palette.background.default,
						},
						"&:active": {
							backgroundColor: theme.palette.background.default,
						},
						marginLeft: 1,
						padding: 1,
					})}
					variant="contained"
					onClick={() => {
						navigate(`${appLinks.signUp}/${appLinks.createAccount}`, {});
					}}
				>
					{signUp}
				</Button>
			</Stack>
		</>
	);
};

const MLogin = () => {
	const { handleSubmit, control, register } = useForm({
		defaultValues,
		mode: "onChange",
	});
	const {
		signIn: { username, password, loginButtonText, rememberMe, forgotPassword, doNotHaveAccount, signUp, login },
		validation: { emailFormat, required },
	} = uiStrings;
	const navigate = useNavigate();
	const [loginSuccess, setLoginSuccess] = useState(false);
	const [, setUser] = useLocalStorage(STORAGE_USER_INFO_KEY, null);

	const onLogin = () => {
		setLoginSuccess(true);
	};

	const signInMutation = useLoginAPI(onLogin);
	const [userInfo, setUserInfo] = useState<any>({});
	const userInfoGetAPI: any = useUserInfoGetAPI();

	const paymentRoles: any = usePaymentPlanRoleAPI(loginSuccess);

	const onSubmit = async (data: any) => {
		signInMutation.mutate(
			{ ...data },
			{
				onSuccess: async (resp) => {
					console.log(resp);
					userInfoGetAPI("", {
						onSuccess: (res: any) => {
							userInfoGetAPI("", {
								onSuccess: (res: any) => {
									setUser(res);
									navigate(`${appLinks.dashboard}/${dashboardLinks.overview}`);
								},
								onError: (err: any) => {
									console.log(err);
								},
							});
							setUser(res);
							navigate(`${appLinks.dashboard}/${dashboardLinks.overview}`);
						},
						onError: (err: any) => {
							console.log(err);
						},
					});
				},
				onError: (err) => {
					console.log(err);
				},
			}
		);
	};

	// useEffect(() => {
	// 	if (paymentRoles?.data && userInfo?.data) {
	// 		const profiles = paymentRoles?.data;
	// 		const userData = userInfo?.data;
	// 		setUser({ ...userData });
	// 		const displayCorporate = profiles.find((pro: { id: any }) => pro.id === userData.roleId);
	// 		if (userData.registrationId === 1) {
	// 			navigate(`${appLinks.signUp}/${appLinks.paymentDetails}`);
	// 		} else if (
	// 			(userData.registrationId === 2 ||
	// 				userData.registrationId === 3 ||
	// 				userData.registrationId === 4 ||
	// 				userData.registrationId === 5) &&
	// 			displayCorporate.corporateAffiliation
	// 		) {
	// 			navigate(`${appLinks.signUp}/${appLinks.createProfile}/true`);
	// 		} else if (
	// 			(userData.registrationId === 2 ||
	// 				userData.registrationId === 3 ||
	// 				userData.registrationId === 4 ||
	// 				userData.registrationId === 5) &&
	// 			!displayCorporate.corporateAffiliation
	// 		) {
	// 			navigate(`${appLinks.signUp}/${appLinks.createProfile}/false`);
	// 		} else {
	// 			navigate(`${appLinks.dashboard}/${dashboardLinks.overview}`);
	// 		}
	// 	}
	// }, [paymentRoles?.data, userInfo?.data, loginSuccess]);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	return (
		<>
			<Box
				sx={{
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: isMobile ? " " : "#ffffff",
					borderRadius: "8px",
					padding: "24px",
				}}
			>
				<Stack gap={1.7} paddingBottom={0} justifyItems="center" alignItems="center">
					<Typography
						sx={{
							color: "#000000",
							fontWeight: 400,
							lineHeight: "29px",
							fontSize: "24px",
							marginBottom: "15px",
						}}
					>
						{!isMobile && login}
					</Typography>
					<RHFTextField
						name="username"
						placeholder={username}
						control={control}
						pattern={{
							value: EmailRegExp,
							message: emailFormat,
						}}
						required={{
							value: true,
							message: required,
						}}
						size="small"
						startAdornment={<Person2 fontSize="small" />}
						sx={{ width: "320px", height: "46px" }}
						inputProps={{ style: { padding: "12px" } }}
					/>
					<RHFTextField
						size="small"
						name="password"
						type="password"
						control={control}
						required={{
							value: true,
							message: required,
						}}
						placeholder={password}
						startAdornment={<Lock fontSize="small" />}
						sx={{ width: "320px", height: "46px" }}
						inputProps={{ style: { padding: "12px" } }}
					/>
					<Stack flexDirection="row" justifyContent="space-between" alignItems="center" gap={8}>
						<FormControlLabel
							control={
								<Checkbox
									// control={control}
									icon={<CheckBoxOutlineBlankOutlined sx={{ strokeWidth: 0 }} />}
									checkedIcon={<CheckBoxOutlinedIcon />}
									size="small"
									sx={{
										color: "white",
										strokeWidth: 1,
										"&.Mui-checked": {
											color: "white",
										},
									}}
									{...register("persistUser")}
								/>
							}
							label={
								<Box fontWeight={500} lineHeight="15px" color="white" component="div" fontSize="14px">
									{rememberMe}
								</Box>
							}
						/>
						<TLink
							color="#ffff"
							to={appLinks.forgotPassword}
							fontSize="14px"
							fontWeight={500}
							sx={{
								borderBottom: "0px solid",
							}}
						>
							{forgotPassword}
						</TLink>
					</Stack>
					<Button
						disabled={signInMutation.isLoading}
						type="button"
						variant="contained"
						sx={{
							width: "325px",
							mt: 3,
							py: 1.5,
						}}
						onClick={handleSubmit(onSubmit)}
					>
						{loginButtonText}
					</Button>
				</Stack>
			</Box>
			<Stack direction="row" padding={2} alignItems="center" justifyContent={"center"} marginTop={-2}>
				<Box fontSize={13}>{doNotHaveAccount}</Box>
				<Button
					type="button"
					size="small"
					sx={(theme) => ({
						color: theme.palette.secondary.main,
						backgroundColor: theme.palette.background.default,
						"&:hover": {
							backgroundColor: theme.palette.background.default,
						},
						"&:focus": {
							backgroundColor: theme.palette.background.default,
						},
						"&:active": {
							backgroundColor: theme.palette.background.default,
						},
						marginLeft: 1,
						padding: 1,
					})}
					variant="contained"
					onClick={() => {
						navigate(`${appLinks.signUp}/${appLinks.createAccount}`, {});
					}}
				>
					{signUp}
				</Button>
			</Stack>
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
					fontSize: "48px",
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
				</Box>
				<TLink
					color={theme.palette.text.secondary}
					to={appLinks.privacyPolicy}
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
		>
			<Grid2 container>
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
				backgroundPosition: "63% 38%",
			}}
		>
			<div className="ellipse-1"></div>
			<div className="ellipse-2"></div>
			<div className="ellipse-3"></div>
			<Grid2 container>
				<Grid2 xl={4} md={4} position="relative" direction="column">
					<Box
						marginLeft="-70px"
						marginTop="0px"
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
						<Typography marginLeft="5px" color="white" fontSize="15px" fontWeight={300} lineHeight={"30px"}>
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
};

export const Home = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	//load all the icons
	useGetIconAPI();
	//load all user role
	useUserRolesGetAPI();

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
					{/* Login Box */}
					<Box
						sx={{
							position: "absolute",
							// top: isMobile ? "90px " : "90px",
							// right: isMobile ? " " : "60px",
							// left: !isMobile ? " " : " 10px",
							zIndex: 999,
							top: "90px",
							right: isMobile ? 0 : "60px",
							left: !isMobile ? " " : " 10px",
							justifyContent: "center",
							alignItems: "center",

							// '@media (max-width: 768px)': {
							// 	right: !isMobile ? " " : '200px',
							// },
						}}
					>
						{!isMobile && <Login />}
						{isMobile && <MLogin />}
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
