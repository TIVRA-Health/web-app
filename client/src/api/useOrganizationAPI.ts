import { UseMutateFunction, useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { default as apiConfig, default as apiPaths } from "./client/endpoint";
import api from "./client/webClient";
import { v4 as uuidV4 } from "uuid";

interface FormData {
	organizationName: "";
	npi: "";
	yearsOfCoaching: "";
	address1: "";
	address2: "";
	state: "";
	city: "";
	zipCode: "";
}

type IUseCorporateAssociationTemp = UseMutateFunction<
	any,
	any,
	{
		formData: FormData;
	},
	any
>;

type IUseGetCorporate = UseMutateFunction<
	any,
	any,
	{
		orgName: string;
	},
	any
>;

// export const useGetOrganizationDataByNameAPI = (orgName: string) => {
// 	const url = apiConfig.GET.LOAD_ORGANIZATION_BY_NAME.replace("orgName", orgName);
// 	const randomUUID = uuidV4();
// 	return useQuery<any>(
// 		["get_organization_by_name_api_", randomUUID],
// 		() =>
// 			api
// 				.get(url, {
// 					headers: {
// 						"Content-Type": "application/json",
// 					},
// 				})
// 				.then(
// 					(resp) => {
// 						let response = resp.data;
// 						return response;
// 					},
// 					(error) => {
// 						console.log(error);
// 						throw error;
// 					}
// 				),
// 		{
// 			onSuccess: (res) => {
// 				console.log(res);
// 			},
// 			onError: (res) => {
// 				toast.error("Oops.. Error to get organizations. Try again!");
// 			},
// 		}
// 	);
// };

async function getOrganization(orgName: string): Promise<any> {
	const url = apiConfig.GET.LOAD_ORGANIZATION_BY_NAME.replace("orgName", orgName);
	const response = await api
		.get(url, {
			headers: {
				"Content-Type": "application/json",
			},
		})
		.then(
			(resp) => {
				let response = resp.data;
				// if (response.isNewOrg) {
				// 	toast.success(response.message);
				// } else {
				// 	toast.warn(response.message);
				// }
				return response;
			},
			(error) => {
				console.log(error);
				throw error;
			}
		);
	return response;
}

export const useGetOrganizationDataByNameAPI = (): IUseGetCorporate => {
	const { mutate: getOrganizationMutation } = useMutation<any, any, { orgName: string }>(
		async ({ orgName }) => getOrganization(orgName),
		{
			onSuccess: (res) => {
				// console.log(res);
				return res;
			},
			onError: (res) => {
				const errorMessage = res.formData ? res.formData.data.description : "Try again!";
				toast.error(errorMessage);
			},
		}
	);

	return getOrganizationMutation;
};

async function createOrganization(formData: FormData): Promise<any> {
	const response = await api
		.post(
			apiPaths.POST.CREATE_ORGANIZATION,
			{
				organizationName: formData.organizationName,
				npi: formData.npi,
				yearsOfCoaching: formData.yearsOfCoaching,
				address1: formData.address1,
				address2: formData.address2,
				state: formData.state,
				city: formData.city,
				zipCode: formData.zipCode,
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
				if (response.isNewOrg) {
					toast.success(response.message);
				} else {
					toast.warn(response.message);
				}
			},
			(error) => {
				console.log(error);
				throw error;
			}
		);
	return response;
}

export const useCreateOrganizationAPI = (): IUseCorporateAssociationTemp => {
	const { mutate: createOrganizationMutation } = useMutation<any, any, { formData: FormData }>(
		async ({ formData }) => createOrganization(formData),
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

	return createOrganizationMutation;
};
