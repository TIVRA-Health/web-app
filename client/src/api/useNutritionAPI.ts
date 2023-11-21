import { UseMutateFunction, useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import api from "./client/webClient";
import apiConfig from "./client/endpoint";

// export const useFDCSearchAPI = (filter: string) => {
// 	return useQuery<any | null>(
// 		["Get_Nutrients_", filter],
// 		({ signal }) => api.apiDeviceGetNutrientsGet(filter, { signal }).then((res) => res.data),
// 		{
// 			enabled: Boolean(filter) && filter?.trim().length > 0,
// 			onSuccess: (res) => {
// 				console.log(res);
// 			},
// 			onError: (res) => {
// 				const errorMessage = "Oops.. Error to get roles. Try again!";
// 				/*res.response ? res.response.data.description : */
// 				toast.error(errorMessage);
// 			},
// 		}
// 	);
// };

export const useNutritionixSearchAPI = (filter: string) => {
	// if (filter === "") {
	// 	return null;
	// }
	const url = apiConfig.GET.NUTRITION_SEARCH.replace("filter", filter);
	return useQuery<any | null>(
		["Get_Nutrients_", filter],
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

async function fetchFoodDetail(foodName: any, qty: string): Promise<any> {
	const foodReq = {
		query: qty + " " + foodName.description,
	};
	const response = await api
		.post(apiConfig.POST.NUTRITION_FOOD_DETAIL, foodReq, {
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

type IFoodDetail = UseMutateFunction<
	any,
	any,
	{
		foodName: any | null;
		qty: string;
	},
	any
>;
export const useNutritionixFoodDetailAPI = (): IFoodDetail => {
	const { mutate: useOtpGenerationMutation } = useMutation<any, any, { foodName: any | null; qty: string }>(
		async ({ foodName, qty }) => fetchFoodDetail(foodName, qty),
		{
			onSuccess: (res) => {
				console.log(res);
				return res;
			},
			onError: (res) => {
				const errorMessage = res.response
					? res.response.data.description
					: "Oops.. Error on Food Detail. Try again!";
				toast.error(errorMessage);
			},
		}
	);

	return useOtpGenerationMutation;
};
