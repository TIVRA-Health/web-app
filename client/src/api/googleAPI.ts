import { useMutation } from "react-query";
import { toast } from "react-toastify";
import apiConfig from "./client/endpoint";
import api from "./client/webClient";

async function validateAddress(address: string): Promise<any> {
	const response = await api
		.post(
			apiConfig.POST.GOOGLE_ADDRESS_VALIDATION,
			{
				address: {
					addressLines: [address],
				},
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
				if (!response.success) {
					toast.warn("Invalid Address");
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

export const useAddressValidationAPI = () => {
	const { mutate: registerMutation } = useMutation<any, any, { address: string }>(
		async ({ address }) => await validateAddress(address),
		{
			onSuccess: async (res) => {
				console.log(res);
			},
			onError: (res) => {
				const errorMessage = res.response
					? res.response.data.description
					: "Oops.. Error on Google address validation. Try again!";
				toast.error(errorMessage);
			},
		}
	);

	return registerMutation;
};
