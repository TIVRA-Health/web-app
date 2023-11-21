import { useLocalStorage } from "hooks/useLocalStorage";
import { STORAGE_USER_INFO_KEY, STORAGE_USER_TOKEN_KEY, appLinks, dashboardLinks } from "main";
import { UseMutationResult, useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "./client/webClient";
import apiConfig from "./client/endpoint";

export interface LoginResponse {
	email: string;
	name: string;
	role: string;
	isSuccess: boolean;
}

export const useTeamInfoGetAPI = () => {
	const user = window.localStorage.getItem(STORAGE_USER_INFO_KEY);

	const userJson = JSON.parse(String(user));
	const userId: string = userJson?.userId !== undefined ? userJson?.userId : userJson?._id;

	const url = apiConfig.GET.TEAM_INFO.replace("userId", userId);
	const teamInfo = useQuery<void, null>(
		["get_team_info"],
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
						// console.log("user info : ", response);
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

	return teamInfo;
};

export const useGetTeammateDetailAPI = (filter: string, teammateId: string) => {
	const url = apiConfig.GET.TEAMMATE_DETAIL.replace("teammateId", teammateId).replace("filter", filter);
	// const url = apiConfig.GET.DASHBOARD_DATA.replace("userId", teammateId).replace("filter", filter);

	const getTeammateData = useQuery<void, null>(
		["get_teammate_detail_api"],
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
						// console.log("Success 1st");
						return response;
					},
					(error) => {
						console.log(error);
						throw error;
					}
				),
		{
			onSuccess: (res) => {
				// console.log("Success 2nd");
				console.log(res);
				return res;
			},
			onError: (res) => {
				toast.error("Oops.. Error to get devices. Try again!");
			},
		}
	);

	return getTeammateData;
};
