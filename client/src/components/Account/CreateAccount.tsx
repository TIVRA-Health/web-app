import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Avatar, Button, IconButton, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useOtpGenerationAPI, useOtpValidationAPI, useRegisterAPI, useRegisterTempAPI } from "api/signUpAccountAPI";
import { FilledTextField } from "components/shared";
import { useLocalStorage } from "hooks/useLocalStorage";
import {
	PhoneNumber,
	default as formatPhoneNumberIntl,
	default as parsePhoneNumberFromString,
} from "libphonenumber-js";
import {
	EmailRegExp,
	PasswordRegExp,
	STORAGE_USER_PROFILE_IMAGE_TEMP_KEY,
	STORAGE_USER_TOKEN_KEY,
	appLinks,
	dashboardLinks,
	isNumber,
	uiStrings,
} from "main";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import 'react-phone-input-2/lib/style.css'; // Import the CSS styles
import PhoneInput from 'react-phone-input-2';
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../css/LoginStyle.css";

interface registerTempState {
	firstName: string;
	middleName: string;
	lastName: string;
	emailId: string;
	phoneNumber: string;
	password: string;
}

const defaultValues: registerTempState = {
	firstName: "",
	middleName: "",
	lastName: "",
	emailId: "",
	phoneNumber: "",
	password: "",
};

let tempId = "";



export const CreateAccount: React.FC = () => {
	const { handleSubmit, control, getValues, setValue } = useForm({
		defaultValues,
		mode: "onChange",
	});
	const theme = useTheme();
	const [s, ts] = useState(0);
	const [of, tof] = useState(false);
	const navigate = useNavigate();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const isTablet = useMediaQuery(theme.breakpoints.down("md"));
	const {
		signUp: {
			step1,
			createYourAccount,
			otpEmailMessage,
			verify,
			createAccount,
			continueText,
			confirmPassword,
			emailId,
			otp,
			verified,
			failed,
			firstName,
			lastName,
			middleName,
			password,
			phoneNumber,
			changeEmail,
		},
		validation: { emailFormat, passwordValidation, passwordMatch },
	} = uiStrings;

	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const email = searchParams.get("id") || "";

	if (email !== "") {
	}

	const emailFieldRef = useRef<HTMLInputElement>(null);
	const registerTempMutation = useRegisterTempAPI();
	const registerMutation = useRegisterAPI();
	const generateOtp = useOtpGenerationAPI();
	const validateOtp = useOtpValidationAPI();

	const buttonText = s === 0 ? continueText : s === 1 ? createAccount : "";

	const [profileImage, setProfileImage] = useState("");

	const [, setUserImageTemp] = useLocalStorage(STORAGE_USER_PROFILE_IMAGE_TEMP_KEY, null);

	const [isValid, setIsValid] = useState<boolean>(false);

	//   const handlePhoneChange = (value: string, country: string) => {
	//     setPhoneNumber(value);
	//     // Use the validation function to check if the phone number is valid
	//     setIsValid(isValidPhoneNumber(value, country));
	//   };

	const handleImageUpload = (e: any) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();

			reader.onload = (event: any) => {
				const imageDataUrl = event.target.result;
				setProfileImage(imageDataUrl);
				setUserImageTemp(imageDataUrl);
			};

			reader.readAsDataURL(file);
		}
	};


	const handlePhoneChange = (value: string, country: string) => {
		// Update the phoneNumber field in your form values
		setValue('phoneNumber', value);
	};
	const onClick = async (data: any) => {
		const emailId = data.emailId;

		if (s === 0) {
			registerTempMutation(
				{ ...data },
				{
					onSuccess: (res) => {
						// console.log("register temp resp data: ", res);

						if (res) {
							tempId = res.userId;
							ts(1);

							if (res.isExistingUser && res.registrationId) {
								if (res.registrationId === 1) {
									navigate(`${appLinks.signUp}/${appLinks.paymentDetails}`);
								} else if (
									(res.registrationId === 2 ||
										res.registrationId === 3 ||
										res.registrationId === 4 ||
										res.registrationId === 5) &&
									res.corporateAffiliation
								) {
									navigate(`${appLinks.signUp}/${appLinks.createProfile}/true`);
								} else if (
									(res.registrationId === 2 ||
										res.registrationId === 3 ||
										res.registrationId === 4 ||
										res.registrationId === 5) &&
									!res.corporateAffiliation
								) {
									navigate(`${appLinks.signUp}/${appLinks.createProfile}/false`);
								} else if (res.registrationId === 6) {
									navigate(`${appLinks.signUp}/${appLinks.deviceRegistration}`);
								} else {
									navigate(`${appLinks.dashboard}/${dashboardLinks.overview}`);
								}
							} else {
								generateOtp(
									{ emailId },
									{
										onSuccess: (res) => {
											// console.log("Otp sent: ", res);
											toast.success("Otp generated successfully");
										},
										onError: (err) => {
											console.log(err);
										},
									}
								);
							}
						}
					},
					onError: (err) => {
						console.log(err);
					},
				}
			);
		} else if (s === 1) {
			const input = {
				tempId: tempId,
				otp: data.otp,
				password: data.password,
			};
			const otpData = {
				emailId: emailId,
				otp: data.otp,
			};
			validateOtp(
				{ ...otpData },
				{
					onSuccess: (res) => {
						// console.log("validate user: ", res);

						if (res.status === "success") {
							registerMutation(
								{ ...input },
								{
									onSuccess: (res) => {
										const token = window.localStorage.getItem(STORAGE_USER_TOKEN_KEY);
										if (res && res.valid && token) {
											navigate(`${appLinks.signUp}/${appLinks.paymentDetails}`, {
												replace: true,
											});
										}
									},
									onError: (err) => {
										console.log(err);
									},
								}
							);
						}
					},
					onError: (err) => {
						console.log(err);
					},
				}
			);
		}
	};

	if (!isMobile) {
		return (
			<Stack
				color="text.primary"
				width={{ xs: 360, sm: 480, md: 680, lg: 680, xl: 680 }}
				paddingY={3}
				paddingX={5}
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Grid2 container>
					<Grid2 md={12} marginBottom={3}>
						<Typography variant="h4" fontWeight={600} textAlign="center">
							{!isMobile && step1}
						</Typography>
						<Typography variant="h5" textAlign="center">
							{createYourAccount}
						</Typography>
						<Stack direction="row" alignItems="center" justifyContent="center">
							<Typography fontSize="16px" fontWeight={400} lineHeight="19px" color="#3A3A3A">
								Already have an account?{" "}
							</Typography>
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
								Sign In
							</Button>
						</Stack>
					</Grid2>
					<Grid2 xs={12} marginBottom={0}>
						<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
							<Avatar
								alt="Profile Image"
								src={profileImage}
								sx={{
									width: isTablet ? 80 : 105,
									height: isTablet ? 80 : 105,
									border: "5px solid primary.main",
								}}
							/>
							<div>
								<input
									accept="image/*"
									style={{ display: "none" }}
									id="profile-image-upload"
									type="file"
									onChange={handleImageUpload}
								/>
								<label htmlFor="profile-image-upload">
									<IconButton
										color="secondary"
										aria-label="upload picture"
										component="span"
										sx={{ marginTop: "-30px", marginLeft: "0" }}
									>
										<AddPhotoAlternateIcon />
									</IconButton>
								</label>
							</div>
						</div>
					</Grid2>
					<Grid2 container>
						<Grid2 xs={6} sm={6} md={6} sx={{ paddingRight: "6px" }}>
							<FilledTextField
								name="firstName"
								label={firstName}
								control={control}
								validate={{
									matchPattern: (v) =>
										/^[A-Za-z]+$/.test(v) ||
										"First Name cannot contain numbers or special characters",
								}}
								required={{
									value: true,
									message: "First name is required",
								}}
							/>
						</Grid2>
						<Grid2 xs={6} sm={6} md={6} sx={{ paddingLeft: "6px" }}>
							<FilledTextField name="middleName" label={middleName} control={control} />
						</Grid2>
						<Grid2 xs={12} sx={{ paddingTop: "12px" }}>
							<FilledTextField
								name="lastName"
								label={lastName}
								control={control}
								validate={{
									matchPattern: (v) =>
										/^[A-Za-z]+$/.test(v) ||
										"Last Name cannot contain numbers or special characters",
								}}
								required={{
									value: true,
									message: "Last name is required",
								}}
							/>
						</Grid2>
						<Grid2 xs={12} sx={{ paddingTop: "12px" }}>

							<FilledTextField
								inputRef={emailFieldRef}
								name="emailId"
								label={emailId}
								control={control}
								required={{
									value: true,
									message: "Email-Id is required",
								}}
								pattern={{
									value: EmailRegExp,
									message: emailFormat,
								}}
							/>
						</Grid2>
						<Grid2 xs={12} sx={{ paddingTop: "12px" }}>
							<PhoneInput
								country={'us'}
								value={phoneNumber}

								inputProps={{
									name: 'phoneNumber',
									required: true,
									autoFocus: true
								}}
								onChange={handlePhoneChange}
							/>


						</Grid2>
					</Grid2>
					{s === 1 && (
						<>
							<Grid2 xs={12}>
								<Typography variant="body2" fontWeight={600} color="text.primary" marginTop={1}>
									{otpEmailMessage}
								</Typography>
							</Grid2>
							<Grid2 xs={12} textAlign="right">
								<Button
									type="button"
									variant="text"
									disableRipple
									onClick={() => {
										emailFieldRef.current?.focus();
										ts(0);
									}}
									sx={{
										backgroundColor: "transparent",
										color: theme.palette.secondary.main,
										p: 0,
										"&:hover": {
											backgroundColor: "transparent",
										},
									}}
								>
									{changeEmail}
								</Button>
							</Grid2>

							<Grid2 xs={12}>
								<FilledTextField
									control={control}
									name="otp"
									label={otp}
									InputProps={{
										// endAdornment: s === 2 && (
										endAdornment: 2 === 2 && (
											<Typography
												variant="button"
												fontWeight={600}
												color={of ? theme.palette.success.main : theme.palette.error.main}
											>
												{/* {of ? verified : failed} */}
											</Typography>
										),
									}}
									required={{
										value: true,
										message:
											"Please enter a valid passcode sent to your registered email or phone number",
									}}
								// onKeyPress={isNumber}
								/>
							</Grid2>
							{s === 1 && (
								<>
									<Grid2 xs={12} sx={{ paddingTop: "12px" }}>
										<FilledTextField
											type="password"
											name="password"
											label={password}
											control={control}
											required={{
												value: true,
												message: "password is required",
											}}
											validate={{
												matchPattern: (v) => PasswordRegExp.test(v) || passwordValidation,
											}}
										/>
									</Grid2>
									<Grid2 xs={12} sx={{ paddingTop: "12px" }}>
										<FilledTextField
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
							)}
						</>
					)}
					<Grid2 xs={12} mt={2} mb={2}>
						<Button
							fullWidth
							type="button"
							variant="contained"
							sx={{
								p: 1,
								borderRadius: 2,
								backgroundColor: "#ea376b",
							}}
							onClick={handleSubmit(onClick)}
						>
							{buttonText}
						</Button>
					</Grid2>
				</Grid2>
			</Stack>
		);
	}
	return (
		<Stack
			color="text.primary"
			// width={{ xs: 360, sm: 360, md: 480, lg: 480, xl: 480 }}

			paddingY={3}
			paddingX={5}
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Grid2 container>
				<Grid2 xs={12} marginBottom={3}>
					<Typography variant="h4" fontWeight={600} textAlign="center">
						{!isMobile && step1}
					</Typography>
					<Typography variant="h5" textAlign="center">
						{createYourAccount}
					</Typography>
				</Grid2>
				<Grid2 xs={12}>
					<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
						<Avatar
							alt="Profile Image"
							src={profileImage}
							sx={{ width: 70, height: 70, marginBottom: 0.5, border: "5px solid primary.main" }}
						/>
						<div>
							<input
								accept="image/*"
								style={{ display: "none" }}
								id="profile-image-upload"
								type="file"
								onChange={handleImageUpload}
							/>
							<label htmlFor="profile-image-upload">
								<IconButton
									color="secondary"
									aria-label="upload picture"
									component="span"
									sx={{ marginTop: "-35px", marginLeft: "" }}
								>
									<AddPhotoAlternateIcon />
								</IconButton>
							</label>
						</div>
					</div>
				</Grid2>
				<Grid2 container>
					<Grid2 xs={6} sm={6} md={6} sx={{ paddingRight: "6px" }}>
						<FilledTextField
							name="firstName"
							label={firstName}
							control={control}
							validate={{
								matchPattern: (v) =>
									/^[A-Za-z]+$/.test(v) || "First Name cannot contain numbers or special characters",
							}}
							required={{
								value: true,
								message: "First name is required",
							}}
						/>
					</Grid2>
					<Grid2 xs={6} sm={6} md={6} sx={{ paddingLeft: "6px" }}>
						<FilledTextField name="middleName" label={middleName} control={control} />
					</Grid2>
					<Grid2 xs={12} sx={{ paddingTop: "12px" }}>
						<FilledTextField
							name="lastName"
							label={lastName}
							control={control}
							validate={{
								matchPattern: (v) =>
									/^[A-Za-z]+$/.test(v) || "Last Name cannot contain numbers or special characters",
							}}
							required={{
								value: true,
								message: "Last name is required",
							}}
						/>
					</Grid2>
					<Grid2 xs={12} sx={{ paddingTop: "12px" }}>
						<FilledTextField
							inputRef={emailFieldRef}
							name="emailId"
							label={emailId}
							control={control}
							required={{
								value: true,
								message: "Email-Id is required",
							}}
							pattern={{
								value: EmailRegExp,
								message: emailFormat,
							}}
						/>
					</Grid2>
					<Grid2 xs={12} sx={{ paddingTop: "12px" }}>
						<PhoneInput
							country={'us'}
							value={phoneNumber}
							inputProps={{
								name: 'phoneNumber',
								required: true,
								autoFocus: true
							}}
							onChange={handlePhoneChange}

						/>
					</Grid2>
				</Grid2>
				{s === 1 && (
					<>
						<Grid2 xs={12}>
							<Typography variant="body2" fontWeight={600} color="text.primary" marginTop={1}>
								{otpEmailMessage}
							</Typography>
						</Grid2>
						<Grid2 xs={12} textAlign="right">
							<Button
								type="button"
								variant="text"
								disableRipple
								onClick={() => {
									emailFieldRef.current?.focus();
									ts(0);
								}}
								sx={{
									backgroundColor: "transparent",
									color: theme.palette.secondary.main,
									p: 0,
									"&:hover": {
										backgroundColor: "transparent",
									},
								}}
							>
								{changeEmail}
							</Button>
						</Grid2>

						<Grid2 xs={12}>
							<FilledTextField
								control={control}
								name="otp"
								label={otp}
								InputProps={{
									// endAdornment: s === 2 && (
									endAdornment: 2 === 2 && (
										<Typography
											variant="button"
											fontWeight={600}
											color={of ? theme.palette.success.main : theme.palette.error.main}
										>
											{/* {of ? verified : failed} */}
										</Typography>
									),
								}}
								required={{
									value: true,
									message:
										"Please enter a valid passcode sent to your registered email or phone number",
								}}
								onKeyPress={isNumber}
							/>
						</Grid2>
						{s === 1 && (
							<>
								<Grid2 xs={12} sx={{ paddingTop: "12px" }}>
									<FilledTextField
										type="password"
										name="password"
										label={password}
										control={control}
										required={{
											value: true,
											message: "password is required",
										}}
										validate={{
											matchPattern: (v) => PasswordRegExp.test(v) || passwordValidation,
										}}
									/>
								</Grid2>
								<Grid2 xs={12} sx={{ paddingTop: "12px" }}>
									<FilledTextField
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
						)}
					</>
				)}
				<Grid2 xs={12} mt={2} mb={2}>
					<Button
						fullWidth
						type="button"
						variant="contained"
						sx={{
							p: 1,
							borderRadius: 2,
							backgroundColor: "#ea376b",
						}}
						onClick={handleSubmit(onClick)}
					>
						{buttonText}
					</Button>
				</Grid2>
				<Stack direction="row" alignItems="center" justifyContent="center">
					<Typography fontSize="16px" fontWeight={400} lineHeight="19px" color="#3A3A3A">
						Already have an account?{" "}
					</Typography>
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
						Sign In
					</Button>
				</Stack>
			</Grid2>
		</Stack>
	);
};
