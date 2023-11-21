import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Button, Tab, Tabs, Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { usePreviousProps } from "@mui/utils";
import {
	useCorporateDetailsGetAPI,
	useDemographicsGetAPI,
	useFitnessDetailsGetAPI,
	usePostCorporateDetailsAPI,
	usePutCorporateDetailsAPI,
	usePutDemographicsAPI,
	usePutFitnessDetailsAPI,
	usePutSocialDetailsAPI,
	useSocialDetailsGetAPI,
	useValidateNpiAPI,
} from "api/accountCreateAPI";
import {
	CorporateAffiliation,
	DemographicDetails,
	HealthFitnessProfileDetails,
	SocialProfileDetails,
} from "components/Account";
import React from "react";

import { useAddressValidationAPI } from "api/googleAPI";
import { ProfileDetailsFormGroup } from "components/shared";
import dayjs from "dayjs";
import { useTabs } from "hooks/useTabs";
import {
	CORPORATE_AFFILIATION,
	DEMOGRAPHIC_DETAILS,
	HEALTH_AND_FITNESS_DETAILS,
	ParamsProfileType,
	SOCIAL_DETAILS,
	any,
	appLinks,
	roleTypeCA,
	roleTypes,
	uiStrings,
} from "main";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useBasicProfile } from "../../api/useBasicProfile";

let corpDetails: any, demoDetails: any, socDetails: any, fitDetails: any;
export const BasicProfile = () => {
	const theme = useTheme();
	const params = useParams<ParamsProfileType>();
	const prevProfileType = usePreviousProps(params);
	const navigate = useNavigate();
	const {
		signUp: { continueText, basicProfileNote1, proceed, back },
	} = uiStrings;

	const postCorporateMutation = usePostCorporateDetailsAPI();
	const getCorporateMutation = useCorporateDetailsGetAPI();
	const putCorporateMutation = usePutCorporateDetailsAPI();
	const putDemographicsMutation = usePutDemographicsAPI();
	const getDemographicMutation = useDemographicsGetAPI();
	const putSocialDetails = usePutSocialDetailsAPI();
	const getSocialDetailsMutation = useSocialDetailsGetAPI();
	const putFitnessDetails = usePutFitnessDetailsAPI();
	const getFitnessDetailsMutation = useFitnessDetailsGetAPI();
	const validateNpiGetAPI = useValidateNpiAPI();
	const validateAddressPostAPI = useAddressValidationAPI();

	let tabs = roleTypes;
	if (params?.profileType === "1") {
		tabs = roleTypeCA;
	}
	let { tabsLength, activeTabKey, nextTabIndex, previousTabIndex, toggleActiveTab, firstTab, lastTab } = useTabs({
		tabs,
	});
	const [completedSteps, setCompletedSteps] = React.useState<string[]>([]);
	const showBackButton = any(completedSteps) && firstTab?.value !== activeTabKey;

	// Basic Profile Parent State
	const {
		form: { getValues, setValue, register, control },
	} = useBasicProfile();

	// const [formState, setFormState] = React.useState<any>({});
	const [formState, setFormState] = React.useState({
		organizationName: "",
		npi: "",
		yearsOfCoaching: "",
		address1: "",
		address2: "",
		state: "",
		city: "",
		zipCode: "",
		country: "",
	});

	React.useEffect(() => {
		// let userData: any = window.localStorage.getItem(STORAGE_USER_INFO_KEY);
		// userData = userData ? JSON.parse(userData) : any;
		// if (userData && userData) {
		// 	if (params?.profileType === "1" && userData.registrationId === 2) activeTabKey = CORPORATE_AFFILIATION;
		// 	else if (params?.profileType === "0" && (userData.registrationId === 2 || userData.registrationId === 3)) activeTabKey = DEMOGRAPHIC_DETAILS;
		// 	else if (userData.registrationId === 4) activeTabKey = SOCIAL_DETAILS;
		// 	else if (userData.registrationId === 5) activeTabKey = HEALTH_AND_FITNESS_DETAILS;
		// 	else {
		// 		activeTabKey = tabs[0].value;
		// 	}
		// } else {
		// 	activeTabKey = tabs[0].value;
		// }
		activeTabKey = tabs[0].value;
	}, []);

	React.useEffect(() => {
		const index = tabs.findIndex((x) => x.value === activeTabKey);
		// nextTabIndex = index+ 1;
		toggleActiveTab(tabs[index]);
		if (index > 0) {
			for (let i = 0; i < index; i++) {
				if (i === 0) setCompletedSteps((ps) => [...ps, CORPORATE_AFFILIATION]);
				if (i === 1) setCompletedSteps((ps) => [...ps, DEMOGRAPHIC_DETAILS]);
				if (i === 2) setCompletedSteps((ps) => [...ps, SOCIAL_DETAILS]);
				if (i === 3) setCompletedSteps((ps) => [...ps, HEALTH_AND_FITNESS_DETAILS]);
			}
		}
		if (activeTabKey === CORPORATE_AFFILIATION) {
			// getCorporateMutation(
			// 	{},
			// 	{
			// 		onSuccess: (res) => {
			// 			corpDetails = {
			// 				organizationName: res.data.organizationName,
			// 				address1: res.data.address1,
			// 				address2: res.data.address2,
			// 				city: res.data.city,
			// 				state: res.data.state,
			// 				zip: res.data.zip,
			// 				id: res.data.id,
			// 				trackHealth: res.data.trackHealth,
			// 				npiNumber: res.data.npiNumber,
			// 				yearsOfCoaching: res.data.yearsOfCoaching,
			// 			};
			// 			setValue("corporateProfile", { ...corpDetails });
			// 		},
			// 		onError: (err) => {
			// 			console.log(err);
			// 		},
			// 	}
			// );
		}
		if (activeTabKey === DEMOGRAPHIC_DETAILS) {
			// getDemographicMutation(
			// 	{},
			// 	{
			// 		onSuccess: (res) => {
			// 			demoDetails = {
			// 				gender: res.data.gender,
			// 				dob: dayjs(new Date(res.data.dob)),
			// 				address1: res.data.address1,
			// 				address2: res.data.address2,
			// 				city: res.data.city,
			// 				state: res.data.state,
			// 				country: res.data.country,
			// 				zip: res.data.zip,
			// 				id: res.data.id,
			// 			};
			// 			setValue("demographicDetails", { ...demoDetails });
			// 		},
			// 		onError: (err) => {
			// 			console.log(err);
			// 		},
			// 	}
			// );
		}
		if (activeTabKey === SOCIAL_DETAILS) {
			// getSocialDetailsMutation(
			// 	{},
			// 	{
			// 		onSuccess: (res: any) => {
			// 			if (res) {
			// 				socDetails = {
			// 					educationLevel: res.data.educationLevel,
			// 					incomeRange: res.data.incomeRange,
			// 					healthCare: res.data.healthCare === 'true' || res.data.healthCare === true ? "Yes" : "No",
			// 					hospitalAssociated: res.data.hospitalAssociated,
			// 					id: res.data.id,
			// 				};
			// 				setValue("socialProfile", { ...socDetails });
			// 			}
			// 		},
			// 		onError: (err) => {
			// 			console.log(err);
			// 		},
			// 	}
			// );
		}
		if (activeTabKey === HEALTH_AND_FITNESS_DETAILS) {
			// getFitnessDetailsMutation(
			// 	{},
			// 	{
			// 		onSuccess: (res: any) => {
			// 			if (res) {
			// 				fitDetails = {
			// 					chronicCondition: res.data.chronicCondition,
			// 					weight: res.data.weight,
			// 					height: res.data.height,
			// 					smoker: res.data.smoker === 'true' || res.data.smoker === true ? "Yes" : "No",
			// 					id: res.data.id,
			// 				};
			// 				setValue("fitnessProfile", fitDetails);
			// 			}
			// 		},
			// 		onError: (err) => {
			// 			console.log(err);
			// 		},
			// 	}
			// );
		}
	}, [activeTabKey]);

	// On role type change reset
	// React.useEffect(() => {
	// 	if (prevProfileType.profileType !== params?.profileType) {
	// 		toggleActiveTab(firstTab);
	// 		setCompletedSteps([]);
	// 	}
	// }, [firstTab, prevProfileType.profileType, params?.profileType, toggleActiveTab]);

	const handleChange = React.useCallback(
		(_event: React.SyntheticEvent, newKey: string) => {
			toggleActiveTab(tabs.find((x) => x.value === newKey));
		},
		[tabs, toggleActiveTab]
	);

	const difference = (obj1: any, obj2: any) => {
		let keyFound: string[] = [];
		Object.keys(obj1).forEach((key) => {
			if (obj1[key] !== obj2[key]) {
				keyFound.push(key);
			}
		});
		return keyFound.length;
	};
	const onContinue = React.useCallback(() => {
		const completedStepsLength = completedSteps.length;
		if (activeTabKey !== "") {
			if (activeTabKey === CORPORATE_AFFILIATION) {
				// let corProfile = { ...getValues().corporateProfile };
				const corProfile = {
					organizationName: formState?.organizationName,
					npi: formState?.npi,
					yearsOfCoaching: formState?.yearsOfCoaching,
					address1: formState?.address1,
					address2: formState?.address2,
					state: formState?.state,
					city: formState?.city,
					zipCode: formState?.zipCode,
					country: formState?.country,
				};
				// corProfile.typeOfEngagement = "";
				// corProfile.country = "USA";
				// corProfile.trackHealth = false;
				// corProfile.address2 = corProfile.address2 ? corProfile.address2 : "";
				// corProfile.yearsOfCoaching = parseInt(corProfile.yearsOfCoaching);

				if (!corpDetails) {
					corpDetails = "";
				}

				if (corProfile?.npi) {
					validateNpiGetAPI(
						{ npi: corProfile.npi },
						{
							onSuccess: (res) => {
								console.log(res);

								if (corProfile?.address1 && res.success) {
									let address = corProfile.address1;
									if (corProfile?.address2) {
										address = address + " " + corProfile.address2;
									}

									validateAddressPostAPI(
										{ address: address },
										{
											onSuccess: (res) => {
												console.log(res);

												if (res.success) {
													if (!corpDetails.id) {
														putCorporateMutation(
															{ ...corProfile },
															{
																onSuccess: (res) => {
																	setCompletedSteps((ps) => [...ps, activeTabKey]);
																	toggleActiveTab(tabs[nextTabIndex]);
																},
																onError: (err) => {
																	console.log(err);
																},
															}
														);
													} else if (difference(corpDetails, corProfile)) {
														//put api call
														putCorporateMutation(
															{ ...corProfile },
															{
																onSuccess: (res) => {
																	setCompletedSteps((ps) => [...ps, activeTabKey]);
																	toggleActiveTab(tabs[nextTabIndex]);
																},
																onError: (err) => {
																	console.log(err);
																},
															}
														);
														setCompletedSteps((ps) => [...ps, activeTabKey]);
														toggleActiveTab(tabs[nextTabIndex]);
													} else {
														setCompletedSteps((ps) => [...ps, activeTabKey]);
														toggleActiveTab(tabs[nextTabIndex]);
													}
												}
											},
											onError: (err) => {
												console.log(err);
											},
										}
									);
								} else if (corProfile?.address1 == undefined) {
									toast.error("Address cannot be empty");
								}
							},
							onError: (err) => {
								console.log(err);
							},
						}
					);
				} else {
					toast.error("NPI cannot be empty");
					return;
				}
			}
			if (activeTabKey === DEMOGRAPHIC_DETAILS) {
				let details = { ...getValues().demographicDetails };

				if (!demoDetails) {
					demoDetails = "";
				}
				if (!demoDetails.id || difference(demoDetails, details)) {
					details.dob = new Date(dayjs(getValues().demographicDetails.dob).format("MM/DD/YYYY hh:mm:ss"));

					if (demoDetails.id) {
						details.id = demoDetails.id;
					}

					const inputDate = new Date(details.dob);
					const minDate = new Date();
					minDate.setFullYear(minDate.getFullYear() - 10); // User must be at least 10 years old

					if (inputDate > minDate) {
						toast.warn("Age must be at least 10 years old.");
					} else {
						let address = details.address1;
						if (details?.address2) {
							address = address + " " + details.address2;
						}
						address =
							address + details.city + " " + details.state + " " + details.zip + " " + details.country;
						validateAddressPostAPI(
							{ address: address },
							{
								onSuccess: (res) => {
									console.log(res);

									if (res.success) {
										putDemographicsMutation(
											{ ...details },
											{
												onSuccess: (res) => {
													setCompletedSteps((ps) => [...ps, activeTabKey]);
													toggleActiveTab(tabs[nextTabIndex]);
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
				} else {
					setCompletedSteps((ps) => [...ps, activeTabKey]);
					toggleActiveTab(tabs[nextTabIndex]);
				}
			}
			if (activeTabKey === SOCIAL_DETAILS) {
				let details = { ...getValues().socialProfile };

				if (!socDetails) {
					socDetails = "";
				}
				if (!socDetails.id || difference(socDetails, details)) {
					details.healthCare = ["Yes", "yes", "True", "true"].includes(
						details.healthCare.toString().toLowerCase()
					)
						? true
						: false;
					if (socDetails.id) {
						details.id = socDetails.id;
					}
					putSocialDetails(
						{ ...details },
						{
							onSuccess: (res) => {
								setCompletedSteps((ps) => [...ps, activeTabKey]);
								toggleActiveTab(tabs[nextTabIndex]);
							},
							onError: (err) => {
								console.log(err);
							},
						}
					);
				} else {
					setCompletedSteps((ps) => [...ps, activeTabKey]);
					toggleActiveTab(tabs[nextTabIndex]);
				}
			}
			if (activeTabKey === HEALTH_AND_FITNESS_DETAILS) {
				let details = { ...getValues().fitnessProfile };

				if (!fitDetails) {
					fitDetails = "";
				}
				if (!fitDetails.id || difference(fitDetails, details)) {
					if (fitDetails.id) {
						details.id = fitDetails.id;
					}
					details.smoker = ["Yes", "yes"].includes(details.smoker.toString().toLowerCase()) ? true : false;
					putFitnessDetails(
						{ ...details },
						{
							onSuccess: (res) => {
								if (res !== "") {
									navigate(`../../${appLinks.deviceRegistration}`, {
										replace: true,
									});
								}
							},
							onError: (err) => {
								console.log(err);
							},
						}
					);
				} else {
					navigate(`../../${appLinks.deviceRegistration}`, {
						replace: true,
					});
				}
			}
		}
	}, [activeTabKey, completedSteps, navigate, nextTabIndex, tabs, tabsLength, toggleActiveTab]);

	const onBack = () => {
		toggleActiveTab(tabs[previousTabIndex]);
	};

	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	if (!isMobile) {
		return (
			<ProfileDetailsFormGroup
				formContent={
					<>
						<Grid2 xs={12} sm={12} md={12} lg={12} xl={12}>
							<Box sx={{ width: "100%", height: "40px" }}>
								{activeTabKey !== "" && tabs.some((x) => x.value === activeTabKey) && (
									<Tabs
										variant="scrollable"
										value={activeTabKey}
										onChange={handleChange}
										textColor="primary"
										TabIndicatorProps={{
											sx: {
												backgroundColor: "transparent",
											},
										}}
										scrollButtons={false}
									>
										{tabs.map(
											(
												x: {
													value: React.Key | null | undefined;
													label:
														| string
														| number
														| boolean
														| React.ReactElement<
																any,
																string | React.JSXElementConstructor<any>
														  >
														| Iterable<React.ReactNode>
														| React.ReactPortal
														| null
														| undefined;
												},
												i: number
											) => {
												const isLast = tabsLength - 1 === i;
												const previous = i >= 1 ? tabs[i - 1].value : undefined;

												return (
													<Tab
														key={x.value}
														value={x.value}
														label={x.label}
														icon={
															isLast ? undefined : (
																<ArrowForwardIosIcon sx={{ fontSize: "1rem" }} />
															)
														}
														iconPosition="end"
														sx={{
															color: completedSteps.includes((x as any).value)
																? theme.palette.success.main
																: undefined,
															padding: i === 0 ? 0 : "0 0 0 ",
														}}
														disabled={previous ? !completedSteps.includes(previous) : false}
														disableRipple={true}
													/>
												);
											}
										)}
									</Tabs>
								)}
							</Box>
						</Grid2>

						<Grid2 width="100%">
							{activeTabKey === CORPORATE_AFFILIATION && (
								<CorporateAffiliation
									control={control}
									register={register}
									formState={formState}
									setFormState={setFormState}
								/>
							)}
							{activeTabKey === DEMOGRAPHIC_DETAILS && <DemographicDetails control={control} />}
							{activeTabKey === SOCIAL_DETAILS && <SocialProfileDetails control={control} />}
							{activeTabKey === HEALTH_AND_FITNESS_DETAILS && (
								<HealthFitnessProfileDetails control={control} />
							)}
							<Typography variant="body2" fontWeight={500} color="text.secondary" marginTop={1}>
								{basicProfileNote1}
							</Typography>
						</Grid2>
						<Grid2
							width="100%"
							display="flex"
							marginTop={3}
							justifyContent={showBackButton ? "space-between" : "end"}
						>
							{showBackButton && (
								<Button
									type="button"
									sx={{
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
									}}
									variant="contained"
									onClick={onBack}
								>
									{back}
								</Button>
							)}
							<Button type="button" variant="contained" onClick={onContinue}>
								{activeTabKey === lastTab?.value ? proceed : continueText}
							</Button>
						</Grid2>
					</>
				}
			/>
		);
	}
	return (
		<ProfileDetailsFormGroup
			formContent={
				<>
					<div className="qwert">
						<Box>
							{activeTabKey !== "" && tabs.some((x) => x.value === activeTabKey) && (
								<Tabs
									variant="scrollable"
									value={activeTabKey}
									onChange={handleChange}
									textColor="primary"
									TabIndicatorProps={{
										sx: {
											width: "120%",
											backgroundColor: "transparent",
										},
									}}
									scrollButtons={false}
								>
									{tabs.map(
										(
											x: {
												value: React.Key | null | undefined;
												label:
													| string
													| number
													| boolean
													| React.ReactElement<any, string | React.JSXElementConstructor<any>>
													| Iterable<React.ReactNode>
													| React.ReactPortal
													| null
													| undefined;
											},
											i: number
										) => {
											const isLast = tabsLength - 1 === i;
											const previous = i >= 1 ? tabs[i - 1].value : undefined;

											return (
												<Tab
													key={x.value}
													value={x.value}
													label={x.label}
													icon={
														isLast ? undefined : (
															<ArrowForwardIosIcon sx={{ fontSize: "1rem" }} />
														)
													}
													iconPosition="end"
													sx={{
														color: completedSteps.includes((x as any).value)
															? theme.palette.success.main
															: undefined,
														padding: i === 0 ? 0 : "0 0 0 ",
													}}
													disabled={previous ? !completedSteps.includes(previous) : false}
													disableRipple={true}
												/>
											);
										}
									)}
								</Tabs>
							)}
						</Box>
					</div>

					<Grid2 width="120%">
						{activeTabKey === CORPORATE_AFFILIATION && (
							<CorporateAffiliation
								control={control}
								register={register}
								formState={formState}
								setFormState={setFormState}
							/>
						)}
						{activeTabKey === DEMOGRAPHIC_DETAILS && <DemographicDetails control={control} />}
						{activeTabKey === SOCIAL_DETAILS && <SocialProfileDetails control={control} />}
						{activeTabKey === HEALTH_AND_FITNESS_DETAILS && (
							<HealthFitnessProfileDetails control={control} />
						)}
						<Typography variant="body2" fontWeight={500} color="text.secondary" marginTop={1}>
							{/* {basicProfileNote1} */}
						</Typography>
					</Grid2>
					<Grid2
						width="120%"
						display="flex"
						marginTop={3}
						justifyContent={showBackButton ? "space-between" : "end"}
					>
						{showBackButton && (
							<Button
								type="button"
								sx={{
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
								}}
								variant="contained"
								onClick={onBack}
							>
								{back}
							</Button>
						)}
						<Button type="button" variant="contained" onClick={onContinue}>
							{activeTabKey === lastTab?.value ? proceed : continueText}
						</Button>
					</Grid2>
				</>
			}
		/>
	);
};
