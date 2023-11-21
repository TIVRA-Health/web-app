import { useQuery } from "react-query";
import { toast } from "react-toastify";

export interface AuthInfo {
	status: string;
	user_id: string;
	auth_url: string;
}

export interface UserInfo {
	status: string;
	user: User;
	is_authenticated: boolean;
}

export interface User {
	user_id: string;
	scopes: string;
	reference_id: any;
	provider: string;
	last_webhook_update: any;
}

export interface TerraException {
	status: string;
	message: string;
}

export const useTerraAuthUser = (enabled: boolean, resource: string, onError?: () => void) => {
	const terraAuthUser = useQuery<AuthInfo, TerraException>(
		["PRE_DEVICE_REGISTRATION", resource],
		() =>
			fetch(`https://localhost:7073/api/Auth/GetAuthUser?resource=${resource}`)
				.then((response) => response.json())
				.catch((err) => console.error(err)),
		{
			enabled: enabled && resource !== "",
			onError: (err) => {
				toast.error("Failed to register, Please try again.");
				onError?.();
			},
			onSuccess: (data) => {
				if (data.status !== "success") {
					toast.error("Failed to register, Please try again.");
					onError?.();
				}
			},
		}
	);

	return { terraAuthUser };
};

export const useTerraGetUser = (enabled: boolean, userId: string) => {
	const terraUser = useQuery<UserInfo, TerraException>(
		["PRE_DEVICE_REGISTRATION", userId],
		() =>
			fetch(`https://localhost:7073/api/Auth/UserInfo?userId=${userId}`)
				.then((response) => response.json())
				.catch((err) => console.error(err)),
		{
			enabled: enabled && userId !== "",
			refetchInterval: 250,
		}
	);

	return { terraUser };
};
