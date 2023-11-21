import { useLocalStorage } from "hooks/useLocalStorage";
import { STORAGE_USER_INFO_KEY, STORAGE_USER_PROFILE_IMAGE_TEMP_KEY, STORAGE_USER_TOKEN_KEY } from "main";
import { UseMutateFunction, useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "./client/webClient";
import apiConfig from "./client/endpoint";

type IAccountOtp = UseMutateFunction<
	any,
	any,
	{
		emailId: string;
		otp?: string;
	},
	any
>;

type IUseRegisterTemp = UseMutateFunction<
	any,
	any,
	{
		firstName: string;
		middleName: string;
		lastName: string;
		emailId: string;
		phoneNumber: string;
	},
	any
>;

type IUseRegister = UseMutateFunction<
	any,
	any,
	{
		tempId: string;
		otp: string;
		password: string;
	},
	any
>;

async function accountTemp(
	firstName: string,
	middleName: string,
	lastName: string,
	emailId: string,
	phoneNumber: string
): Promise<any> {
	const response = await api
		.post(
			apiConfig.POST.REGISTER_USER,
			{
				firstName: firstName,
				middleName: middleName,
				lastName: lastName,
				email: emailId,
				phoneNumber: phoneNumber,
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
				// console.log("user registered: ", response);
				return response;
			},
			(error) => {
				console.log(error);
				throw error;
			}
		);
	return response;
}

async function accountRegister(tempId: string, otp: string, password: string): Promise<any> {
	let userProfilePic: any = window.localStorage.getItem(STORAGE_USER_PROFILE_IMAGE_TEMP_KEY);
	const profileImage = JSON.parse(userProfilePic);

	const response = await api
		.put(
			apiConfig.PUT.USER_DETAIL,
			{
				userId: tempId,
				otp: otp,
				password: password,
				registrationId: 1,
				profileImage: profileImage,
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
				// console.log("user registered: ", response);
				return response;
			},
			(error) => {
				console.log(error);
				throw error;
			}
		);
	return response;
}

export const useRegisterTempAPI = (): IUseRegisterTemp => {
	const navigate = useNavigate();
	const [, setToken] = useLocalStorage(STORAGE_USER_TOKEN_KEY, null);
	const [, setUser] = useLocalStorage(STORAGE_USER_INFO_KEY, null);

	const { mutate: registerTempMutation } = useMutation<
		any,
		any,
		{ firstName: string; middleName: string; lastName: string; emailId: string; phoneNumber: string }
	>(
		async ({ firstName, middleName, lastName, emailId, phoneNumber }) =>
			accountTemp(firstName, middleName, lastName, emailId, phoneNumber),
		{
			onSuccess: (res) => {
				if (res) {
					setToken(res.token);
					if (res.isExistingUser && res.registrationId) {
						toast.success("User already exist.");
					} else {
						toast.success("User created successfully.");
					}
					setUser({ userId: res.userId });
				}
			},
			onError: (res) => {
				const errorMessage = res.response
					? res.response.data.description
					: "Oops.. Error on register. Try again!";
				toast.error(errorMessage);
			},
		}
	);

	return registerTempMutation;
};

export const useRegisterAPI = (): IUseRegister => {
	const navigate = useNavigate();
	const [, setUser] = useLocalStorage(STORAGE_USER_INFO_KEY, null);

	const { mutate: registerMutation } = useMutation<any, any, { tempId: string; otp: string; password: string }>(
		async ({ tempId, otp, password }) => await accountRegister(tempId, otp, password),
		{
			onSuccess: async (res) => {
				if (res && res.userId) {
					setUser({ userId: res.userId });
				} else if (res.valid) {
					toast.success(res.message);
				}
			},
			onError: (res) => {
				const errorMessage = res.response
					? res.response.data.description
					: "Oops.. Error on sign in. Try again!";
				toast.error(errorMessage);
			},
		}
	);

	return registerMutation;
};

async function generateOtp(emailId: string): Promise<any> {
	const generatedOtp = await api
		.post(
			apiConfig.POST.OTP_GENERATE,
			{
				emailId: emailId,
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

	return generatedOtp;
}

export const useOtpGenerationAPI = (): IAccountOtp => {
	const { mutate: useOtpGenerationMutation } = useMutation<any, any, { emailId: string }>(
		async ({ emailId }) => generateOtp(emailId),
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

	return useOtpGenerationMutation;
};

/**
 *
 * @param emailId validate otp
 * @param otp
 * @returns
 */
async function validateOtp(emailId: string, otp: string | undefined): Promise<any> {
	const validatedOtp = await api
		.post(
			apiConfig.POST.OTP_VALIDATE,
			{
				emailId: emailId,
				otp: otp,
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
				// console.log("Otp validate:", response);
				return response;
			},
			(error) => {
				console.log(error);
				throw error;
			}
		);

	return validatedOtp;
}

export const useOtpValidationAPI = (): IAccountOtp => {
	const { mutate: useOtpValidationMutation } = useMutation<any, any, { emailId: string; otp?: string }>(
		async ({ emailId, otp }) => validateOtp(emailId, otp),
		{
			onSuccess: (res) => {
				if (res.status === "success") {
					toast.success(res.message);
				} else {
					toast.error(res.message);
				}
			},
			onError: (error) => {
				toast.error(error.message);
				throw error;
			},
		}
	);

	return useOtpValidationMutation;
};
