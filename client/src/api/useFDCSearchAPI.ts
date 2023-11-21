import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { DeviceApi } from "./swagger2/api";

const api = new DeviceApi();

export const useFDCSearchAPI = (filter: string) => {
	return useQuery<any | null>(
		["Get_Nutrients_", filter],
		({ signal }) => api.apiDeviceGetNutrientsGet(filter, { signal }).then((res) => res.data),
		{
			enabled: Boolean(filter) && filter?.trim().length > 0,
			onSuccess: (res) => {
				console.log(res);
			},
			onError: (res) => {
				const errorMessage = "Oops.. Error to get roles. Try again!";
				/*res.response ? res.response.data.description : */
				toast.error(errorMessage);
			},
		}
	);
};
