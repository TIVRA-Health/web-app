import {
	Button,
	Checkbox,
	FormControlLabel,
	Paper,
	Stack,
	Typography,
	styled,
	useMediaQuery,
	useTheme,
} from "@mui/material";

import Grid2 from "@mui/material/Unstable_Grid2";
import { useDeviceSessionConnectionAPI, useRegisterUserDeviceAPI, useGetDevicesAPI } from "api/useDeviceLogin";
import { FilledSelect, TLink } from "components/shared";
import { STORAGE_USER_INFO_KEY, appLinks, dashboardLinks, uiStrings } from "main";
import { useEffect, useState } from "react";
import { UseFormRegister, useForm } from "react-hook-form";
import { To, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface IFormControlLabelCheckboxProps {
	label: string;
	linkText: string;
	to: To;
	replace?: boolean;
	name: keyof IAgreementState;
	register: UseFormRegister<IAgreementState>;
}

interface DeviceData {
	userId: string;
	device: string;
}

const CheckboxWithLink = ({ label, linkText, to, replace = false, name, register }: IFormControlLabelCheckboxProps) => {
	return (
		<FormControlLabel
			control={<Checkbox sx={{ height: "25px" }} color="primary" {...register(name)} />}
			label={
				<Typography lineHeight="14px" fontSize="12px">
					{label}
					<TLink
						to={to}
						replace={replace}
						fontSize={13}
						fontWeight={700}
						marginLeft="3px"
						color="text.primary"
						target="_blank"
					>
						{linkText}
					</TLink>
					.
				</Typography>
			}
		/>
	);
};

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
	textAlign: "center",
	color: theme.palette.text.secondary,
	position: "relative",
	padding: "10px",
	boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.16)",
	borderRadius: "8px",
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
}));

interface IAgreementState {
	selectedDevice: string;
	agreement1: boolean;
	agreement2: boolean;
}

const defaultValues: IAgreementState = {
	selectedDevice: "",
	agreement1: false,
	agreement2: false,
};

export const DeviceRegistration = () => {
	const navigate = useNavigate();
	const theme = useTheme();
	const [deviceOptions, setDeviceOptions] = useState<any[]>([]);
	const deviceSessionConnectionMutation = useDeviceSessionConnectionAPI();
	const registerUserDeviceMutation = useRegisterUserDeviceAPI();
	const getDevicesMutation: any = useGetDevicesAPI();

	const {
		signUp: {
			step4,
			registerYourDevice,
			termsAndConditions,
			privacyPolicy,
			agreement1,
			register,
			continueText,
			selectDevice,
		},
	} = uiStrings;

	const {
		register: hfRegister,
		getValues,
		control,
	} = useForm({
		defaultValues,
		mode: "onChange",
	});

	useEffect(() => {
		if (getDevicesMutation?.data) {
			let res = [] as any;
			getDevicesMutation?.data.forEach((device: any) => {
				res.push({
					value: device.deviceMake,
					label: device.name,
					id: device._id,
				});
			});
			setDeviceOptions(res);
		}
	}, [getDevicesMutation?.data]);

	const user = window.localStorage.getItem(STORAGE_USER_INFO_KEY);
	const userJson = JSON.parse(String(user));

	const onProceed = () => {
		const agreements = getValues();
		if (agreements.selectedDevice && agreements.agreement1 && agreements.agreement2) {
			const resource = agreements.selectedDevice;
			deviceSessionConnectionMutation(resource, {
				onSuccess: (res: any) => {
					if (res?.status === "success") {
						const deviceWidgetSessionUrl = res.auth_url;

						let formData = {
							deviceId: deviceOptions
								?.find((dev: any) => dev.value === agreements.selectedDevice)
								.id.toString(),
							terraDeviceUserId: res.user_id,
							tivraUserId: userJson?.userId,
							deviceMake: agreements.selectedDevice,
							active: false,
						};
						registerUserDeviceMutation(formData, {
							onSuccess: (res: any) => {
								window.location.href = deviceWidgetSessionUrl;
							},
							onError: (err: any) => {
								console.log(err);
							},
						});
					}
				},
				onError: (err: any) => {
					console.log(err);
				},
			});
		} else {
			if (!agreements.agreement1) {
				toast.error("Oops.. Kindly select the T&C.");
			} else if (!agreements.agreement2) {
				toast.error("Oops.. Kindly select the Privacy.");
			}
		}
	};

	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const onSkip = () => {
		// navigate(`${appLinks.dashboard}/${dashboardLinks.devices}`, {
		navigate(`${appLinks.dashboard}/${dashboardLinks.overview}`, {
			replace: true,
		});
	};

	if (!isMobile) {
		return (
			<Stack
				color="text.primary"
				width={{ xs: 360, sm: 720, md: 720, lg: 720, xl: 720 }}
				paddingY={3}
				paddingX={5}
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Grid2 container marginLeft={5} spacing={1}>
					<Grid2 width="100%" xl={12}>
						<Typography variant="h4" fontWeight={600} textAlign="center">
							{step4}
						</Typography>
						<Typography variant="h5" textAlign="center">
							{registerYourDevice}
						</Typography>
					</Grid2>
					<Grid2 container width="100%" marginTop={4}>
						<Grid2 container spacing={1} width="100%" justifyContent="center" alignContent="center">
							<Grid2
								xs={12}
								sm={12}
								md={8}
								lg={8}
								xl={8}
								mdOffset={1}
								lgOffset={1}
								xlOffset={1}
								padding={0}
								marginBottom={2}
							>
								<FilledSelect
									label={selectDevice}
									required
									options={deviceOptions}
									name={"selectedDevice"}
									control={control}
								/>
							</Grid2>
							<Grid2
								xs={12}
								sm={12}
								md={4}
								lg={4}
								xl={4}
								textAlign={{
									xs: "right",
									sm: "right",
									lg: "left",
									md: "left",
									xl: "left",
								}}
							></Grid2>
						</Grid2>
						<Grid2
							width="100%"
							padding={0}
							textAlign={{
								xs: "left",
								sm: "left",
								lg: "center",
								md: "left",
								xl: "center",
							}}
							marginTop="10px"
						>
							<CheckboxWithLink
								label={agreement1}
								to={appLinks.termsAndConditions}
								linkText={termsAndConditions}
								replace={true}
								register={hfRegister}
								name="agreement1"
							/>
						</Grid2>
						<Grid2
							width="100%"
							padding={0}
							textAlign={{
								xs: "left",
								sm: "left",
								lg: "center",
								md: "left",
								xl: "center",
							}}
							marginTop="10px"
						>
							<CheckboxWithLink
								label={agreement1}
								to={appLinks.privacyPolicy}
								linkText={privacyPolicy}
								replace={true}
								register={hfRegister}
								name="agreement2"
							/>
						</Grid2>

						<Grid2 xl={12} lg={12} md={12} sm={12} textAlign="center" mt={3}>
							<Button
								type="button"
								fullWidth
								variant="contained"
								sx={{
									width: "180px",
									p: 1,
									borderRadius: 2,
									backgroundColor: "#ea376b",
								}}
								onClick={onProceed}
							>
								{register}
							</Button>
						</Grid2>
					</Grid2>
				</Grid2>
			</Stack>
		);
	}
	return (
		<Stack color="text.primary" width={{ xs: 360, sm: 720, md: 720, lg: 720, xl: 720 }} paddingY={2} paddingX={2}>
			<Grid2 container marginLeft={5} spacing={1}>
				<Grid2 width="100%" xl={12}>
					<Typography variant="h5" textAlign="center">
						{registerYourDevice}
					</Typography>
				</Grid2>
				<Grid2 container width="100%" marginTop={4}>
					<Grid2 container spacing={1} width="100%" justifyContent="center" alignContent="center">
						<Grid2 xs={12} sm={12} md={12} lg={12} xl={12} marginBottom={2}>
							<FilledSelect
								label={selectDevice}
								required
								options={deviceOptions}
								name={"selectedDevice"}
								control={control}
							/>
						</Grid2>
					</Grid2>
					<Grid2 width="100%" padding={0} marginTop="10px">
						<CheckboxWithLink
							label={agreement1}
							to={appLinks.termsAndConditions}
							linkText={termsAndConditions}
							replace={true}
							register={hfRegister}
							name="agreement1"
						/>
					</Grid2>
					<Grid2 width="100%" padding={0} marginTop="10px">
						<CheckboxWithLink
							label={agreement1}
							to={appLinks.privacyPolicy}
							linkText={privacyPolicy}
							replace={true}
							register={hfRegister}
							name="agreement2"
						/>
					</Grid2>

					<Grid2
						xl={12}
						lg={12}
						md={12}
						sm={12}
						textAlign="center"
						mt={3}
						marginLeft={8.5}
						sx={{ justifyContent: "center" }}
					>
						<Button
							type="button"
							fullWidth
							variant="contained"
							sx={{
								width: "160px",
								p: 1,
								borderRadius: 2,
								backgroundColor: "#ea376b",
							}}
							onClick={onProceed}
						>
							{register}
						</Button>
					</Grid2>
				</Grid2>
			</Grid2>
		</Stack>
		// <Stack
		// 	color="text.primary"
		// 	width={{ xs: 400, sm: 720, md: 720, lg: 720, xl: 720 }}
		// 	paddingY={3}
		// 	paddingX={5}
		// 	sx={{
		// 		display: "flex",
		// 		flexDirection: "column",
		// 		alignItems: "center",
		// 	}}
		// >
		// 	<Grid2 container spacing={1}>
		// 		<Grid2 width="100%" xl={12}>
		// 			<Typography variant="h5" textAlign="center">
		// 				{registerYourDevice}
		// 			</Typography>
		// 		</Grid2>
		// 		<Grid2 container width="100%" marginTop={4}>
		// 			<Grid2 container spacing={1} width="100%" justifyContent="center" alignContent="center">
		// 				<Grid2 xs={8} sm={8} md={8} lg={8} xl={8} marginBottom={2}>
		// 					<FilledSelect
		// 						label={selectDevice}
		// 						required
		// 						options={deviceOptions}
		// 						name={"selectedDevice"}
		// 						control={control}
		// 					/>
		// 				</Grid2>
		// 				<Grid2 xs={3} sm={3} md={3} lg={3} xl={3} marginLeft={2} marginTop={0.5}>
		// 					<Button
		// 						type="button"
		// 						fullWidth
		// 						variant="contained"
		// 						sx={{
		// 							backgroundColor: "#e7e9eb",
		// 							borderRadius: 1,
		// 							color: "#ea376b",
		// 						}}
		// 						onClick={onProceed}
		// 					>
		// 						{register}
		// 					</Button>
		// 				</Grid2>
		// 			</Grid2>
		// 		</Grid2>
		// 	</Grid2>
		// </Stack>
	);
};
