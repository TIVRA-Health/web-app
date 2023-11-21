import dayjs, { Dayjs } from "dayjs";
import { STORAGE_USER_INFO_KEY } from "main";
import { UseMutateFunction, useMutation } from "react-query";
import { toast } from "react-toastify";
import apiConfig from "./client/endpoint";
import api from "./client/webClient";

type INutritionLog = UseMutateFunction<
	any,
	any,
	{
		selectedDate: Dayjs;
	},
	any
>;

type IAddNutritionLog = UseMutateFunction<
	any,
	any,
	{
		itemName: any;
		calories: any;
		cholesterol: any;
		fat: any;
		protein: any;
		fiber: any;
		sugar: any;
		itemQty: any;
		item: any;
		creationTs: any;
	},
	any
>;

async function save(nutritionLog: any): Promise<any> {
	let userData: any = window.localStorage.getItem(STORAGE_USER_INFO_KEY);
	userData = userData ? JSON.parse(userData) : {};

	nutritionLog.userId = userData?.userId;

	const response = await api
		.post(apiConfig.POST.NUTRITION_UPLOAD, nutritionLog, {
			headers: {
				"Content-Type": "application/json",
			},
		})
		.then(
			(resp) => {
				let response = resp.data;
				// console.log("Nutrition info added: ", response);
				return response;
			},
			(error) => {
				console.log(error);
				throw error;
			}
		);
	return response;
}

async function getNutritionLogForDate(selectedDate: Dayjs): Promise<any> {
	let userData: any = window.localStorage.getItem(STORAGE_USER_INFO_KEY);
	userData = userData ? JSON.parse(userData) : {};

	const dayjsDate = selectedDate.toString();
	const mongodbFormattedDate = dayjs(dayjsDate).format();
	const dateObj = new Date(mongodbFormattedDate);
	const date = dateObj.toISOString().split("T")[0];

	const url = apiConfig.GET.USER_NUTRITION_LOG.replace("userId", userData.userId) + "/" + date;

	const nutritionLog = await api
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
		);

	return nutritionLog;
}

export const useGetNutritionLogAPI = (): INutritionLog => {
	const { mutate: useNutritionLogMutation } = useMutation<any, any, { selectedDate: Dayjs }>(
		async ({ selectedDate }) => getNutritionLogForDate(selectedDate),
		{
			onSuccess: () => {},
			onError: (error) => {
				const errorMessage = error.response
					? error.response.data.description
					: "Oops.. Error on sign in. Try again!";
				toast.error(errorMessage);
				throw error;
			},
		}
	);

	return useNutritionLogMutation;
};

async function deleteNutritionLog(nutritionLogId: string): Promise<any> {
	const url = apiConfig.DELETE.NUTRITION_LOG.replace("nutritionLogId", nutritionLogId);

	const nutritionLog = await api
		.delete(url, {
			headers: {
				"Content-Type": "application/json",
			},
		})
		.then(
			(resp) => {
				let response = resp.data;
				if (response.status === "success") {
					toast.success(response.msg);
				} else if (response.status === "warn") {
					toast.warn(response.msg);
				}
				return response;
			},
			(error) => {
				console.log(error);
				throw error;
			}
		);

	return nutritionLog;
}

export const useDeleteNutritionLogAPI = () => {
	const { mutate: getOrganizationMutation } = useMutation<any, any, { nutritionLogId: string }>(
		async ({ nutritionLogId }) => {
			try {
				await deleteNutritionLog(nutritionLogId);
			} catch (error) {
				throw new Error("Something went wrong. Please try again.");
			}
		},
		{
			onError: (res) => {
				const errorMessage = res.response
					? res.response.data.description
					: "Something went wrong. Please try again.";
				toast.error(errorMessage);
			},
		}
	);

	return getOrganizationMutation;
};

export const useAddNutritionLogAPI = (): IAddNutritionLog => {
	const { mutate: addNutritionLogMutation } = useMutation<
		any,
		any,
		{
			itemName: any;
			calories: any;
			cholesterol: any;
			fat: any;
			protein: any;
			fiber: any;
			sugar: any;
			itemQty: any;
			item: any;
			creationTs: any;
		}
	>(
		async ({ itemName, calories, cholesterol, fat, protein, fiber, sugar, itemQty, item, creationTs }) =>
			save({ itemName, calories, cholesterol, fat, protein, fiber, sugar, itemQty, item, creationTs }),
		{
			onSuccess: (res) => {
				if (res.acknowledged) {
					toast.success("saved successfully");
					
				}
				
			},
			onError: (res) => {
				const errorMessage = res.response
					? res.response.data.description
					: "Oops.. Error while storing nutrition detail. Try again!";
				toast.error(errorMessage);
			},
		}
	);

	return addNutritionLogMutation;
};
