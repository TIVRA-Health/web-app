import { useLocalStorage } from "hooks/useLocalStorage";
import { STORAGE_ICON_KEY, STORAGE_ROLES_KEY } from "main";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import apiConfig from "./client/endpoint";
import api from "./client/webClient";

export const useUserRolesGetAPI = () => {
	const [roles, setRoles] = useLocalStorage(STORAGE_ROLES_KEY, null);

	// if (roles !== undefined && roles) {
	// 	return roles;
	// }

	const userRoles = useQuery<void, null>(
		["get_user_roles"],
		() =>
			api
				.get(apiConfig.GET.LOAD_ALL_USER_ROLES, {
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then(
					(resp) => {
						let response = resp.data;
						// console.log("user roles: ", response);
						setRoles(response);
						return response;
					},
					(error) => {
						console.log(error);
						throw error;
					}
				),
		{
			onSuccess: (res) => {
				// console.log(res);
			},
			onError: (res) => {
				toast.error("Oops.. Error to get user Roles. Try again!");
			},
		}
	);

	return userRoles;
};

export const useGetIconAPI = () => {
	const [icons, setIcons] = useLocalStorage(STORAGE_ICON_KEY, null);

	// if (icons && icons !== undefined) {
	// 	return icons;
	// }

	const iconInfos = useQuery<void, null>(
		["load_ALL_Icon"],
		() =>
			api
				.get(apiConfig.GET.LOAD_ICON, {
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then(
					(resp) => {
						let response = resp.data;
						setIcons(response);
						return response;
					},
					(error) => {
						console.log(error);
						throw error;
					}
				),
		{
			onSuccess: (res) => {
				// console.log(res);
			},
			onError: (res) => {
				toast.error("Oops.. Error to get dashboard config. Try again!");
			},
		}
	);

	return iconInfos;
};
