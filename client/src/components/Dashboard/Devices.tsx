import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	IconButton,
	Menu,
	MenuItem,
	Select,
	Stack,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";

import { AddCircleOutlineOutlined, CancelOutlined, Delete, MoreVert } from "@mui/icons-material";
import {
	useDeviceSessionConnectionAPI,
	useDeviceUserDeleteAPI,
	useUserDevicePutAPI,
	useGetDevicesAPI,
	useGetUserDevicesAPI,
	useRegisterUserDeviceAPI,
} from "api/useDeviceLogin";
import { useBoolean } from "hooks/useBoolean";
import { STORAGE_ICON_KEY, STORAGE_USER_INFO_KEY } from "main";
import { uiStrings } from "main/uiStrings";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "../../css/LoginStyle.css";
import { Header } from "./Header";

const getImgUrl = (name: string) => {
	const path = name.replace(/\W+/g, "-").toLowerCase();
	return new URL(`../../assets/icons/devices/${path}.png`, import.meta.url).href;
};

const user = window.localStorage.getItem(STORAGE_USER_INFO_KEY);
const userInfo = user != "undefined" && user != null ? JSON.parse(String(user)) : undefined;

export const AddDevices = ({
	deviceOptions,
	onRegisterDevice,
}: {
	deviceOptions: any[];
	onRegisterDevice: (resource: any, type: any) => void;
}) => {
	const theme = useTheme();
	const {
		signUp: { register, selectDevice },
	} = uiStrings;
	const [selectedDevice, setSelectedDevice] = useState("");

	const onRegister = () => {
		if (selectedDevice) {
			onRegisterDevice(selectedDevice, false);
		}
	};

	const onChangeDevice = (e: any) => {
		setSelectedDevice(e.target.value);
	};

	const metric = window.localStorage.getItem(STORAGE_ICON_KEY);
	const metricIcons = JSON.parse(String(metric));

	return (
		<Box>
			<Header title="Add Devices" />
			<Box padding="20px" display="flex" borderRadius="8px" flexDirection="row" sx={{ backgroundColor: "#fff" }}>
				<Select
					placeholder={selectDevice}
					size="small"
					sx={(theme) => ({
						borderRadius: "8px",
						color: "#fff",
						border: "1px solid #DFDFDF",
						backgroundColor: "#EFEFF5",
						"& .MuiSvgIcon-root": {
							color: "#000000",
						},
						"& fieldset": { border: "none" },
						minWidth: "226px",
						minHeight: "46px",
					})}
					onChange={onChangeDevice}
					value={selectedDevice}
				>
					{deviceOptions.map((x) => {
						return (
							<MenuItem key={x.deviceMake} value={x.value} sx={{ padding: "12px" }}>
								{(metricIcons as any[]).map((metricIcon) => {
									if (metricIcon.image_name == x.id) {
										return <img height="24px" src={metricIcon.image_data} alt={x.id} />;
									}
								})}
							</MenuItem>
						);
					})}
				</Select>
				<Button
					disabled={false}
					type="button"
					sx={{
						color: theme.palette.secondary.main,
						backgroundColor: theme.palette.background.default,
						"&:hover": {
							boxShadow: "none",
							backgroundColor: theme.palette.background.default,
						},
						"&:focus": {
							backgroundColor: theme.palette.background.default,
						},
						"&:active": {
							backgroundColor: theme.palette.background.default,
						},
						marginLeft: 3,
						fontSize: "16px",
						lineHeight: "20px",
						fontWeight: 500,
						width: "100px",
						boxShadow: "none",
					}}
					variant="contained"
					onClick={onRegister}
				>
					{register}
				</Button>
			</Box>
		</Box>
	);
};

export const DevicesListItem = ({ item, onClick, allowEdit, onDelete }: any) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [dialogOpen, openDialog, closeDialog] = useBoolean();

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleOpenDialog = () => {
		setAnchorEl(null);
		openDialog();
	};

	const handleDialogClose = () => {
		closeDialog();
	};

	const handleDelete = () => {
		onDelete();
		closeDialog();
	};

	const icon = (item: any) =>
		item.active ? (
			<CancelOutlined
				className="abcd"
				sx={(t) => ({
					color: t.palette.secondary.main,
				})}
			/>
		) : (
			<AddCircleOutlineOutlined
				className="abcd"
				sx={(t) => ({
					color: t.palette.success.main,
				})}
			/>
		);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const metric = window.localStorage.getItem(STORAGE_ICON_KEY);
	const metricIcons = JSON.parse(String(metric));

	return (
		<>
			<Box
				maxWidth="220px"
				height="80px"
				padding="24px"
				key={item.deviceMake}
				border={item.active ? "2px solid #15AD64" : "none"}
				borderRadius="5px"
				sx={{
					backgroundColor: "#F5F5F5",
					"@media (max-width: 768px)": {
						// Adjust the width for smaller screens
						height: "52px",
						padding: "13px",
					},
				}}
				position="relative"
				onClick={onClick}
				alignItems="center"
				justifyContent="center"
			>
				{(metricIcons as any[]).map((metricIcon) => {
					// const name = item.name.replace(/\W+/g, "-").toLowerCase();
					if (metricIcon.image_name == item.deviceMake) {
						return (
							<img
								width="100%"
								height="100%"
								src={metricIcon.image_data}
								alt={item.deviceMake}
								style={{ flex: 0 }}
							/>
						);
					}
				})}
				{allowEdit ? (
					<IconButton
						disableRipple
						onClick={onClick}
						sx={{ position: "absolute", top: "-5px", right: "-5px", zIndex: 1 }}
					>
						{icon(item)}
					</IconButton>
				) : (
					<>
						<IconButton
							id="more-button"
							disableRipple
							onClick={handleClick}
							sx={{
								position: "absolute",
								top: "-5px",
								right: "-5px",
								zIndex: 1,
							}}
						>
							<MoreVert className="abcd" />
						</IconButton>
						<Menu
							MenuListProps={{
								"aria-labelledby": "more-button",
							}}
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
						>
							<MenuItem
								onClick={handleOpenDialog}
								sx={(t) => ({ color: t.palette.secondary.main, fontSize: "small" })}
							>
								<Delete sx={(t) => ({ color: t.palette.secondary.main })} /> Delete
							</MenuItem>
						</Menu>
					</>
				)}
			</Box>
			<Dialog open={dialogOpen} onClose={handleDialogClose}>
				<DialogTitle
					color="#000000"
					fontSize="20px"
					lineHeight="24px"
					fontWeight={600}
					sx={{ paddingTop: "24px" }}
				>
					Remove Device?
				</DialogTitle>
				<DialogContent>
					<DialogContentText
						color="#000000"
						fontSize="16px"
						lineHeight="19px"
						fontWeight={400}
						sx={{ whiteSpace: "pre-wrap" }}
					>
						{`This will permanently remove "${item.deviceMake}" from your list and you will not receive any data to Tivra health from this device any more. \nWould you like to remove?`}
					</DialogContentText>
				</DialogContent>
				<DialogActions sx={{ paddingX: "30px", paddingBottom: "24px" }}>
					<Button
						onClick={handleDialogClose}
						size="small"
						sx={(theme) => ({
							color: theme.palette.primary.main,
							fontSize: "16px",
							lineHeight: "20px",
							fontWeight: 500,
							backgroundColor: "#ffffff",
							"&:hover": {
								backgroundColor: "#ffffff",
							},
							"&:focus": {
								backgroundColor: "#ffffff",
							},
							"&:active": {
								backgroundColor: "#ffffff",
							},
							paddingX: 2,
							paddingY: 1,
						})}
						variant="outlined"
					>
						Cancel
					</Button>
					<Button
						onClick={handleDelete}
						autoFocus
						size="small"
						sx={(theme) => ({
							color: "#ffffff",
							fontSize: "16px",
							lineHeight: "20px",
							fontWeight: 500,
							backgroundColor: theme.palette.secondary.main,
							"&:hover": {
								backgroundColor: theme.palette.secondary.main,
							},
							"&:focus": {
								backgroundColor: theme.palette.secondary.main,
							},
							"&:active": {
								backgroundColor: theme.palette.secondary.main,
							},
							paddingX: 2,
							paddingY: 1,
						})}
						variant="contained"
					>
						Remove
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export const DevicesList = ({
	title,
	items,
	allowEdit,
	onAddOrRemove,
}: {
	title: string;
	items: any;
	allowEdit: boolean;
	onAddOrRemove: (item: any, permanent?: boolean) => void;
}) => {
	const onClick = (item: any) => () => {
		if (allowEdit) {
			onAddOrRemove(item);
		}
	};

	const onDelete = (item: any) => () => {
		onAddOrRemove(item, true);
	};

	return (
		<Box display="flex" flexDirection="column" gap={0.5}>
			<Typography variant="h6" fontWeight={500} lineHeight="22px" color="#000">
				{title}
			</Typography>
			{items?.length > 0 && (
				<Grid container gap={2}>
					{items?.map((item: any) => {
						return (
							<Grid key={item?.deviceMake} item xl={2} lg={3} md={3} sm={3} xs={3}>
								<DevicesListItem
									onDelete={onDelete(item)}
									allowEdit={allowEdit}
									item={item}
									onClick={onClick(item)}
								/>
							</Grid>
						);
					})}
				</Grid>
			)}
			{!items?.length && (
				<Typography fontWeight={500} lineHeight="22px" color="#000" paddingLeft={2}>
					No devices
				</Typography>
			)}
		</Box>
	);
};

export const RegisteredDevices = ({
	devicesList,
	onSaveEmit,
	deleteDevice,
}: {
	devicesList: any;
	onSaveEmit: (resource: any, type: any) => void;
	deleteDevice: (id: any) => void;
}) => {
	const [edit, setEdit] = useState(false);
	const [devices, setDevices] = useState<any[]>([]);
	const [activeDevices, setActiveDevices] = useState<any[]>([]);
	const [inactiveDevices, setInactiveDevices] = useState<any[]>([]);

	useEffect(() => {
		if (devicesList?.length) {
			setDevices(devicesList);
		}
	}, [devicesList]);
	useEffect(() => {
		setActiveDevices(devices?.filter((x: any) => x.active));
		setInactiveDevices(devices?.filter((x: any) => !x.active));
	}, [devices]);

	const onAddOrRemove =
		(type: "add" | "remove") =>
		(item: any, permanent = false) => {
			if (permanent) {
				// delete
				setDevices(devices?.filter((x: any) => x.deviceMake !== item?.deviceMake));
				// deleteDevice(item.deviceMake);
				deleteDevice(item);
			} else {
				// add / update
				const s = devices?.find((x: any) => x.deviceMake === item?.deviceMake);
				if (s) {
					s.active = type === "add";
				}
				setActiveDevices(devices?.filter((x: any) => x.active));
				setInactiveDevices(devices?.filter((x: any) => !x.active));
			}
		};

	const onSave = useCallback(() => {
		onSaveEmit(devices, "add");
		setEdit(false);
	}, [devices]);

	const onBtnClick = useCallback(() => {
		if (edit) {
			onSave();
		} else {
			setEdit(true);
		}
	}, [edit, onSave]);

	return (
		<Box>
			<Header title="Registered Devices" />
			{devices?.length > 0 && (
				<Box
					padding="20px"
					display="flex"
					flexDirection="column"
					position="relative"
					gap={3}
					sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
				>
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
							position: "absolute",
							top: 10,
							right: 10,
							fontWeight: 500,
							fontSize: "18px",
							lineHeight: "22px",
						})}
					>
						{edit ? "Save" : "Edit"}
					</Button>
					<DevicesList
						onAddOrRemove={onAddOrRemove("remove")}
						allowEdit={edit}
						title="Active Devices"
						items={activeDevices}
					/>
					<DevicesList
						allowEdit={edit}
						title={edit ? "All Registered Devices" : "Inactive Devices"}
						items={inactiveDevices}
						onAddOrRemove={onAddOrRemove("add")}
					/>
				</Box>
			)}
			{!devices?.length && (
				<Typography variant="h6" fontWeight={500} lineHeight="22px" color="#000" padding={2}>
					No registered devices
				</Typography>
			)}
		</Box>
	);
};

export const Devices = () => {
	const navigate = useNavigate();
	const [deviceOptions, setDeviceOptions] = useState<any[]>([]);

	let options = [] as any;
	const getDevicesMutation: any = useGetDevicesAPI();
	const registeredDevices: any = useGetUserDevicesAPI();
	const deviceSessionConnectionMutation = useDeviceSessionConnectionAPI();
	const registerUserDeviceMutation = useRegisterUserDeviceAPI();
	const deviceUserPutMutation = useUserDevicePutAPI();
	const deviceUserDeleteMutation = useDeviceUserDeleteAPI();

	useEffect(() => {
		if (getDevicesMutation?.data) {
			let res = [] as any;
			let options = [] as any;
			if (registeredDevices?.data) {
				options = getDevicesMutation?.data?.filter((device: any) => {
					// Add a condition to filter devices where 'active' is true
					return (
						device.active === true && // You can adjust the condition as needed
						!registeredDevices?.data?.find((x: any) => x.deviceMake === device.deviceMake)
					);
				});
			}
			options.forEach((device: any) => {
				res.push({
					value: device.name,
					label: device.name,
					id: device.deviceMake,
				});
			});
			setDeviceOptions(res);
		}
	}, [registeredDevices?.data, getDevicesMutation?.data]);

	const onRegisterDevice = (resource: any) => {
		deviceSessionConnectionMutation(resource, {
			onSuccess: (res: any) => {
				if (res?.status === "success") {
					const deviceWidgetSessionUrl = res.auth_url;

					const selectedDevice = deviceOptions?.find((dev: any) => dev.value === resource);

					let formData = {
						name: resource,
						deviceMake: selectedDevice.id.toString(),
						active: false,
						tivraUserId: userInfo?.userId,
						terraDeviceUserId: res.user_id,
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
	};

	const onUpdateDevice = (resources: any) => {
		resources.forEach((resource: any) => {
			console.log(
				resource,
				registeredDevices?.data.find((dev: any) => dev.deviceMake === resource.deviceMake)
			);
			let formData = {
				name: resource?.deviceMake,
				deviceMake: resource?.deviceMake,
				active: resource.active,
				tivraUserId: userInfo?.userId,
				terraDeviceUserId: resource.terraDeviceUserId,
			};
			deviceUserPutMutation(formData, {
				onSuccess: (r: any) => {
					console.log(r);
					getDevicesMutation?.refetch();
					registeredDevices?.refetch();
				},
				onError: (err: any) => {
					console.log(err);
				},
			});
		});
		toast.success("Saved");
	};

	const deleteDevice = (item: any) => {
		deviceUserDeleteMutation(item, {
			onSuccess: (r: any) => {
				toast.success("Device deleted successfully");
				getDevicesMutation?.refetch();
				registeredDevices?.refetch();
			},
			onError: (err: any) => {
				console.log(err);
			},
		});
	};

	return (
		<Stack gap={3}>
			<AddDevices deviceOptions={deviceOptions} onRegisterDevice={onRegisterDevice} />
			<RegisteredDevices
				devicesList={registeredDevices?.data}
				onSaveEmit={onUpdateDevice}
				deleteDevice={deleteDevice}
			/>
		</Stack>
	);
};
