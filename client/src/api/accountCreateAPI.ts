import { STORAGE_USER_INFO_KEY } from "main";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiConfig from "./client/endpoint";
import api from "./client/webClient";

export const usePaymentPlanRoleAPI = (enabled: boolean) => {
	const usePaymentPlanRoles = useQuery<void, null>(
		["payment_roles"],
		() =>
			api
				.get(apiConfig.GET.PAYMENT_PLAN_ROLE, {
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
			enabled,
			onSuccess: (res) => {
				console.log(res);
			},
			onError: (res) => {
				toast.error("Oops.. Error in PP. Try again!");
			},
		}
	);

	return usePaymentPlanRoles;
};

async function putPaymentPlanRole(planId: any, roleId: any, userId: any): Promise<any> {
	const response = await api
		.put(
			apiConfig.PUT.USER_ROLE,
			{
				userId: userId,
				roleId: roleId,
				planId: planId,
				registrationId: 2,
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
				return response;
			},
			(error) => {
				console.log(error);
				throw error;
			}
		);
	return response;
}

export const usePutPaymentPlanRoleAPI = () => {
	const { mutate: paymentPlanRoleMutation } = useMutation<any, any, { planId: any; roleId: any; userId: any }>(
		({ planId, roleId, userId }) => putPaymentPlanRole(planId, roleId, userId),
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

	return paymentPlanRoleMutation;
};

async function paymentPlanLink(priceId: any): Promise<any> {
	const response = await api
		.post(
			apiConfig.POST.PAYMENT_LINK,
			{
				priceId,
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
				return response;
			},
			(error) => {
				console.log(error);
				throw error;
			}
		);
	return response;
}

export const usePaymentPlanLinkAPI = () => {
	const { mutate: paymentPlanLinkMutation } = useMutation<any, any, { priceId: any }>(
		({ priceId }) => paymentPlanLink(priceId),
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

	return paymentPlanLinkMutation;
};
async function demographicsGet(): Promise<any> {
	const useDemographic = useQuery<void, null>(
		["demographic"],
		() =>
			api
				.get(apiConfig.GET.PAYMENT_PLAN_ROLE, {
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then(
					(resp) => {
						let response = resp.data;
						// console.log("demographic response: ", response);
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
				toast.error("Oops.. Error in PP. Try again!");
			},
		}
	);

	return useDemographic;
}

export const useDemographicsGetAPI = () => {
	const navigate = useNavigate();

	const { mutate: demographicGetMutation } = useMutation<any, any, any>(() => demographicsGet(), {
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (res) => {
			const errorMessage = res.response ? res.response.data.description : "Oops.. Error to get roles. Try again!";
			toast.error(errorMessage);
		},
	});

	return demographicGetMutation;
};

async function putDemographics(formData: any): Promise<any> {
	let userData: any = window.localStorage.getItem(STORAGE_USER_INFO_KEY);
	userData = userData ? JSON.parse(userData) : {};

	formData.userId = userData.userId;
	formData.registrationId = 4;

	const response = await api
		.put(apiConfig.PUT.USER_DEMOGRAPHIC, formData, {
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
		);
	return response;
}

export const usePutDemographicsAPI = () => {
	const { mutate: putDemographicsMutation } = useMutation<any, any, any>((formData) => putDemographics(formData), {
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (res) => {
			const errorMessage = res.response ? res.response.data.description : "Oops.. Error to get roles. Try again!";
			toast.error(errorMessage);
		},
	});

	return putDemographicsMutation;
};

async function socialDetailsGet(): Promise<any> {
	const useSocial = useQuery<void, null>(
		["social"],
		() =>
			api
				.get(apiConfig.GET.USER_SOCIAL, {
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then(
					(resp) => {
						let response = resp.data;
						// console.log("social response: ", response);
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
				toast.error("Oops.. Error in PP. Try again!");
			},
		}
	);

	return useSocial;
}

export const useSocialDetailsGetAPI = () => {
	const navigate = useNavigate();

	const { mutate: socialDetailsGetMutation } = useMutation<any, any, any>(() => socialDetailsGet(), {
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (res) => {
			const errorMessage = res.response ? res.response.data.description : "Oops.. Error to get roles. Try again!";
			toast.error(errorMessage);
		},
	});
	return socialDetailsGetMutation;
};

async function putSocialDetails(formData: any): Promise<any> {
	let userData: any = window.localStorage.getItem(STORAGE_USER_INFO_KEY);
	userData = userData ? JSON.parse(userData) : {};

	formData.userId = userData.userId;
	formData.registrationId = 5;

	const response = await api
		.put(
			apiConfig.PUT.USER_SOCIAL,
			{ formData },
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
		.then(
			(resp) => {
				let response = resp.data;
				return response;
			},
			(error) => {
				console.log(error);
				throw error;
			}
		);
	return response;
}

export const usePutSocialDetailsAPI = () => {
	const { mutate: putSocialDetailsMutation } = useMutation<any, any, any>((formData) => putSocialDetails(formData), {
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (res) => {
			const errorMessage = res.response ? res.response.data.description : "Oops.. Error to get roles. Try again!";
			toast.error(errorMessage);
		},
	});

	return putSocialDetailsMutation;
};

async function putFitnessDetails(formData: any): Promise<any> {
	let userData: any = window.localStorage.getItem(STORAGE_USER_INFO_KEY);
	userData = userData ? JSON.parse(userData) : {};

	formData.userId = userData.userId;
	formData.registrationId = 6;

	const response = await api
		.put(
			apiConfig.PUT.USER_HEALTH_FITNESS,
			{ formData },
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
		.then(
			(resp) => {
				let response = resp.data;
				return response;
			},
			(error) => {
				console.log(error);
				throw error;
			}
		);
	return response;
}

export const usePutFitnessDetailsAPI = () => {
	const { mutate: putFitnessDetailsMutation } = useMutation<any, any, any>(
		(formData) => putFitnessDetails(formData),
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

	return putFitnessDetailsMutation;
};

async function fitnessDetailsGet(): Promise<any> {
	const useHealthFitness = useQuery<void, null>(
		["health_fitness"],
		() =>
			api
				.get(apiConfig.GET.USER_HEALTH_FITNESS, {
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then(
					(resp) => {
						let response = resp.data;
						// console.log("Health-Fitness response: ", response);
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
				toast.error("Oops.. Error in PP. Try again!");
			},
		}
	);

	return useHealthFitness;
}

export const useFitnessDetailsGetAPI = () => {
	const { mutate: fitnessDetailsGetMutation } = useMutation<any, any, any>(() => fitnessDetailsGet(), {
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (res) => {
			const errorMessage = res.response ? res.response.data.description : "Oops.. Error to get roles. Try again!";
			toast.error(errorMessage);
		},
	});
	return fitnessDetailsGetMutation;
};

async function putCorporateDetails(formData: any): Promise<any> {
	let userData: any = window.localStorage.getItem(STORAGE_USER_INFO_KEY);
	userData = userData ? JSON.parse(userData) : {};

	formData.userId = userData.userId;
	formData.registrationId = 3;

	const response = await api
		.put(
			apiConfig.PUT.USER_CORPORATE_ASSOCIATION,
			{ formData },
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
		.then(
			(resp) => {
				let response = resp.data;
				return response;
			},
			(error) => {
				console.log(error);
				throw error;
			}
		);
	return response;
}

export const usePutCorporateDetailsAPI = () => {
	const { mutate: putCorporateDetailsMutation } = useMutation<any, any, any>(
		(formData) => putCorporateDetails(formData),
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

	return putCorporateDetailsMutation;
};

async function postCorporateDetails(formData: any): Promise<any> {
	// const response = await api.apiAccountAddCorporatePost(formData);
	const response = "";
	return response; //response.data;
}

export const usePostCorporateDetailsAPI = () => {
	const { mutate: postCorporateDetailsMutation } = useMutation<any, any, any>(
		(formData) => postCorporateDetails(formData),
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

	return postCorporateDetailsMutation;
};

async function corporateDetailsGet(): Promise<any> {
	const useCorporate = useQuery<void, null>(
		["corporate"],
		() =>
			api
				.get(apiConfig.GET.CORPORATE_DETAIL, {
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then(
					(resp) => {
						let response = resp.data;
						// console.log("socail response: ", response);
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
				toast.error("Oops.. Error in PP. Try again!");
			},
		}
	);

	return useCorporate;
}

export const useCorporateDetailsGetAPI = () => {
	const navigate = useNavigate();

	const { mutate: corporateDetailsGetMutation } = useMutation<any, any, any>(() => corporateDetailsGet(), {
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (res) => {
			const errorMessage = res.response ? res.response.data.description : "Oops.. Error to get roles. Try again!";
			toast.error(errorMessage);
		},
	});
	return corporateDetailsGetMutation;
};

export const useGetDashboardConfigAPI = () => {
	let userData: any = window.localStorage.getItem(STORAGE_USER_INFO_KEY);
	userData = userData ? JSON.parse(userData) : {};

	const url = apiConfig.GET.USER_DASHBOARD_CONFIG.replace("userId", userData.userId);
	const dashboardConfigData = useQuery<void, null>(
		["dashboard_config_api"],
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
						// console.log("Dashboard config response: ", response);
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
				toast.error("Oops.. Error to get dashboard config. Try again!");
			},
		}
	);

	return dashboardConfigData;
};

export const useGetUserDashboardConfigAPI = () => {
	let userData: any = window.localStorage.getItem(STORAGE_USER_INFO_KEY);
	userData = userData ? JSON.parse(userData) : {};

	const url = apiConfig.GET.USER_DASHBOARD_CONFIG.replace("userId", userData.userId);
	const dashboardConfigData = useQuery<void, null>(
		["user_dashboard_config_api"],
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
						console.log("Dashboard config response: ", response);

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
				toast.error("Oops.. Error to get dashboard config. Try again!");
			},
		}
	);

	return dashboardConfigData;
};

async function postDashboardConfig(formData: any): Promise<any> {
	const response = await api
		.post(apiConfig.POST.SAVE_DASHBOARD_CONFIG, formData, {
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
		);
	return response;
}

export const usePostDashboardConfigAPI = () => {
	const { mutate: postDashboardConfigMutation } = useMutation<any, any, any>(
		(formData) => postDashboardConfig(formData),
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

	return postDashboardConfigMutation;
};

export const useGetUserDashboardPreferenceAPI = () => {
	let userData: any = window.localStorage.getItem(STORAGE_USER_INFO_KEY);
	userData = userData ? JSON.parse(userData) : {};

	const url = apiConfig.GET.DC_DASHBOARD_PREFERENCE.replace("userId", userData.userId);
	const dashboardConfigData = useQuery<void, null>(
		["user_dashboard_preference_api"],
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
						console.log("Dashboard preference response: ", response);

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
				toast.error("Oops.. Error to get dashboard config. Try again!");
			},
		}
	);

	return dashboardConfigData;
};

async function postDashboardPreference(formData: any): Promise<any> {
	const response = await api
		.put(apiConfig.PUT.USER_DASHBOARD_PREFERENCE, formData, {
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
		);
	return response;
}

export const usePostDashboardPreferenceAPI = () => {
	const { mutate: postDashboardPreferenceMutation } = useMutation<any, any, any>(
		(formData) => postDashboardPreference(formData),
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

	return postDashboardPreferenceMutation;
};

async function deleteDashboardPreference(formData: any): Promise<any> {
	const response = await api.delete(apiConfig.DELETE.DELETE_USER_DASHBOARD_PREFERENCE, formData).then(
		(resp) => {
			let response = resp.data;
			return response;
		},
		(error) => {
			console.log(error);
			throw error;
		}
	);
	return response;
}

export const useDeleteDashboardPreferenceAPI = () => {
	const { mutate: deleteDashboardPreferenceMutation } = useMutation<any, any, any>(
		(formData) => deleteDashboardPreference(formData),
		{
			onSuccess: (res) => {
				console.log(res);
			},
			onError: (res) => {
				const errorMessage = res.response
					? res.response.data.description
					: "Oops.. Error to delete preferences. Try again!";
				toast.error(errorMessage);
			},
		}
	);

	return deleteDashboardPreferenceMutation;
};

export const useGetUserTeamPreferenceAPI = () => {
	let userData: any = window.localStorage.getItem(STORAGE_USER_INFO_KEY);
	userData = userData ? JSON.parse(userData) : {};

	const url = apiConfig.GET.DC_TEAM_PREFERENCE.replace("userId", userData.userId);
	const dashboardConfigData = useQuery<void, null>(
		["user_team_preference_api"],
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
						console.log("Dashboard team preference response: ", response);

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
				toast.error("Oops.. Error to get dashboard config. Try again!");
			},
		}
	);

	return dashboardConfigData;
};

async function postTeamPreference(formData: any): Promise<any> {
	const response = await api.put(apiConfig.PUT.USER_TEAM_PREFERENCE, formData).then(
		(resp) => {
			let response = resp.data;
			return response;
		},
		(error) => {
			console.log(error);
			throw error;
		}
	);
	return response;
}

export const usePostTeamPreferenceAPI = () => {
	const { mutate: postTeamPreferenceMutation } = useMutation<any, any, any>(
		(formData) => postTeamPreference(formData),
		{
			onSuccess: (res) => {
				console.log(res);
			},
			onError: (res) => {
				const errorMessage = res.response
					? res.response.data.description
					: "Oops.. Error to post team preference. Try again!";
				toast.error(errorMessage);
			},
		}
	);

	return postTeamPreferenceMutation;
};

async function deleteTeamPreference(formData: any): Promise<any> {
	const response = await api.delete(apiConfig.DELETE.DELETE_USER_TEAM_PREFERENCE, formData).then(
		(resp) => {
			let response = resp.data;
			return response;
		},
		(error) => {
			console.log(error);
			throw error;
		}
	);
	return response;
}

export const useDeleteTeamPreferenceAPI = () => {
	const { mutate: deleteTeamPreferenceMutation } = useMutation<any, any, any>(
		(formData) => deleteTeamPreference(formData),
		{
			onSuccess: (res) => {
				console.log(res);
			},
			onError: (res) => {
				const errorMessage = res.response
					? res.response.data.description
					: "Oops.. Error to delete preferences. Try again!";
				toast.error(errorMessage);
			},
		}
	);

	return deleteTeamPreferenceMutation;
};

async function validateNpi(npi: string): Promise<any> {
	const url = apiConfig.GET.VALIDATE_NPI.replace("number", npi);

	const response = await api
		.get(url, {
			headers: {
				"Content-Type": "application/json",
			},
		})
		.then(
			(resp) => {
				let response = resp.data;
				if (response.success) {
					toast.success("Valid NPI number");
				} else {
					toast.warn("Invalid NPI number");
				}
				return response;
			},
			(error) => {
				console.log(error);
				throw error;
			}
		);
	return response;
}

export const useValidateNpiAPI = () => {
	const { mutate: registerMutation } = useMutation<any, any, { npi: string }>(
		async ({ npi }) => await validateNpi(npi),
		{
			onSuccess: async (res) => {
				if (res && res.userId) {
				} else if (res.valid) {
					toast.success(res.message);
				}
			},
			onError: (res) => {
				const errorMessage = res.response
					? res.response.data.description
					: "Oops.. Error on NPI validation. Try again!";
				toast.error(errorMessage);
			},
		}
	);

	return registerMutation;
};

async function putResetPassword(formData: any): Promise<any> {
	const response = await api
		.put(
			apiConfig.PUT.USER_PASSWORD_RESET,
			{ email: formData.email, password: formData.confirmPassword },
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
		.then(
			(resp) => {
				let response = resp.data;
				if (response.status === "warn") {
					toast.warn(response.message);
				} else {
					toast.success(response.message);
				}
				return response;
			},
			(error) => {
				console.log(error);
				throw error;
			}
		);
	return response;
}

export const usePutResetPasswordAPI = () => {
	const { mutate: putResetPasswordMutation } = useMutation<any, any, any>((formData) => putResetPassword(formData), {
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (res) => {
			const errorMessage = res.response ? res.response.data.description : "Oops.. Error to get roles. Try again!";
			toast.error(errorMessage);
		},
	});

	return putResetPasswordMutation;
};
