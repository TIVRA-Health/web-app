import { UseMutateFunction, useMutation } from "react-query";
import { toast } from "react-toastify";
import apiConfig from "./client/endpoint";
import api from "./client/webClient";

type IUseAIConsultationTemp = UseMutateFunction<
	any,
	any,
	{
		userResponse: string;
	},
	any
>;

async function askGpt(massage: string): Promise<any> {
	const response = await api
		.post(
			apiConfig.POST.AI_CONSULT,
			{
				message: massage,
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
				console.log(massage);

				return response;
			},
			(error) => {
				console.log(error);
				throw error;
			}
		);
	return response;
}

export const useAIConsultationAPI = (): IUseAIConsultationTemp => {
	const { mutate: aiConsultationMutation } = useMutation<any, any, { userResponse: string }>(
		async ({ userResponse }) => askGpt(userResponse),
		{
			onSuccess: (res) => {
				if (res) {
					return res;
				}
			},
			onError: (res) => {
				const errorMessage = res.response ? res.response.data.description : "Try again!";
				toast.error(errorMessage);
			},
		}
	);

	return aiConsultationMutation;
};
