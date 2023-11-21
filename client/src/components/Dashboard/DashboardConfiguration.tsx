import { AddCircleOutlineOutlined, CancelOutlined, KeyboardArrowUp } from "@mui/icons-material";
import {
	Box,
	Button,
	Divider,
	Grid,
	IconButton,
	MenuItem,
	Select,
	Stack,
	Typography,
	styled,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import {
	useGetDashboardConfigAPI,
	useGetUserDashboardConfigAPI,
	useGetUserDashboardPreferenceAPI,
	useGetUserTeamPreferenceAPI,
	usePostDashboardConfigAPI,
	usePostDashboardPreferenceAPI,
	usePostTeamPreferenceAPI,
} from "api/accountCreateAPI";
import { useGetUserDevicesAPI } from "api/useDeviceLogin";
import { TabPanel } from "components/shared/TabPanel";
import { TivraScrollContainer } from "components/shared/TivraScrollContainer";
import { ITivraTab, TivraTabs, TivraTabsss } from "components/shared/TivraTabs";
import { STORAGE_ICON_KEY, STORAGE_USER_INFO_KEY } from "main";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../../css/DashboardConfig.css";
import { Header } from "./Header";

const Item = styled(Box)(({ theme }) => ({
	backgroundColor: "#F5F5F5",
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	minWidth: "120px",
	height: "50px",
	borderRadius: "8px",
}));

const getImgUrl = (name: string) => {
	const path = name.replace(/\W+/g, "-").toLowerCase();
	return new URL(`../../assets/icons/devices/${path}.png`, import.meta.url).href;
};
const tabs: ITivraTab[] = [
	{ key: "health", label: "Health" },
	{ key: "fitness", label: "Fitness" },
	{ key: "nutrition", label: "Nutrition" },
];

// const getImgUrl = (name: string) => {
// 	return new URL(`../../assets/icons/devices/${name}.svg`, import.meta.url).href;
// };

const getBlackSvgIconUrl = (name: string) => {
	return new URL(`../../assets/icons/black/${name}.svg`, import.meta.url).href;
};

const getPreferencesSvgIconUrl = (name: string) => {
	return new URL(`../../assets/icons/${name}.svg`, import.meta.url).href;
};

const metric = window.localStorage.getItem(STORAGE_ICON_KEY);
const metricIcons = JSON.parse(String(metric));

export const ActiveDevices = ({ activeDevices }: any) => {
	return (
		<Box>
			<Header title="Active Devices" />
			<Box padding="20px" sx={{ backgroundColor: "#fff", borderRadius: "8px" }}>
				<TivraScrollContainer spacing={true}>
					{activeDevices?.map((x: any) => {
						return (
							<Item key={x.deviceMake}>
								{/* <Typography
									sx={{
										color: "#000000",
										fontSize: "16px",
										fontWeight: 500,
										lineHeight: "19px",
										textAlign: "center",
									}}
								>
									{x.deviceMake}
								</Typography> */}
								{/* <img width="100%" height="100%" src={getImgUrl(x?.name)} alt={x.deviceMake} /> */}
								{(metricIcons as any[]).map((metricIcon) => {
									if (metricIcon.image_name == x?.deviceMake) {
										return (
											<img
												key={metricIcon._id}
												width="100%"
												height="100%"
												src={metricIcon.image_data}
												alt={x.deviceMake}
											/>
										);
									}
								})}
							</Item>
						);
					})}
				</TivraScrollContainer>
			</Box>
		</Box>
	);
};

export const DeviceConfigHealthFitnessGrid = ({
	items,
	activeDevices,
	onChangeDev,
}: {
	items: any;
	activeDevices: any[];
	onChangeDev: (id: any, value: any) => void;
}) => {
	const onChangeDevice = (id: any) => (e: any) => {
		onChangeDev(id, e.target.value);
	};
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	if (!isMobile) {
		return (
			<Grid container rowSpacing={2} columnSpacing={2}>
				{items?.map((x: any) => {
					return (
						<Grid item xs={12} sm={6} xl={3} lg={4} key={x.item}>
							<Box
								display="flex"
								alignItems="center"
								padding="15px"
								sx={{
									backgroundColor: "#FFF",
									color: "#000000",
									fontSize: "16px",
									fontWeight: 500,
									lineHeight: "19px",
									textAlign: "center",
									borderRadius: "8px",
								}}
							>
								<Box display="flex" flexDirection="row" alignItems="center" gap={1}>
									{(metricIcons as any[]).map((metricIcon) => {
										if (metricIcon.image_name == x.icon) {
											return (
												<img
													key={metricIcon._id}
													width="32"
													height="32"
													src={metricIcon.image_data}
													alt={x.label}
												/>
											);
										}
									})}
									<Typography
										sx={{
											color: "#000000",
											fontSize: "16px",
											fontWeight: 500,
											lineHeight: "19px",
											textAlign: "center",
										}}
									>
										{x.item}
									</Typography>
								</Box>
								<Box marginLeft="auto">
									{/* <Controller
								render={({ field }) => ( */}
									<Select
										IconComponent={(props: any) => <KeyboardArrowUp {...props} />}
										placeholder="Select Device"
										size="small"
										sx={(theme) => ({
											borderRadius: "8px",
											color: "#000",
											border: "none",
											backgroundColor: "#F5F5F5",
											"& .MuiSvgIcon-root": {
												color: "#000000",
												marginRight: "0px",
											},
											"& fieldset": { border: "none" },
											minWidth: "150px",
											minHeight: "60px",
										})}
										onChange={onChangeDevice(x)}
										value={x.user_device_id}
									>
										{activeDevices?.map((y: any) => {
											return (
												<MenuItem key={y.deviceMake} value={y.deviceMake || ""}>
													{/* <Typography lineHeight="14px" fontSize="12px">
													{y.deviceMake}
												</Typography> */}
													{/* <img height="30px" src={getImgUrl(y?.deviceMake)} alt={x.id} /> */}
													{(metricIcons as any[]).map((metricIcon) => {
														if (metricIcon.image_name == y?.deviceMake) {
															return (
																<img
																	key={metricIcon._id}
																	height="30px"
																	width={90}
																	src={metricIcon.image_data}
																	alt={x.item}
																/>
															);
														}
													})}
												</MenuItem>
											);
										})}
									</Select>
									{/* )}
								name="x.user_device_id"
								control={control}
							/> */}
								</Box>
							</Box>
						</Grid>
					);
				})}
			</Grid>
		);
	}
	return (
		<Grid container marginTop={1} rowSpacing={2} columnSpacing={2} className="rajnikanda" marginLeft={-2}>
			{items?.map((x: any) => {
				return (
					<Grid item xs={12} sm={12} key={x.item}>
						<Box
							display="flex"
							alignItems="center"
							padding="8px"
							sx={{
								backgroundColor: "#FFF",
								color: "#000000",
								fontSize: "16px",
								fontWeight: 500,
								lineHeight: "19px",
								textAlign: "center",
								borderRadius: "8px",
							}}
						>
							<Box display="flex" flexDirection="row" alignItems="center" gap={1}>
								{/* <img width="32" height="32" src={getBlackSvgIconUrl("Iconheart")} alt={x.label} /> */}
								{(metricIcons as any[]).map((metricIcon) => {
									if (metricIcon.image_name == x.icon) {
										return (
											<img
												key={metricIcon._id}
												width="32"
												height="32"
												src={metricIcon.image_data}
												alt={x.item}
											/>
										);
									}
								})}
								<Typography
									sx={{
										color: "#000000",
										fontSize: "16px",
										fontWeight: 500,
										lineHeight: "19px",
										textAlign: "left",
									}}
								>
									{x.item}
								</Typography>
							</Box>
							<Box marginLeft="auto">
								{/* <Controller
								render={({ field }) => ( */}
								<Select
									IconComponent={(props: any) => <KeyboardArrowUp {...props} />}
									placeholder="Select Device"
									size="small"
									sx={(theme) => ({
										borderRadius: "8px",
										color: "#000",
										border: "none",
										backgroundColor: "#F5F5F5",
										"& .MuiSvgIcon-root": {
											color: "#000000",
											marginRight: "0px",
										},
										"& fieldset": { border: "none" },
										minWidth: "150px",
										minHeight: "60px",
									})}
									onChange={onChangeDevice(x.item)}
									value={x.user_device_id}
								>
									{activeDevices?.map((y: any) => {
										return (
											<MenuItem key={y.deviceMake} value={y.deviceMake || ""}>
												{/* <Typography lineHeight="14px" fontSize="12px">
													{y.deviceMake}
												</Typography> */}
												{/* <img height="30px" src={getImgUrl(y?.deviceMake)} alt={x.id} /> */}
												{(metricIcons as any[]).map((metricIcon) => {
													if (metricIcon.image_name == y?.deviceMake) {
														return (
															<img
																key={metricIcon._id}
																height="30px"
																width={90}
																src={metricIcon.image_data}
																alt={x.item}
															/>
														);
													}
												})}
											</MenuItem>
										);
									})}
								</Select>
								{/* )}
								name="x.user_device_id"
								control={control}
							/> */}
							</Box>
						</Box>
					</Grid>
				);
			})}
		</Grid>
	);
};
export const DeviceConfigHealthFitness = ({
	items,
	activeDevices,
	onChangeDev,
}: {
	items: any;
	activeDevices: any;
	onChangeDev: (id: any, value: any) => void;
}) => {
	const [value, setValue] = useState(0);

	const onTabChange = (newValue: number) => {
		setValue(newValue);
	};
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	if (!isMobile) {
		return (
			<Box>
				<TivraTabs value={value} onTabChange={onTabChange} items={tabs} />
				<TabPanel value={value} index={0}>
					<DeviceConfigHealthFitnessGrid
						items={items?.filter((item: any) => item.category === "health")}
						activeDevices={activeDevices}
						onChangeDev={onChangeDev}
					/>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<DeviceConfigHealthFitnessGrid
						items={items?.filter((item: any) => item.category === "fitness")}
						activeDevices={activeDevices}
						onChangeDev={onChangeDev}
					/>
				</TabPanel>
				<TabPanel value={value} index={2}>
					<DeviceConfigHealthFitnessGrid
						items={items?.filter((item: any) => item.category === "nutrition")}
						activeDevices={activeDevices}
						onChangeDev={onChangeDev}
					/>
				</TabPanel>
			</Box>
		);
	}
	return (
		<Box>
			<TivraTabsss value={value} onTabChange={onTabChange} items={tabs} />
			<TabPanel value={value} index={0}>
				<DeviceConfigHealthFitnessGrid
					items={items?.filter((item: any) => item.category === "health")}
					activeDevices={activeDevices}
					onChangeDev={onChangeDev}
				/>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<DeviceConfigHealthFitnessGrid
					items={items?.filter((item: any) => item.category === "fitness")}
					activeDevices={activeDevices}
					onChangeDev={onChangeDev}
				/>
			</TabPanel>
			<TabPanel value={value} index={2}>
				<DeviceConfigHealthFitnessGrid
					items={items?.filter((item: any) => item.category === "nutrition")}
					activeDevices={activeDevices}
					onChangeDev={onChangeDev}
				/>
			</TabPanel>
		</Box>
	);
};

export const PreferenceItem = ({ onRemove, onAdd, item, allowEdit, type }: any) => {
	const onBtnClick = useCallback(() => {
		if (allowEdit) {
			if (type === "remove") {
				onRemove(item.item);
			} else if (type === "add") {
				onAdd(item.item);
			}
		}
	}, [type, allowEdit, item?.item]);

	return (
		<Box
			sx={{ backgroundColor: "#F5F5F5" }}
			minWidth="220px"
			height="90px"
			display="flex"
			flexDirection="row"
			alignItems="center"
			padding="16px"
			position="relative"
			justifyContent="space-between"
			borderRadius="8px"
			onClick={onBtnClick}
		>
			{/* <img
				width="62px"
				height="62px"
				src={getPreferencesSvgIconUrl(item?.icon)}
				alt={item?.item}
				style={{ flex: 0 }}
			/> */}
			{(metricIcons as any[]).map((metricIcon) => {
				if (metricIcon.image_name == item.icon) {
					return (
						<img
							key={metricIcon._id}
							width="62px"
							height="62px"
							src={metricIcon.image_data}
							alt={item?.item}
							style={{ flex: 0 }}
						/>
					);
				}
			})}
			<Divider flexItem variant="fullWidth" orientation="vertical" sx={{ borderWidth: "1px" }} />
			<Typography
				sx={(t) => ({
					flex: "0 0 90px",
					textAlign: "center",
					fontSize: "14px",
					lineHeight: "17px",
					fontWeight: 400,
					color: t.palette.primary.main,
				})}
			>
				{item?.item}
			</Typography>
			{allowEdit && (
				<IconButton
					disableRipple
					aria-label="delete"
					sx={{ position: "absolute", top: "-18px", right: "-18px", zIndex: 1 }}
				>
					{type === "remove" ? (
						<CancelOutlined
							sx={(t) => ({
								color: t.palette.secondary.main,
							})}
						/>
					) : (
						<AddCircleOutlineOutlined
							sx={(t) => ({
								color: t.palette.success.main,
							})}
						/>
					)}
				</IconButton>
			)}
		</Box>
	);
};

export const PreferencesList = ({ items, open, onAddOrRemove, type }: any) => {
	return (
		<TivraScrollContainer spacing={true}>
			{items?.map((x: any) => {
				return (
					<PreferenceItem
						key={x?.item}
						item={x}
						allowEdit={open}
						type={type}
						onRemove={onAddOrRemove("remove")}
						onAdd={onAddOrRemove("add")}
					/>
				);
			})}
		</TivraScrollContainer>
	);
};

export const Preferences = ({
	type,
	activePreferences,
	preferences,
	savePreferences,
}: {
	type: "Team" | "Dashboard";
	activePreferences: any;
	preferences: any;
	savePreferences: (prefs: any) => void;
}) => {
	const [open, toggleOpen] = useState(false);
	const [dashboardItems, setDashboardItems] = useState<any[]>([]);
	const [preferenceList, setPreferencesList] = useState<any[]>([]);
	useEffect(() => {
		if (activePreferences?.length > 0 && !dashboardItems.length) {
			setDashboardItems([...activePreferences]);
		}
	}, [activePreferences?.length]);
	useEffect(() => {
		if (preferences?.length > 0 && !preferenceList.length) {
			setPreferencesList([...preferences]);
		}
	}, [preferences?.length]);

	const onAddOrRemove = (type: "add" | "remove") => (key: string) => {
		if (type === "add") {
			const result = preferenceList?.find((x: any) => x?.item === key);
			if (result?.item) {
				setDashboardItems((ps) => [...ps, result]);
				preferenceList.splice(
					preferenceList?.findIndex((x: any) => x.item === result?.item),
					1
				);
				setPreferencesList([...preferenceList]);
			}
		} else if (type === "remove") {
			const result = dashboardItems?.find((x: any) => x?.item === key);
			if (result?.item) {
				setPreferencesList((ps) => [...ps, result]);
				dashboardItems.splice(
					dashboardItems?.findIndex((x: any) => x.item === result?.item),
					1
				);
				setDashboardItems([...dashboardItems]);
			}
		}
	};
	const onSave = useCallback(() => {
		savePreferences(dashboardItems);
		toast.success(`${type.toString()} preferences updated successfully.`);
		toggleOpen(false);
	}, [type, dashboardItems]);

	const onBtnClick = useCallback(() => {
		if (open) {
			onSave();
		} else {
			toggleOpen(true);
		}
	}, [onSave, open]);

	const title = `My ${type.toString()} Preferences`;

	return (
		<Box>
			<Header title={title} />
			<Box
				padding="20px"
				sx={{
					backgroundColor: "#FFF",
					borderRadius: "8px",
					display: "flex",
					flexDirection: "column",
				}}
				gap={3}
			>
				<Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" gap={2}>
					<PreferencesList items={dashboardItems} open={open} onAddOrRemove={onAddOrRemove} type="remove" />
					<Button
						disableRipple
						onClick={onBtnClick}
						sx={(theme) => ({
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
							padding: 1,
						})}
					>
						{open ? "Save" : "Edit"}
					</Button>
				</Box>
				{open && preferences.length && (
					<>
						<Divider />
						<PreferencesList items={preferenceList} open={open} type="add" onAddOrRemove={onAddOrRemove} />
					</>
				)}
			</Box>
		</Box>
	);
};

export const DashboardConfiguration = () => {
	const [configurations, setConfig] = useState<any[]>([]);
	const [activePreferences, setActivePreferences] = useState<any[]>([]);
	const [teamPreferences, setTeamPreferences] = useState<any[]>([]);
	const [displayPreferences, setDisplayPreferences] = useState<any[]>([]);
	const [displayTeamPreferences, setDisplayTeamPreferences] = useState<any[]>([]);
	const useGetUserDevices = useGetUserDevicesAPI();
	const useDashboardConfig: any = useGetDashboardConfigAPI();
	const useDashboardPreference: any = useGetUserDashboardPreferenceAPI();
	const useTeamPreference: any = useGetUserTeamPreferenceAPI();
	const useUserDashboardConfig: any = useGetUserDashboardConfigAPI();
	const postDashboardConfigMutation = usePostDashboardConfigAPI();
	const useUpdateDashboardPreferenceMutation = usePostDashboardPreferenceAPI();
	const useUpdateTeamPreferenceMutation = usePostTeamPreferenceAPI();
	let userData: any = window.localStorage.getItem(STORAGE_USER_INFO_KEY);
	userData = userData ? JSON.parse(userData) : {};

	let activeDevices: any = useGetUserDevices?.data;
	activeDevices = activeDevices?.filter((dev: any) => dev.active);

	useEffect(() => {
		if (useUserDashboardConfig?.data) {
			const dashboardConfig = useUserDashboardConfig?.data;

			setConfig(dashboardConfig);
		}
	}, [useUserDashboardConfig?.data, useDashboardConfig?.data]);

	useEffect(() => {
		if (useDashboardPreference?.data?.preference) {
			const preferences = useDashboardPreference?.data.preference
				.filter((item: { isPreferred: boolean; active: boolean }) => !item.isPreferred && item.active)
				.map((item: any) => item);

			const active = useDashboardPreference?.data.preference
				.filter((item: { isPreferred: boolean; active: boolean }) => item.active && item.isPreferred)
				.map((item: any) => item);

			setActivePreferences(active);
			setDisplayPreferences(preferences);
		}
	}, [useDashboardPreference?.data, useDashboardConfig?.data]);

	useEffect(() => {
		if (useTeamPreference?.data?.preference) {
			const preferences = useTeamPreference?.data.preference
				.filter((item: { isPreferred: boolean; active: boolean }) => !item.isPreferred && item.active)
				.map((item: any) => item);

			const active = useTeamPreference?.data.preference
				.filter((item: { isPreferred: boolean; active: boolean }) => item.active && item.isPreferred)
				.map((item: any) => item);

			setTeamPreferences([...active]);
			setDisplayTeamPreferences([...preferences]);
		}
	}, [useTeamPreference?.data, useDashboardConfig?.data]);

	const onChangeDev = (obj: any, value: any) => {
		const configDataArr = [
			{
				category: obj.category,
				label: obj.label,
				icon: obj.icon,
				item: obj.item,
				user_device_id: value,
			},
		];
		const formData = {
			userId: userData.userId,
			configData: configDataArr,
		};
		postDashboardConfigMutation(formData, {
			onSuccess: (res: any) => {
				useUserDashboardConfig?.refetch();
			},
			onError: (err: any) => {
				console.log(err);
			},
		});
	};

	const userDashboardPreferenceSaveOrDelete = (preferences: any) => {
		let addResult = [];
		let removeResult = [];
		if (activePreferences?.length > 0) {
			addResult = preferences.filter((o1: any) => !activePreferences.some((o2) => o1.item === o2.item));
			removeResult = activePreferences.filter((o1: any) => !preferences.some((o2: any) => o1.item === o2.item));
		} else {
			addResult = preferences;
		}
		if (addResult.length > 0) {
			let preferenceArr: any[] = [];
			addResult.forEach((item: any) => {
				preferenceArr.push({
					active: item.active,
					icon: item.icon,
					isPreferred: item.isPreferred ? false : true,
					item: item.item,
					label: item.label,
				});
			});
			const formData = {
				userId: userData.userId,
				preference: preferenceArr,
			};
			useUpdateDashboardPreferenceMutation(formData, {
				onSuccess: (res: any) => {
					useDashboardPreference?.refetch();
					useDashboardConfig?.refetch();
				},
				onError: (err: any) => {
					console.log(err);
				},
			});
		}

		if (removeResult.length > 0) {
			let preferenceArr: any[] = [];
			removeResult.forEach((item: any) => {
				preferenceArr.push({
					active: item.active,
					icon: item.icon,
					isPreferred: item.isPreferred ? false : true,
					item: item.item,
					label: item.label,
				});
			});
			const formData = {
				userId: userData.userId,
				preference: preferenceArr,
			};
			useUpdateDashboardPreferenceMutation(formData, {
				onSuccess: (res: any) => {
					useDashboardPreference?.refetch();
				},
				onError: (err: any) => {
					console.log(err);
				},
			});
		}
	};

	const teamPreferenceSaveOrDelete = (preferences: any) => {
		let addResult = [];
		let removeResult = [];
		if (teamPreferences?.length > 0) {
			addResult = preferences.filter((o1: any) => !teamPreferences.some((o2) => o1.item === o2.item));
			removeResult = teamPreferences.filter((o1: any) => !preferences.some((o2: any) => o1.item === o2.item));
		} else {
			addResult = preferences;
		}
		if (addResult.length > 0) {
			let preferenceArr: any[] = [];
			addResult.forEach((item: any) => {
				preferenceArr.push({
					active: item.active,
					icon: item.icon,
					isPreferred: item.isPreferred ? false : true,
					item: item.item,
					label: item.label,
				});
			});
			const formData = {
				userId: userData.userId,
				preference: preferenceArr,
			};
			useUpdateTeamPreferenceMutation(formData, {
				onSuccess: (res: any) => {
					useTeamPreference?.refetch();
				},
				onError: (err: any) => {
					console.log(err);
				},
			});
		}

		if (removeResult.length > 0) {
			let preferenceArr: any[] = [];
			removeResult.forEach((item: any) => {
				preferenceArr.push({
					active: item.active,
					icon: item.icon,
					isPreferred: item.isPreferred ? false : true,
					item: item.item,
					label: item.label,
				});
			});
			const formData = {
				userId: userData.userId,
				preference: preferenceArr,
			};
			useUpdateTeamPreferenceMutation(formData, {
				onSuccess: (res: any) => {
					useTeamPreference?.refetch();
				},
				onError: (err: any) => {
					console.log(err);
				},
			});
		}
	};

	return (
		<Stack gap={3}>
			<ActiveDevices activeDevices={activeDevices} />
			<DeviceConfigHealthFitness activeDevices={activeDevices} items={configurations} onChangeDev={onChangeDev} />
			<Preferences
				type="Dashboard"
				activePreferences={activePreferences}
				preferences={displayPreferences}
				savePreferences={userDashboardPreferenceSaveOrDelete}
			/>
			<Preferences
				type="Team"
				activePreferences={teamPreferences}
				preferences={displayTeamPreferences}
				savePreferences={teamPreferenceSaveOrDelete}
			/>
		</Stack>
	);
};
