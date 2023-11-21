import { useLocalStorage } from "hooks/useLocalStorage";
import { STORAGE_USER_INFO_KEY, STORAGE_USER_TOKEN_KEY } from "main";
import { UseMutationResult, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiConfig from "./client/endpoint";
import api from "./client/webClient";

export interface LoginResponse {
	email: string;
	name: string;
	role: string;
	isSuccess: boolean;
}

async function signIn(username: string, password: string): Promise<any> {
	const response = await api
		.post(
			apiConfig.POST.SIGN_IN,
			{
				username: username,
				password: password,
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
				// console.log("Login successfully: ", response);
				return response;
			},
			(error) => {
				console.log(error);
				throw error;
			}
		);

	return response ? response : "";
}

type IUseSignIn = UseMutationResult<
	string,
	unknown,
	{
		username: string;
		password: string;
	},
	unknown
>;

export const useLoginAPI = (onLogin: () => void): IUseSignIn => {
	const navigate = useNavigate();
	const [, setToken] = useLocalStorage(STORAGE_USER_TOKEN_KEY, null);
	const [, setUser] = useLocalStorage(STORAGE_USER_INFO_KEY, null);

	const signInMutation = useMutation<any, any, { username: string; password: string }>(
		({ username, password }) => signIn(username, password),
		{
			onSuccess: (res) => {
				const token = res.token;
				if (token && token !== "") {
					setToken(token);
					setUser({ userId: res.userId });
					// console.log(token);
					onLogin();
				} else {
					toast.error("Oops.. Error on sign in. Please check the credentials!");
				}
			},
			onError: () => {
				toast.error("Oops.. Error on sign in. Try again!");
			},
		}
	);

	return signInMutation;
};

async function getUserData(): Promise<any> {
	const user = window.localStorage.getItem(STORAGE_USER_INFO_KEY);
	const userJson = user && user != "undefined" ? JSON.parse(String(user)) : null;

	const userId: string = userJson?.userId !== undefined ? userJson?.userId : userJson?._id;

	const url = apiConfig.GET.USER_INFO.replace("userId", userId);

	const response = await api
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
		);
	return response;
}

export const useUserInfoGetAPI = () => {
	const { mutate: getOrganizationMutation } = useMutation<any, any, any>(async () => getUserData(), {
		onSuccess: (res) => {
			// console.log(res);
			return res;
		},
		onError: (res) => {
			const errorMessage = res.formData ? res.formData.data.description : "Try again!";
			toast.error(errorMessage);
		},
	});

	return getOrganizationMutation;
};
