import { UseMutateFunction, useMutation } from "react-query";
import { toast } from "react-toastify";
import apiConfig from "./client/endpoint";
import api from "./client/webClient";
import { STORAGE_USER_INFO_KEY } from "main";

interface FormData {
	firstName: "";
	middleName: "";
	lastName: "";
	email: "";
	phoneNumber: "";
	gender: "";
	dateOfBirth: "";
	address1: "";
	address2: "";
	city: "";
	state: "";
	zipCode: "";
	country: "";
	educationLevel: "";
	incomeRange: "";
	healthcare: "";
	hospitalAssociated: "";
	height: "";
	weight: "";
	chronicCondition: "";
	smoker: "";
	type: "";
	userId?:"",
}

type IUseEditProfileTemp = UseMutateFunction<
	any,
	any,
	{
		formData: FormData;
	},
	any
>;

async function updateProfile(formData: FormData): Promise<any> {
	let userData: any = window.localStorage.getItem(STORAGE_USER_INFO_KEY);
	userData = userData ? JSON.parse(userData) : {};

	formData.userId = userData?.userId;

	const response = await api
		.put(apiConfig.PUT.USER_PROFILE, formData, {
			headers: {
				"Content-Type": "application/json",
			},
		})
		.then(
			(resp) => {
				let response = resp.data;
				console.log(formData);

				return response;
			},
			(error) => {
				console.log(error);
				throw error;
			}
		);
	return response;
}

export const useEditProfileTempAPI = (): IUseEditProfileTemp => {
	const { mutate: editProfileTempMutation } = useMutation<any, any, { formData: FormData }>(
		async ({ formData }) => updateProfile(formData),
		{
			onSuccess: (res) => {
				if (res) {
					return res;
				}
			},
			onError: (res) => {
				const errorMessage = res.formData ? res.formData.data.description : "Try again!";
				toast.error(errorMessage);
			},
		}
	);

	return editProfileTempMutation;
};
