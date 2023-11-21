import {
	Button,
	InputLabel,
	Paper,
	Stack,
	Typography,
	styled,
	useMediaQuery,
	useTheme
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { usePaymentPlanLinkAPI, usePaymentPlanRoleAPI, usePutPaymentPlanRoleAPI } from "api/accountCreateAPI";
import { FilledSelect } from "components/shared/FilledSelect";
import { ParamsProfileType, STORAGE_USER_INFO_KEY, appLinks, uiStrings } from "main";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

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
	fontSize: "18px",
	lineHeight: "22px",
	backgroundColor: "#F2F2F2",
	padding: "15px 50px",
	borderTopLeftRadius: "8px",
	borderTopRightRadius: "8px",
}));

const SubTitleTypography = styled(Typography)(({ theme }) => ({
	variant: "subtitle2",
	color: theme.palette.text.secondary,
	fontWeight: 400,
	fontSize: "14px",
	lineHeight: "17px",
}));

const AmountTypography = styled(Typography)(({ theme }) => ({
	variant: "subtitle2",
	color: theme.palette.secondary.main,
	fontWeight: 400,
	fontStyle: "normal",
	fontSize: "22px",
	lineHeight: "29px",
	padding: "20px 0px 10px 0",
}));
const HeaderTypography1 = styled(Typography)(({ theme }) => ({
	variant: "subtitle2",
	color: theme.palette.primary.main,
	fontWeight: 600,
	fontSize: "18px",
	lineHeight: "22px",
	backgroundColor: "#F2F2F2",
	padding: "16px",
	borderTopLeftRadius: "8px",
	borderTopRightRadius: "8px",
}));

const SubTitleTypography1 = styled(Typography)(({ theme }) => ({
	variant: "subtitle2",
	color: theme.palette.text.secondary,
	fontWeight: 400,
	fontSize: "14px",
	lineHeight: "17px",
}));

const AmountTypography1 = styled(Typography)(({ theme }) => ({
	variant: "subtitle2",
	color: theme.palette.secondary.main,
	fontWeight: 400,
	fontStyle: "normal",
	fontSize: "20px",
	lineHeight: "29px",
	padding: "20px 0px 10px 0",
}));

export const PaymentDetails = () => {
	const [isDrawerOpen, setDrawerOpen] = useState(false);

	const handleProceed = () => {
		// // Open the drawer when the "proceed" button is clicked
		// setDrawerOpen(true);
		// console.log("Payment event");
		selectRolePlan();
	};

	const {
		signUp: {
			selectPlan,
			monthly,
			quarterly,
			annual,
			billedAnnually,
			billedMonthly,
			billedQuarterly,
			month,
			proceed,
			step2,
			paymentDetails,
			roleSelection,
			pleaseSelectARoleToCreateYourProfile,
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
	const params = useParams<ParamsProfileType>();
	const [profileOptions, setProfileOptions] = useState([]);
	const [paymentTypes, setPaymentTypes] = useState([]);
	const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
	const getPaymentRoles = usePaymentPlanRoleAPI(true);
	const putPaymentRoleMutation = usePutPaymentPlanRoleAPI();
	const postPaymentPlanLinkMutation = usePaymentPlanLinkAPI();

	let metaData: any[] = getPaymentRoles?.data || [];
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
			navigate(`../${appLinks.paymentDetails}/${role}`, { replace: true });
		}
	}, [role]);

	const border = (val: string) => {
		return val === sp?.id ? "0px 0px 2px 2px #EA376B" : undefined;
	};
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const selectRolePlan = () => {
		let filteredData: any;
		filteredData = profileOptions.find((x: any) => x.value === parseInt((params as any)?.profileType));

		if (sp !== null) {
			const priceIdObj = {
				// priceId: "price_1NzSTjKKoWpF5LTXnvLScJzR",
				priceId: filteredData.plans.find((plan: any) => plan === sp).stripeProductPriceId,
			};
			{
				!isPaymentSuccess &&
					postPaymentPlanLinkMutation(priceIdObj, {
						onSuccess: (res: any) => {
							// navigate(`../${appLinks.createProfile}/${params.profileType}`, {
							// 	replace: true,
							// });
							// window.open(filteredData.plans.find((plan: any) => plan.id === sp).stripelink, "_blank");

							// Redirect the current tab to the payment URL
							// const paymentURL = 'https://buy.stripe.com/test_5kAaFi4U00HMaoE288'; // Replace with your actual payment URL
							// window.location.href = paymentURL;

							if (res?.active) {
								// Open the URL in a new tab or window
								const newTab = window.open(res?.url, "_blank");
								// Define a function to check if the new tab is closed
								const checkPopupClosed = () => {
									if (newTab && newTab.closed) {
										let userData: any = window.localStorage.getItem(STORAGE_USER_INFO_KEY);
										userData = userData ? JSON.parse(userData) : {};
										putPaymentRoleMutation(
											{
												planId: sp?.id,
												roleId: parseInt(params?.profileType ? params?.profileType : ""),
												userId: userData?.userId,
											},
											{
												onSuccess: (res) => {
													console.log(res);
													setIsPaymentSuccess(true);
													navigate(
														`../${appLinks.createProfile}/${
															(filteredData as any)?.corporateAffiliation
														}`,
														{
															replace: true,
														}
													);
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
	if (!isMobile) {
		return (
			<Stack
				color="text.primary"
				width={{ xs: 360, sm: 768, md: 768, lg: 768, xl: 768 }}
				paddingY={3}
				paddingX={5}
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "left",
				}}
			>
				<Grid2 container spacing={1}>
					<Grid2 xs={12} marginBottom={3}>
						<Typography variant="h4" fontWeight={600} textAlign="center">
							{step2}
						</Typography>
						<Typography variant="h5" textAlign="center">
							{paymentDetails}
						</Typography>
					</Grid2>
				</Grid2>
				<Stack alignItems="center">
					<Grid2>
						<FilledSelect
							outerLabel={pleaseSelectARoleToCreateYourProfile}
							label={roleSelection}
							// value={params.profileType ?? ""}

							options={profileOptions}
							formControlStyle={{
								marginTop: "4px",
								width: "320px",
								maxWidth: "320px",
							}}
							name={"roleSelection"}
							control={control}
						/>
					</Grid2>
				</Stack>
				{(params?.profileType ?? "") !== "" && (
					<Grid2 marginTop={6}>
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
										justifyContent="center"
										direction={{
											md: "row",
											lg: "row",
											xl: "row",
										}}
										spacing={{ xs: 2, sm: 2, md: 2, xl: 2, lg: 2 }}
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

							<Grid2 xl={6} xs={12} md={6} marginTop={3}>
								<Button fullWidth type="button" variant="contained" onClick={handleProceed}>
									{proceed}
								</Button>
							</Grid2>
						</Grid2>
					</Grid2>
				)}
			</Stack>
		);
	}
	return (
		<Stack
			color="text.primary"
			// width={{ xs: 360, sm: 768, md: 768, lg: 768, xl: 768 }}
			// paddingY={3}
			// paddingX={5}
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "left",
			}}
		>
			<Grid2 container spacing={1}>
				<Grid2 xs={12} marginBottom={3}>
					<Typography variant="h5" textAlign="center">
						{paymentDetails}
					</Typography>
				</Grid2>
			</Grid2>
			<Stack alignItems="center">
				<Grid2>
					<FilledSelect
						outerLabel={pleaseSelectARoleToCreateYourProfile}
						label={roleSelection}
						// value={params.profileType ?? ""}

						options={profileOptions}
						formControlStyle={{
							marginTop: "4px",
							width: "320px",
							maxWidth: "320px",
						}}
						name={"roleSelection"}
						control={control}
					/>
				</Grid2>
			</Stack>
			{(params?.profileType ?? "") !== "" && (
				<Grid2 marginTop={6}>
					<Grid2 container spacing={1} justifyContent="center">
						<Grid2 container spacing={1} width="100%">
							<Grid2 width="100%" justifyContent="center">
								<Stack
									mt={1}
									justifyContent="center"
									direction={{
										xs: "row",
										sm: "row",
										md: "row",
										lg: "row",
										xl: "row",
									}}
									spacing={{ xs: 1, sm: 1, md: 1, xl: 1, lg: 1 }}
								>
									{(paymentTypes as any[]).map((type) => {
											return (
												<Item
													onClick={() => setSP(type)}
													sx={{ boxShadow: border(type.id) }}
													key="type.id"
												>
													<HeaderTypography1>{type.plan}</HeaderTypography1>
													<AmountTypography1>${type.amount}</AmountTypography1>
													<SubTitleTypography1 variant="caption">
														{type.description}
													</SubTitleTypography1>
												</Item>
											);
										})}
								</Stack>
							</Grid2>
						</Grid2>

						<Grid2 xl={6} xs={12} md={6} marginTop={3} width={300}>
							<Button fullWidth type="button" variant="contained" onClick={selectRolePlan}>
								{proceed}
							</Button>
						</Grid2>
					</Grid2>
				</Grid2>
			)}
		</Stack>
	);
};
