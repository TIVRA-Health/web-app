import EditIcon from "@mui/icons-material/Edit";
import {

	Avatar,
	IconButton,
	Paper,
	Tab,
	Tabs,
	Typography,
	useMediaQuery,
	useTheme
} from "@mui/material";
import 'react-phone-input-2/lib/style.css'; // Import the CSS styles
import PhoneInput, { CountryData } from 'react-phone-input-2';
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import { useUserInfoGetAPI } from "api/useLoginAPI";
import { useEditProfileTempAPI } from "api/userProfile";

import { toast } from "react-toastify";
import "../../css/LoginStyle.css";

import Grid2 from "@mui/material/Unstable_Grid2";
import { FilledSelect } from "components/shared/FilledSelect";
import { appLinks, ParamsProfileType, STORAGE_USER_INFO_KEY, uiStrings } from "main";
import { useEffect, useState } from "react";
import { unstable_HistoryRouter, useNavigate, useParams } from "react-router-dom";
import { usePaymentPlanLinkAPI, usePaymentPlanRoleAPI, usePutPaymentPlanRoleAPI } from "api/accountCreateAPI";
import { useForm } from "react-hook-form";
import { Outlet } from "react-router-dom";
import { useCreateOrganizationAPI } from "api/useOrganizationAPI";
const Root = styled("div")({
	flexGrow: 1,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",

});

const TabContainer = styled("div")({
	width: "100%",
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
	marginTop: "5px", // Adjust the margin as needed
});

const genderOptions = ["male", "female", "other"];
const educationLevels = [
	"No formal education",
	"Primary education",
	"Secondary education or high school",
	"GED",
	"Vocational qualification",
	"Bachelor's degree",
	"Master's degree",
	"Doctorate or higher",
];
const incomeRanges = [
	"Below $60K",
	"$60K to $80K",
	"$80K to $100K",
	"$100K to $150K",
	"$150K to $250K",
	"$Above $250K",
];
const yesOrNoOptions = ["Yes", "No"];
const yesOrNoOptionsType = [
	"Patients",
	"Athlete",
	"Fitness Enthusiast ",
	"  Healthcare Professionals",
	"Athletic Coaches",
	" Fitness Consultants",
	"Wellness Coaches",
	"Pilot",
	"Aviation Medical Examiner (AME)",
];
const yesOrNoOptionsHeight = [
	"4.1 ft",
	"4.2 ft",
	"4.3 ft",
	"4.4 ft",
	"4.5 ft",
	"4.6 ft",
	"4.7 ft",
	"4.8 ft",
	"4.9 ft",
	"4.10 ft",
	"4.11 ft",
	"4.11 ft",
	"5 ft",
	"5.1 ft",
	"5.2 ft",
	"5.3 ft",
	"5.4 ft",
	"5.5 ft",
	"5.6 ft",
	"5.7 ft",
	"5.8 ft",
	"5.9 ft",
	"5.10 ft",
	"5.11 ft",
	"6 ft",
	"6.1 ft",
	"6.1 ft",
	"6.2 ft",
	"6.3 ft",
	"6.4 ft",
	"6.5 ft",
	"6.7 ft",
	"6.8 ft",
	"6.9 ft",
	"6.10 ft",
	"6.11 ft",
	"7 ft",
	"7.1 ft",
	"7.2 ft",
	"7.3 ft",
	"7.4 ft",
	"7.5ft",
	"7.6 ft",
];
const yesOrNoHealthOptions = [
	"Heart diseases and stroke",
	"Diabetes",
	"Arthritis",
	"Alcohol-related health issues",
	"Cancer",
	"Obesity",
	"Alzheimer's disease",
	"Smoking-related health issues",
	"No diagnosed chronic condition",
];

interface FormData {
	firstName: "";
	middleName: "";
	lastName: "";
	email: "";
	phoneNumber: "";
	gender: "";
	dateOfBirth: "";
	address1: "";
	address2: "";
	city: "";
	state: "";
	zipCode: "";
	country: "";
	educationLevel: "";
	incomeRange: "";
	healthcare: "";
	hospitalAssociated: "";
	height: "";
	weight: "";
	chronicCondition: "";
	smoker: "";
	type: "";
	organizationName: "";
	npi: "";
	yearsOfCoaching: "";
	organizationaddress1: "";
	organizationaddress2: "";
	organizationstate: "";
	organizationcity: "";
	organizationzipCode: "";
}

export const MyAccount = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const [activeTab, setActiveTab] = useState(0);
	const [formData, setFormData] = useState<FormData>({
		organizationName: "",
		npi: "",
		yearsOfCoaching: "",
		organizationaddress1: "",
		organizationaddress2: "",
		organizationstate: "",
		organizationcity: "",
		organizationzipCode: "",
		firstName: "",
		middleName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		gender: "",
		dateOfBirth: "",
		address1: "",
		address2: "",
		city: "",
		state: "",
		zipCode: "",
		country: "",
		educationLevel: "",
		incomeRange: "",
		healthcare: "",
		hospitalAssociated: "",
		height: "",
		weight: "",
		chronicCondition: "",
		smoker: "",
		type: "",

	});

	const [userInfo, setUserInfo] = useState<any>({});
	const userInfoGetAPI: any = useUserInfoGetAPI();
	const editProfileMutation = useEditProfileTempAPI();

	useEffect(() => {
		userInfoGetAPI("", {
			onSuccess: (res: any) => {
				console.log(res);
				setUserInfo(res);
			},
			onError: (err: any) => {
				console.log(err);
			},
		});
	}, [userInfoGetAPI]);

	useEffect(() => {
		if (userInfo) {
			const userFormData: FormData = {
				firstName: userInfo.firstName || "",
				middleName: userInfo.middleName || "",
				lastName: userInfo.lastName || "",
				email: userInfo.email || "",
				phoneNumber: userInfo.phoneNumber || "",
				gender: userInfo.demographic ? userInfo.demographic.gender || "" : "",
				dateOfBirth: userInfo.demographic ? userInfo.demographic.dob || "" : "",
				address1: userInfo.demographic ? userInfo.demographic.address1 || "" : "",
				address2: userInfo.demographic ? userInfo.demographic.address2 || "" : "",
				city: userInfo.demographic ? userInfo.demographic.city || "" : "",
				state: userInfo.demographic ? userInfo.demographic.state || "" : "",
				zipCode: userInfo.demographic ? userInfo.demographic.zip || "" : "",
				country: userInfo.demographic ? userInfo.demographic.country || "" : "",
				educationLevel: userInfo.socialProfile ? userInfo.socialProfile.educationLevel || "" : "",
				incomeRange: userInfo.socialProfile ? userInfo.socialProfile.incomeRange || "" : "",
				healthcare: userInfo.socialProfile ? userInfo.socialProfile.healthCare || "" : "",
				hospitalAssociated: userInfo.socialProfile ? userInfo.socialProfile.hospitalAssociated || "" : "",
				height: userInfo.healthFitness ? userInfo.healthFitness.height || "" : "",
				weight: userInfo.healthFitness ? userInfo.healthFitness.weight || "" : "",
				chronicCondition: userInfo.healthFitness ? userInfo.healthFitness.chronicCondition || "" : "",
				smoker: userInfo.healthFitness ? userInfo.healthFitness.smoker || "" : "",
				type: userInfo.roleName || "",
				organizationName: "",
				npi: "",
				yearsOfCoaching: "",
				organizationaddress1: "",
				organizationaddress2: "",
				organizationstate: "",
				organizationcity: "",
				organizationzipCode: "",

			};
			setFormData(userFormData);
		}
	}, [userInfo]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSelectChange = (e: SelectChangeEvent<string>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const editProfileTempAPI = useEditProfileTempAPI();

	const handleSave = () => {
		editProfileMutation(
			{ formData },
			{
				onSuccess: (res) => {
					console.log("register temp resp data: ", res);

					if (res) {
						return res;
					}
				},
				onError: (err) => {
					console.log(err);
				},
			}
		);
		console.log(formData);
	};

	const tabPanels = [
		{ component: <CorporateAffiliation formData={formData} handleInputChange={handleInputChange} />, title: "Corporate" },
		{ component: <User formData={formData} handleInputChange={handleInputChange} />, title: "User" },
		{ component: <Demo formData={formData} handleInputChange={handleInputChange} handleSelectChange={handleSelectChange} />, title: "Demographic" },
		{ component: <Social formData={formData} handleInputChange={handleInputChange} handleSelectChange={handleSelectChange} />, title: "Social" },
		{ component: <Health formData={formData} handleInputChange={handleInputChange} handleSelectChange={handleSelectChange} />, title: "Health " },
		{ component: <Types formData={formData} handleInputChange={handleInputChange} handleSelectChange={handleSelectChange} />, title: "Type" },
	];

	return (
		<Root>
			<UserProfileImage />

			{isMobile ? (
				// For mobile view, display tabs in two lines
				<>
					<div style={{ display: "flex", justifyContent: "center", gap: "20px", height: "50px", width: "100%" }}>
						{tabPanels.slice(0, 3).map((tabPanel, index) => (
							<Button
								key={index}
								variant="contained"
								color={activeTab === index ? "primary" : "secondary"}
								onClick={() => setActiveTab(index)}
								style={{
									flex: 1,
									border: ".1px solid #391061",
								}}
							>
								{tabPanel.title}
							</Button>
						))}
					</div>
					<div style={{ display: "flex", justifyContent: "center", gap: "20px", height: "50px", width: "100%", marginTop: "10px" }}>
						{tabPanels.slice(3, 6).map((tabPanel, index) => (
							<Button
								key={index + 3}
								variant="contained"
								color={activeTab === index + 3 ? "primary" : "secondary"}
								onClick={() => setActiveTab(index + 3)}
								style={{
									flex: 1,
									border: ".1px solid black",
								}}

							>
								{tabPanel.title}
							</Button>
						))}
					</div>
				</>
			) : (
				// For larger screens, use the default Tabs component
				<Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
					{tabPanels.map((tabPanel, index) => (
						<Tab key={index} label={tabPanel.title} className="tab-button" />
					))}
				</Tabs>
			)}

			<SectionContent style={{ marginTop: isMobile ? "20px" : "20px" }} className="section-content">
				{tabPanels[activeTab].component}
			</SectionContent>
			{activeTab !== 5 && (
				<ButtonWrapper>
					<Button variant="contained" color="primary" onClick={handleSave}>
						Save
					</Button>
				</ButtonWrapper>
			)}
		</Root>
	);
};

interface UserProps {
	formData: {

		firstName: string;
		middleName: string;
		lastName: string;
		email: string;
		phoneNumber: string;
	};
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const User: React.FC<UserProps> = ({ formData, handleInputChange }) => {
	const handlePhoneInputChange = (value: string, data: {} | CountryData, event: React.ChangeEvent<HTMLInputElement>, formattedValue: string) => {
		// Handle the phone input change here
		// You can access the phone number value from 'value'
		// Update formData.phoneNumber or perform other actions
		handleInputChange(event); // Call the common handler to handle changes in 'formData.phoneNumber'
	};
	return (
		<FormContainer direction="column">
			<Grid container spacing={3.5}>
				<Grid item xs={12} sm={6}>
					<TextField
						className="formfield"
						fullWidth
						label="First Name"
						required
						variant="outlined"
						name="firstName"
						value={formData.firstName}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						className="formfield"
						fullWidth
						label="Middle Name"
						variant="outlined"
						name="middleName"
						value={formData.middleName}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						className="formfield"
						fullWidth
						label="Last Name"
						required
						variant="outlined"
						name="lastName"
						value={formData.lastName}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						className="formfield"
						fullWidth
						label="Email"
						required
						variant="outlined"
						name="email"
						value={formData.email}
						onChange={handleInputChange}
						InputProps={{
							readOnly: true,
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<PhoneInput
						country={'us'}
						value={formData.phoneNumber}
						onChange={handlePhoneInputChange} // Use the specific handler for PhoneInput
						inputProps={{
							name: 'phoneNumber',
							required: true,
							autoFocus: true,
						}}
					/>
					{/* <TextField
						className="formfield"
						fullWidth
						label="Phone Number"
						required
						variant="outlined"
						name="phoneNumber"
						value={formData.phoneNumber}
						onChange={handleInputChange}
					/> */}
				</Grid>
			</Grid>
		</FormContainer>
	);
};

interface DemoProps {
	formData: {
		gender: string;
		dateOfBirth: string;
		address1: string;
		address2: string;
		city: string;
		state: string;
		zipCode: string;
		country: string;
	};
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSelectChange: (e: SelectChangeEvent<string>) => void;
}
const Demo: React.FC<DemoProps> = ({ formData, handleInputChange, handleSelectChange }) => {
	const validateDateOfBirth = (dateOfBirth: string | number | Date) => {
		const currentDate = new Date();
		const inputDate = new Date(dateOfBirth);
		const minDate = new Date(currentDate);
		minDate.setFullYear(currentDate.getFullYear() - 10); // User must be at least 10 years old

		if (inputDate > currentDate) {
			toast.warn("Date of birth cannot be in the future.");
			return false;
		}

		if (inputDate > minDate) {
			toast.warn("User must be at least 10 years old.");
			return false;
		}

		return true;
	};

	const handleDateOfBirthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		if (validateDateOfBirth(value)) {
			// If the date is valid, update the formData state
			handleInputChange(event);
		}
	};
	function formatDate(date: string | number | Date) {
		if (!date) {
			return "";
		}
		const formattedDate = new Date(date);
		const year = formattedDate.getFullYear();
		const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
		const day = formattedDate.getDate().toString().padStart(2, '0');
		return `${year}-${month}-${day}`;
	}
	return (
		<FormContainer direction="column">
			<Grid container spacing={3.5}>
				<Grid item xs={12} sm={6}>
					<FormControl fullWidth variant="outlined">
						<InputLabel>Gender</InputLabel>
						<Select
							className="abc"
							label="Gender"
							required
							name="gender"
							value={formData.gender}
							onChange={handleSelectChange}
						>
							{genderOptions.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						className="formfield"
						fullWidth
						label="Date of Birth"
						type="date"
						InputLabelProps={{
							shrink: true,
						}}
						variant="outlined"
						name="dateOfBirth"
						value={formatDate(formData.dateOfBirth)}
						onInput={handleDateOfBirthChange} // Use the new handler for date of birth
					/>

				</Grid>
				<Grid item xs={12}>
					<TextField
						className="formfield"
						fullWidth
						label="Address 1"
						variant="outlined"
						name="address1"
						value={formData.address1}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						className="formfield"
						fullWidth
						label="Address 2"
						variant="outlined"
						name="address2"
						value={formData.address2}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						className="formfield"
						fullWidth
						label="City"
						variant="outlined"
						name="city"
						value={formData.city}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						className="formfield"
						fullWidth
						label="State"
						variant="outlined"
						name="state"
						value={formData.state}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						className="formfield"
						fullWidth
						label="Zip Code"
						variant="outlined"
						name="zipCode"
						value={formData.zipCode}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						className="formfield"
						fullWidth
						label="Country"
						variant="outlined"
						name="country"
						value={formData.country}
						onChange={handleInputChange}
					/>
				</Grid>
			</Grid>
		</FormContainer>
	);
};

interface SocailProps {
	formData: {
		educationLevel: string;
		incomeRange: string;
		healthcare: string;
		hospitalAssociated: string;
	};
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSelectChange: (e: SelectChangeEvent<string>) => void;
}
const Social: React.FC<SocailProps> = ({ formData, handleInputChange, handleSelectChange }) => {
	return (
		<FormContainer direction="column">
			<Grid container spacing={3.5}>
				<Grid item xs={12} sm={6}>
					<FormControl fullWidth variant="outlined">
						<InputLabel>Education Level</InputLabel>
						<Select
							className="abc"
							label="Education Level"
							name="educationLevel"
							value={formData.educationLevel}
							onChange={handleSelectChange}
						>
							{educationLevels.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormControl fullWidth variant="outlined">
						<InputLabel>Income Range</InputLabel>
						<Select
							className="abc"
							label="Income Range"
							name="incomeRange"
							value={formData.incomeRange}
							onChange={handleSelectChange}
						>
							{incomeRanges.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormControl fullWidth variant="outlined">
						<InputLabel>Healthcare</InputLabel>
						<Select
							className="abc"
							label="Healthcare"
							name="healthcare"
							value={formData.healthcare ? "Yes" : "No"}
							onChange={handleSelectChange}
						>
							{yesOrNoOptions.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						className="formfield"
						fullWidth
						label="Hospital Associated"
						variant="outlined"
						name="hospitalAssociated"
						value={formData.hospitalAssociated}
						onChange={handleInputChange}
					/>
				</Grid>
			</Grid>
		</FormContainer>
	);
};

interface HealthProps {
	formData: {
		height: string;
		weight: string;
		chronicCondition: string;
		smoker: string;
	};
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSelectChange: (e: SelectChangeEvent<string>) => void;
}
const Health: React.FC<HealthProps> = ({ formData, handleInputChange, handleSelectChange }) => {
	return (
		<FormContainer direction="column">
			<Grid container spacing={3.5}>
				<Grid item xs={12} sm={6}>
					<FormControl fullWidth variant="outlined">
						<InputLabel>Height</InputLabel>
						<Select
							className="abc"
							label="Height"
							name="height"
							value={formData.height}
							onChange={handleSelectChange}
						>
							{yesOrNoOptionsHeight.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						className="formfield"
						fullWidth
						label="Weight"
						variant="outlined"
						name="weight"
						value={formData.weight}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormControl fullWidth variant="outlined">
						<InputLabel>Chronic Condition</InputLabel>
						<Select
							className="abc"
							label="Chronic Condition"
							name="chronicCondition"
							value={formData.chronicCondition}
							onChange={handleSelectChange}
						>
							{yesOrNoHealthOptions.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormControl fullWidth variant="outlined">
						<InputLabel>Smoker</InputLabel>
						<Select
							className="abc"
							label="Smoker"
							name="smoker"
							value={formData.smoker ? "Yes" : "No"}
							onChange={handleSelectChange}
						>
							{yesOrNoOptions.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
			</Grid>
		</FormContainer>
	);
};
const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: "#fff",
	padding: 0,
	textAlign: "center",
	color: theme.palette.text.secondary,
	position: "relative",
	paddingBottom: "20px",
	boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.16)",
	borderRadius: "8px",
}));

const HeaderTypography = styled(Typography)(({ theme }) => ({
	variant: "subtitle2",
	color: theme.palette.primary.main,
	fontWeight: 600,
	fontSize: "16px",
	lineHeight: "22px",
	backgroundColor: "#F2F2F2",
	padding: "15px 15px",
	borderTopLeftRadius: "8px",
	borderTopRightRadius: "8px",
}));

const SubTitleTypography = styled(Typography)(({ theme }) => ({
	variant: "subtitle2",
	color: theme.palette.text.secondary,
	fontWeight: 400,
	fontSize: "12px",
	lineHeight: "17px",
}));

const AmountTypography = styled(Typography)(({ theme }) => ({
	variant: "subtitle2",
	color: theme.palette.secondary.main,
	fontWeight: 400,
	fontStyle: "normal",
	fontSize: "18px",
	lineHeight: "29px",
	padding: "20px 0px 10px 0",
}));




interface TypeProps {
	formData: {
		type: string;
	};
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSelectChange: (e: SelectChangeEvent<string>) => void;
}
const Types: React.FC<TypeProps> = ({ formData, handleInputChange, handleSelectChange }) => {
	const [isDrawerOpen, setDrawerOpen] = useState(false);

	const handleProceed = () => {
		// // Open the drawer when the "proceed" button is clicked
		// setDrawerOpen(true);
		console.log("Payment event");
		selectRolePlan();
	};

	const {
		signUp: {
			selectPlan,
			proceed,
			roleSelection,
			pleaseSelectARoleToCreateYourProfile1,
		},
	} = uiStrings;
	const defaultValues = {
		roleSelection: "",
		selectPlan: " ",
	};
	const { getValues, watch, control } = useForm({
		defaultValues,
		mode: "onChange",
	});

	interface ISelectedPlanState {
		id: string;
		amount: number;
	}

	const [sp, setSP] = useState<ISelectedPlanState>({ id: "1", amount: 0 });
	const navigate = useNavigate();

	const [profileOptions, setProfileOptions] = useState<any>([]);
	const [paymentTypes, setPaymentTypes] = useState([]);
	const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
	const getPaymentRoles = usePaymentPlanRoleAPI(true);
	const putPaymentRoleMutation = usePutPaymentPlanRoleAPI();
	const postPaymentPlanLinkMutation = usePaymentPlanLinkAPI();

	let metaData: any[] = getPaymentRoles?.data || [];

	let userData: any = window.localStorage.getItem(STORAGE_USER_INFO_KEY);
	userData = userData ? JSON.parse(userData) : {};

	useEffect(() => {
		let profiles = [] as any;
		metaData?.forEach((profile) => {
			profiles.push({
				label: profile.roleName,
				value: profile.id,
				plans: profile.paymentPlans,
				corporateAffiliation: profile.corporateAffiliation,
				id: profile.id,
			});
		});
		setProfileOptions(profiles);
	}, [metaData]);

	const role = watch("roleSelection");

	useEffect(() => {
		if (role) {
			const filteredData = profileOptions.find((x: any) => x.value === role);
			setPaymentTypes((filteredData as any).plans);

		}
	}, [role]);
	useEffect(() => {
		if (role) {
			const filteredData = profileOptions.find((x: any) => x.value === role);
			setPaymentTypes((filteredData as any).plans);
		}
	}, [role]);

	const border = (val: string) => {
		return val === sp?.id ? "0px 0px 2px 2px #EA376B" : undefined;
	};

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const selectRolePlan = () => {
		let filteredData: any;
		filteredData = profileOptions.find((x: any) => x.value === role);

		if (sp !== null) {
			const priceIdObj = {
				priceId: filteredData.plans.find((plan: any) => plan === sp).stripeProductPriceId,
			};
			{
				!isPaymentSuccess &&
					postPaymentPlanLinkMutation(priceIdObj, {
						onSuccess: (res: any) => {
							if (res?.active) {
								// Open the URL in a new tab or window
								const newTab = window.open(res?.url, "_blank");
								// Define a function to check if the new tab is closed
								const checkPopupClosed = () => {
									if (newTab && newTab.closed) {
										putPaymentRoleMutation(
											{
												planId: sp?.id,
												roleId: role,
												userId: userData?.userId,
											},
											{
												onSuccess: (res) => {
													console.log(res);
													setIsPaymentSuccess(true);
												},
												onError: (err) => {
													console.log(err);
												},
											}
										);
									} else {
										// The popup is still open, check again after a short delay
										setTimeout(checkPopupClosed, 1000); // You can adjust the delay as needed
									}
								};

								// Start checking if the popup is closed
								checkPopupClosed();
							}
						},
					});
			}
		}
	};

	return (
		<FormContainer direction="column">
			<Stack >
				<Grid2 marginTop={-2} justifyContent="center"  // Center horizontally
					alignItems="center" >
					<FilledSelect
						outerLabel={pleaseSelectARoleToCreateYourProfile1}
						label={roleSelection}

						options={profileOptions}
						formControlStyle={{
							marginTop: "4px",
							minWidth: "320px",

						}}
						name={"roleSelection"}
						control={control}

					/>
				</Grid2>
			</Stack>
			{role && paymentTypes.length > 0 && (
				<Grid2 marginTop={5}>
					<Grid2 container spacing={1} justifyContent="center">
						<Grid2 container spacing={1} width="100%">
							<Grid2 width="100%" justifyContent="center">
								<InputLabel
									sx={{
										fontStyle: "normal",
										fontWeight: "500",
										fontSize: "12px",
										lineHeight: "15px",
										color: "#000000",
										textAlign: "center",
									}}
								>
									{selectPlan}
								</InputLabel>
								<Stack
									mt={1}
									justifyContent="center"  // Center horizontally
									alignItems="center"     // Center vertically
									direction={{
										xs: "row",
										sm: "row",
										md: "row",
										lg: "row",
										xl: "row",
									}}
									spacing={{ xs: 1.5, sm: 1.5, md: 1.5, xl: 1.5, lg: 1.5 }}
								>
									{(paymentTypes as any[]).map((type) => {
										return (
											<Item
												onClick={() => setSP(type)}
												sx={{ boxShadow: border(type.id) }}
												key="type.id"
											>
												<HeaderTypography>{type.plan}</HeaderTypography>
												<AmountTypography>${type.amount}</AmountTypography>
												<SubTitleTypography variant="caption">
													{type.description}
												</SubTitleTypography>
											</Item>
										);
									})}
								</Stack>
							</Grid2>
						</Grid2>

						<Grid2
							marginTop={3}
							justifyContent="center"  // Center horizontally
							alignItems="center"
						>
							<Button type="button" variant="contained" onClick={handleProceed}>
								{proceed}
							</Button>
						</Grid2>
					</Grid2>
				</Grid2>

			)}


			{/* <TextField
						className="formfield"
						fullWidth
						label="Role"
						variant="outlined"
						name="type"
						value={formData.type}
						onChange={handleInputChange}
					/>
					<FormControl fullWidth variant="outlined">
						<InputLabel>Type</InputLabel>
						<Select
							className="abc"
							label="Type"
							name="type"
							value={formData.type}
							onChange={handleSelectChange}
						>
							{yesOrNoOptionsType.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</Select>
					</FormControl> */}

		</FormContainer>
	);
};

export const UserProfileImage = () => {
	const [profileImage, setProfileImage] = useState(""); // Set initial image URL

	const user = window.localStorage.getItem(STORAGE_USER_INFO_KEY);
	const userInfo = JSON.parse(String(user));
	const userProfileInfo = userInfo.data !== undefined ? userInfo.data : userInfo;

	useEffect(() => {
		setProfileImage(userProfileInfo.profileImage);
	}, [userInfo?.data]);

	const handleImageUpload = (e: any) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();

			reader.onload = (event: any) => {
				const imageDataUrl = event.target.result;
				setProfileImage(imageDataUrl); // Update the image URL
			};

			reader.readAsDataURL(file);
		}
	};

	return (
		<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
			<Avatar
				alt="Profile Image"
				src={profileImage}
				sx={{ width: 80, height: 80, border: "5px solid primary.main" }}
			/>
			<div>
				<input
					accept="image/*"
					style={{
						display: "none",
						width: 60,
						height: 60,
						marginBottom: 0.5,
						border: "5px solid primary.main",
					}}
					id="profile-image-upload"
					type="file"
					onChange={handleImageUpload}
				/>
				<label htmlFor="profile-image-upload">
					<IconButton
						color="secondary"
						aria-label="upload picture"
						component="span"
						sx={{ marginTop: "-35px", marginRight: "0px" }}
					>
						<EditIcon />
					</IconButton>
				</label>
			</div>
		</div>
	);
};
interface OrganizationProps {
	formData: {
		organizationName: string;
		npi: string;
		yearsOfCoaching: string;
		address1: string;
		address2: string;
		state: string;
		city: string;
		zipCode: string;
	};
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const CorporateAffiliation: React.FC<OrganizationProps> = ({ formData, handleInputChange }) => {

	return (
		<div>
			<FormContainer direction="column">

				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<FormControl fullWidth variant="outlined">
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
			</FormContainer>
		</div>
	);
};