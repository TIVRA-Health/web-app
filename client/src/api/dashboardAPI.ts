import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { DeviceApi } from "./swagger2/api";

const api = new DeviceApi();

export const useGetDashboardDetailsAPI = () => {
	const dashboardConfigData = useQuery<void, null>(['get-dashboard_details_api'], () => api.apiDeviceGetDashboardDetailsGet().then((res) => res.data), {
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (res) => {
			// const errorMessage = res.response ? res.response.data.description : "Oops.. Error to get devices. Try again!";
			toast.error("Oops.. Error to get dashboard details. Try again!");
		},
	});

	return dashboardConfigData;
};