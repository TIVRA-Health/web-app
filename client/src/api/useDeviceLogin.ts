import { STORAGE_USER_INFO_KEY } from "main";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import apiConfig from "./client/endpoint";
import api from "./client/webClient";

async function establishDeviceSession(resource: string): Promise<any> {
	const user = window.localStorage.getItem(STORAGE_USER_INFO_KEY);
	const userJson = JSON.parse(String(user));

	const response = await api
		.post(
			apiConfig.POST.DEVICE_SESSION,
			{
				deviceBrand: resource,
				userId: userJson?.userId,
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
		.then(
			(resp) => {
				let response = resp.data;
				// console.log("Device session bridge successfully: ", response);
				return response;
			},
			(error) => {
				console.log(error);
				throw error;
			}
		);

	return response ? response : "";
}

export const useDeviceSessionConnectionAPI = () => {
	const { mutate: deviceSignInMutation } = useMutation<any, any, any>(
		(formData) => establishDeviceSession(formData),
		{
			onSuccess: (res) => {
				console.log(res);
			},
			onError: (res) => {
				const errorMessage = res.response
					? res.response.data.description
					: "Oops.. Error to get roles. Try again!";
				toast.error(errorMessage);
			},
		}
	);

	return deviceSignInMutation;
};

async function registerUserDevice(formData: any): Promise<any> {
	const response = await api
		.post(
			apiConfig.POST.DEVICE_REGISTER,
			{
				userId: formData.tivraUserId,
				device: formData,
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
		.then(
			(resp) => {
				let response = resp.data;
				toast.success("Device registered successfully: ", response);
				return response;
			},
			(error) => {
				console.log(error);
				throw error;
			}
		);

	return response ? response : "";
}

export const useRegisterUserDeviceAPI = () => {
	const { mutate: registerUserDeviceMutation } = useMutation<any, any, any>(
		(formData) => registerUserDevice(formData),
		{
			onSuccess: (res) => {
				console.log(res);
			},
			onError: (res) => {
				const errorMessage = res.response
					? res.response.data.description
					: "Oops.. Error to register devices. Try again!";
				toast.error(errorMessage);
			},
		}
	);

	return registerUserDeviceMutation;
};

async function updateUserDevice(req: any): Promise<any> {
	const response = await api
		.put(apiConfig.PUT.UPDATE_DEVICE_STATUS, req, {
			headers: {
				"Content-Type": "application/json",
			},
		})
		.then(
			(resp) => {
				let response = resp.data;
				// console.log("Device updated successfully: ", response);
				return response;
			},
			(error) => {
				console.log(error);
				throw error;
			}
		);

	return response;
}

export const useUserDevicePutAPI = () => {
	const { mutate: putDevicesMutation } = useMutation<any, any, any>((formData) => updateUserDevice(formData), {
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (res) => {
			const errorMessage = res.response ? res.response.data.description : "Oops.. Error to get roles. Try again!";
			toast.error(errorMessage);
		},
	});

	return putDevicesMutation;
};

async function deleteDeviceUser(item: any): Promise<any> {
	const url = apiConfig.DELETE.DE_REGISTER_DEVICE.replace("terraDeviceUserId", item.terraDeviceUserId).replace(
		"tivraUserId",
		item.tivraUserId
	);
	const response = await api.delete(url).then(
		(resp) => {
			let response = resp.data;
			// console.log("De-register device successfully: ", response);
			return response;
		},
		(error) => {
			console.log(error);
			throw error;
		}
	);

	return response;
}

export const useDeviceUserDeleteAPI = () => {
	const { mutate: deleteDevicesMutation } = useMutation<any, any, any>((item) => deleteDeviceUser(item), {
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (res) => {
			const errorMessage = res.response ? res.response.data.description : "Oops.. Error to get roles. Try again!";
			toast.error(errorMessage);
		},
	});

	return deleteDevicesMutation;
};

export const useGetDevicesAPI = () => {
	// const getDevicesData = useQuery<void, null>(
	// 	["get_devices_api"],
	// 	() => api.apiDeviceGetDevicesGet().then((res) => res.data),
	// 	{
	// 		onSuccess: (res) => {
	// 			console.log(res);
	// 		},
	// 		onError: (res) => {
	// 			// const errorMessage = res.response ? res.response.data.description : "Oops.. Error to get devices. Try again!";
	// 			toast.error("Oops.. Error to get devices. Try again!");
	// 		},
	// 	}
	// );

	const getDevicesData = useQuery<void, null>(
		["get_devices_api"],
		() =>
			api
				.get(apiConfig.GET.ALL_ACTIVE_DEVICE, {
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then(
					(resp) => {
						let response = resp.data;
						return response;
					},
					(error) => {
						console.log(error);
						throw error;
					}
				),
		{
			onSuccess: (res) => {
				console.log(res);
			},
			onError: (res) => {
				// const errorMessage = res.response ? res.response.data.description : "Oops.. Error to get devices. Try again!";
				toast.error("Oops.. Error to get devices. Try again!");
			},
		}
	);

	return getDevicesData;
};

export const useGetUserDevicesAPI = () => {
	const user = window.localStorage.getItem(STORAGE_USER_INFO_KEY);
	const userJson = JSON.parse(String(user));

	const url = apiConfig.GET.USER_DEVICE.replace("userId", userJson.userId);

	const userDevicesData = useQuery<void, null>(
		["user_devices_api"],
		() =>
			api
				.get(url, {
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then(
					(resp) => {
						let response = resp.data;
						return response;
					},
					(error) => {
						console.log(error);
						throw error;
					}
				),
		{
			onSuccess: (res) => {
				console.log(res);
			},
			onError: (res) => {
				// const errorMessage = res.response ? res.response.data.description : "Oops.. Error to get devices. Try again!";
				toast.error("Oops.. Error to get devices. Try again!");
			},
		}
	);

	return userDevicesData;
};
