import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { STORAGE_USER_INFO_KEY } from "main";
import api from "./client/webClient";
import apiConfig from "./client/endpoint";

export const useGetUserDashboardAPI = (filter: string) => {
	let userData: any = window.localStorage.getItem(STORAGE_USER_INFO_KEY);
	userData = userData ? JSON.parse(userData) : {};

	const url = apiConfig.GET.DASHBOARD_DATA.replace("userId", userData?.userId).replace("filter", filter);

	const getUserDashboardData = useQuery<void, null>(
		["get_user_dashboard_api"],
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
				toast.error("Oops.. Error to get devices. Try again!");
			},
		}
	);

	return getUserDashboardData;
};
