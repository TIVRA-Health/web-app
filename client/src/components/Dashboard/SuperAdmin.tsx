import { Box, Tab, Tabs, Typography, useMediaQuery, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import { useCreateOrganizationAPI } from "api/useOrganizationAPI";
import { SetStateAction, useState } from "react";

import { useOtpGenerationAPI, useRegisterTempAPI } from "api/signUpAccountAPI";
import 'react-phone-input-2/lib/style.css'; // Import the CSS styles
import PhoneInput from 'react-phone-input-2';
import "../../css/LoginStyle.css";

const Root = styled("div")({
	flexGrow: 1,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	textAlign: "center",
});

const TabContainer = styled("div")({
	maxWidth: "650px",
	display: "flex",
	justifyContent: "center",
});

const AccordionContainer = styled("div")({
	width: "100%",
});

const SectionContent = styled("div")({
	padding: "1px",
});
const Header = styled("h1")({
	margin: "0", // Remove margin for the header
});
const ProfileButton = styled(Button)(({ theme }) => ({
	width: "100%",
	height: "25px",
	backgroundColor: "transparent",
	color: "black",
	borderBottom: "2px solid transparent",
	"&:hover": {
		borderBottomColor: theme.palette.primary.dark, // Change the color on hover
	},
}));
const FormContainer = styled(Stack)(({ theme }) => ({
	width: "100%",
	maxWidth: 500,
	margin: "auto",
	padding: theme.spacing(1),
}));

const ButtonWrapper = styled("div")({
	marginLeft: "45%",
	marginTop: "25px", // Adjust the margin as needed
});
const styles = {
	formfield: {
		borderRadius: "8px", // Add a border radius of 8px
	},
};

const User = () => {
	// Initialize state to hold user data
	const [userData, setUserData] = useState({
		firstName: "",
		middleName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
	});

	// State variables for error messages
	const [firstNameError, setFirstNameError] = useState("");
	const [lastNameError, setLastNameError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [phoneNumberError, setPhoneNumberError] = useState("");
	// const [passwordError, setPasswordError] = useState("");

	const createUserMutation = useRegisterTempAPI();
	const generateOtp = useOtpGenerationAPI();

	// Function to handle input changes
	const handleInputChange = (event: any) => {
		console.log("Inside handle input change: ", event);
		const { name, value } = event.target;
		setUserData((prevUserData) => ({
			...prevUserData,
			[name]: value,
		}));
	};

	// Validation function for first name
	const validateFirstName = () => {
		const { firstName } = userData;
		if (firstName.trim() === "") {
			setFirstNameError("First Name is required");
		} else if (!/^[A-Za-z]+$/.test(firstName)) {
			setFirstNameError("First Name cannot contain numbers or special characters");
		} else {
			setFirstNameError("");
		}
	};

	// Validation function for last name
	const validateLastName = () => {
		const { lastName } = userData;
		if (lastName.trim() === "") {
			setLastNameError("First Name is required");
		} else if (!/^[A-Za-z]+$/.test(lastName)) {
			setLastNameError("Last Name cannot contain numbers or special characters");
		} else {
			setLastNameError("");
		}
	};

	// Validation function for email
	const validateEmail = () => {
		// You can use a regular expression or a library like validator.js for email validation
		if (!userData.email.trim()) {
			setEmailError("Email is required");
		} else if (!isValidEmail(userData.email)) {
			setEmailError("Invalid email format");
		} else {
			setEmailError("");
		}
	};

	// Validation function for phone number
	// const [phoneNumber, setPhoneNumber] = useState<string>("");
	const [isValid, setIsValid] = useState<boolean>(false);

	const handleCreateUser = () => {
		// Validate all fields before submission
		validateFirstName();
		validateLastName();
		validateEmail();

		if (firstNameError === "" && lastNameError === "" && emailError === "" && phoneNumberError === "") {
			const data = {
				firstName: userData.firstName,
				middleName: userData.middleName,
				lastName: userData.lastName,
				emailId: userData.email,
				phoneNumber: userData.phoneNumber,
			};

			createUserMutation(
				{ ...data },
				{
					onSuccess: (res) => {
						console.log("register temp resp data: ", res);

						setUserData({
							firstName: "",
							middleName: "",
							lastName: "",
							email: "",
							phoneNumber: "",
						});

						if (!res.isExistingUser && !res.registrationId) {
							generateOtp(
								{ emailId: userData.email },
								{
									onSuccess: (res) => {
										console.log("Otp sent: ", res);
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

	// Helper function to validate email format using regex
	const isValidEmail = (email: any) => {
		const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
		return emailRegex.test(email);
	};

	return (
		<div>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						label="First Name"
						name="firstName"
						value={userData.firstName}
						onChange={handleInputChange}
						onBlur={validateFirstName}
						required
						variant="outlined"
						error={!!firstNameError}
						helperText={firstNameError}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						label="Middle Name"
						name="middleName"
						value={userData.middleName}
						onChange={handleInputChange}
						variant="outlined"
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						label="Last Name"
						name="lastName"
						value={userData.lastName}
						onChange={handleInputChange}
						onBlur={validateLastName}
						required
						variant="outlined"
						error={!!lastNameError}
						helperText={lastNameError}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						label="Email"
						name="email"
						value={userData.email}
						onChange={handleInputChange}
						onBlur={validateEmail}
						required
						variant="outlined"
						error={!!emailError}
						helperText={emailError}
					/>
				</Grid>
				<Grid item xs={12}>
					{/* <TextField
						fullWidth
						label="Phone Number"
						name="phoneNumber"
						value={userData.phoneNumber}
						onChange={handleInputChange}
						onBlur={validatePhoneNumber}
						required
						variant="outlined"
						error={!!phoneNumberError}
						helperText={phoneNumberError}
					/> */}
					<PhoneInput
						country={'us'}
						value={userData.phoneNumber}
					
						inputProps={{
							name: 'phone',
							required: true,
							autoFocus: true
						}}

					/>

					{/* <PhoneInput
						country={"us"}
						value={userData.phoneNumber}
						onChange={handleInputChange}
						inputProps={{
							name: "phone",
							required: true,
							autoFocus: true,
						}}
					/> */}
				</Grid>
				{/* <Grid item xs={12}>
					<TextField
						fullWidth
						label="One Time Password"
						name="password"
						type="password"
						value={userData.password}
						onChange={handleInputChange}
						onBlur={validatePassword}
						required
						variant="outlined"
						error={!!passwordError}
						helperText={passwordError}
					/>
				</Grid> */}
				<Grid item xs={12} style={{ textAlign: "center", marginTop: "0px" }}>
					<Button variant="contained" color="primary" onClick={handleCreateUser}>
						Create User
					</Button>
				</Grid>
			</Grid>
		</div>
	);
};

interface OrganizationFormData {
	organizationName: "";
	npi: "";
	yearsOfCoaching: "";
	address1: "";
	address2: "";
	state: "";
	city: "";
	zipCode: "";
}

const Demo = () => {
	const [formData, setFormData] = useState<OrganizationFormData>({
		organizationName: "",
		npi: "",
		yearsOfCoaching: "",
		address1: "",
		address2: "",
		state: "",
		city: "",
		zipCode: "",
	});
	// const [formState, setFormState] = useState({
	// 	organizationName: null,
	// });
	// const [searchTerm, setSearchTerm] = useState("");

	// const orgNameSearchData = useGetOrganizationDataByNameAPI(searchTerm);
	// const onInputChange = (_event: SyntheticEvent, value: string, reason: AutocompleteInputChangeReason) => {
	// 	if (reason === "reset") {
	// 		setFormState((ps: any) => ({ ...ps, name: null }));
	// 		return;
	// 	} else if (_event.type === "change" || _event.type === "input") {
	// 		setSearchTerm(value);
	// 	}
	// };

	const handleInputChange = (event: any) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const createOrganizationMutation = useCreateOrganizationAPI();
	const handleSubmit = async (event: any) => {
		event.preventDefault();

		createOrganizationMutation(
			{ formData },
			{
				onSuccess: (res) => { },
				onError: (err) => {
					console.log(err);
				},
			}
		);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				{/* Render your form fields here */}
				{/* Example: */}
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<FormControl fullWidth variant="outlined">
							{/* <Autocomplete
								renderOption={(props, option) => {
									return (
										<li {...props} key={option}>
											{option} {option ?? ""}
										</li>
									);
								}}
								onChange={(_, newValue: any | null) => {
									setFormState((ps) => ({ ...ps, organizationName: newValue }));
								}}
								value={formState.organizationName}
								disablePortal
								options={
									orgNameSearchData?.data?.map((x: any) => ({ ...x, key: x.organizationName })) ?? []
								}
								onInputChange={onInputChange}
								renderInput={(params) => (
									<TextField
										required
										name="organizationName"
										label="Organization Name"
										variant="outlined"
										value={formData.organizationName}
										onChange={handleInputChange}
										{...params}
										size="small"
										sx={{
											"& .MuiInputBase-root": {
												height: "46px",
												width: "320px", // Default width for non-mobile
											},
											"@media (max-width: 600px)": {
												// Set styles for screens with a max width of 600px (adjust as needed)
												"& .MuiInputBase-root": {
													height: "46px", // Set height for mobile
													width: "170px", // Set width for mobile
												},
											},
										}}
										// placeholder="Organization Name"
										InputProps={{
											...params.InputProps,
											endAdornment: (
												<>
													{orgNameSearchData?.isLoading && (
														<CircularProgress color="inherit" size={20} />
													)}
													{params.InputProps.endAdornment}
												</>
											),
										}}
									/>
								)}
							/> */}
							<TextField
								required
								name="organizationName"
								label="Organization Name"
								variant="outlined"
								value={formData.organizationName}
								onChange={handleInputChange}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl fullWidth variant="outlined">
							<TextField
								className="formfield"
								required
								name="npi"
								value={formData.npi}
								onChange={handleInputChange}
								label="NPI Number"
								variant="outlined"
							/>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl fullWidth variant="outlined">
							<TextField
								className="formfield"
								required
								name="yearsOfCoaching"
								label="Years of Coaching"
								value={formData.yearsOfCoaching}
								onChange={handleInputChange}
								variant="outlined"
							/>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl fullWidth variant="outlined">
							<TextField
								className="formfield"
								required
								value={formData.address1}
								onChange={handleInputChange}
								name="address1"
								label="Address 1"
								variant="outlined"
							/>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl fullWidth variant="outlined">
							<TextField
								className="formfield"
								value={formData.address2}
								onChange={handleInputChange}
								name="address2"
								label="Address 2"
								variant="outlined"
							/>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl fullWidth variant="outlined">
							<TextField
								className="formfield"
								required
								value={formData.state}
								onChange={handleInputChange}
								name="state"
								label="State"
								variant="outlined"
							/>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl fullWidth variant="outlined">
							<TextField
								className="formfield"
								required
								value={formData.city}
								onChange={handleInputChange}
								name="city"
								label="City"
								variant="outlined"
							/>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl fullWidth variant="outlined">
							<TextField
								className="formfield"
								required
								value={formData.zipCode}
								onChange={handleInputChange}
								name="zipCode"
								label="Zip Code"
								variant="outlined"
							/>
						</FormControl>
					</Grid>
				</Grid>
				<div style={{ textAlign: "center", marginTop: "20px" }}>
					<Button variant="contained" color="primary" type="submit">
						Submit
					</Button>
				</div>
			</form>
		</div>
	);
};

export default Demo;
export const SuperAdmin = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const [value, setValue] = useState(0);

	const handleTabChange = (_event: any, newValue: SetStateAction<number>) => {
		setValue(newValue);
	};

	const sections = ["Organization", "Super-User"];

	return (
		<div>
			<Tabs value={value} onChange={handleTabChange} indicatorColor="primary" textColor="primary" centered>
				{sections.map((section, index) => (
					<Tab key={index} label={section} />
				))}
			</Tabs>

			{sections.map((section, index) => (
				<TabPanel key={index} value={value} index={index}>
					{section === "Super-User" && <User />}
					{section === "Organization" && <Demo />}
				</TabPanel>
			))}
		</div>
	);
};

function TabPanel(props: { children: any; value: any; index: any }) {
	const { children, value, index } = props;

	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`}>
			{value === index && (
				<Box p={3} maxWidth={"600px"} >
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}
