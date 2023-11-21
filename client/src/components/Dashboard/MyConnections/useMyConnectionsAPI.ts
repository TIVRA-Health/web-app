import { STORAGE_USER_INFO_KEY } from "main";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import api from "../../../api/client/webClient";
import apiConfig from "../../../api/client/endpoint";

export const useMyConnectionsAPI = (invitesQueryEnabled: boolean, approvalsQueryEnabled: boolean) => {
	let userData: any = window.localStorage.getItem(STORAGE_USER_INFO_KEY);
	userData = userData ? JSON.parse(userData) : {};

	const inviteUrl = apiConfig.GET.MY_INVITE.replace("userId", userData?.userId);
	const invitesQuery = useQuery<any>(
		["Get_My_Invites"],
		() =>
			api
				.get(inviteUrl, {
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
		{ enabled: invitesQueryEnabled }
	);

	const approvalUrl = apiConfig.GET.MY_APPROVAL.replace("userId", userData?.userId);
	const approvalsQuery = useQuery<any>(
		["Get_My_Approvals"],
		() =>
			api
				.get(approvalUrl, {
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
		{ enabled: approvalsQueryEnabled }
	);

	return { invitesQuery, approvalsQuery };
};

export const useAddInviteAPI = () => {
	let userData: any = window.localStorage.getItem(STORAGE_USER_INFO_KEY);
	userData = userData ? JSON.parse(userData) : {};

	const addInviteMutation = useMutation<any, any, { email: string; subject: string }>(
		async ({ email, subject }) =>
			await api
				.post(
					apiConfig.POST.SENT_INVITE,
					{
						senderUserId: userData?.userId,
						senderEmail: userData?.email,
						inviteEmail: email,
						subject: subject,
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
						console.log("user registered: ", response);

						return response;
					},
					(error) => {
						console.log(error);
						throw error;
					}
				),
		{
			onSuccess: (res) => {
				console.log("saved invitation: ", res);
				toast.success("Invitation sent successfully.");
			},
			onError: (res) => {
				toast.error("Unable to send Invite. Please try again after sometime.");
			},
		}
	);

	return addInviteMutation;
};

export const useRejectInviteAPI = () => {
	let userData: any = window.localStorage.getItem(STORAGE_USER_INFO_KEY);
	userData = userData ? JSON.parse(userData) : {};

	const addApproveInviteMutation = useMutation<any, any, { id: number; isRejected: boolean }>(
		async ({ id, isRejected }) =>
			await api
				.put(
					apiConfig.PUT.REJECT_INVITE,
					{
						id,
						isRejected,
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
						console.log("invite updated registered: ", response);
						return response;
					},
					(error) => {
						console.log(error);
						throw error;
					}
				),
		{
			onSuccess(data, variables, context) {
				console.log(variables);
				toast.success(`Invitation Rejected`);
			},
			onError: (res) => {
				// const errorMessage = res.response ? res.response.data.description : "Oops.. Error to get roles. Try again!";
				toast.error("Something went wrong. Please try again...");
			},
		}
	);

	return addApproveInviteMutation;
};

export const useApproveInviteAPI = () => {
	let userData: any = window.localStorage.getItem(STORAGE_USER_INFO_KEY);
	userData = userData ? JSON.parse(userData) : {};

	const addApproveInviteMutation = useMutation<any, any, { id: number; isApproved: boolean }>(
		async ({ id, isApproved }) =>
			await api
				.put(
					apiConfig.PUT.UPDATE_INVITE,
					{
						id,
						isApproved,
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
						console.log("invite updated registered: ", response);
						return response;
					},
					(error) => {
						console.log(error);
						throw error;
					}
				),
		{
			onSuccess(data, variables, context) {
				console.log(variables);
				toast.success(`Invitation Accepted`);
			},
			onError: (res) => {
				// const errorMessage = res.response ? res.response.data.description : "Oops.. Error to get roles. Try again!";
				toast.error("Something went wrong. Please try again...");
			},
		}
	);

	return addApproveInviteMutation;
};

export const useUpdateInviteStatusAPI = () => {
	const addApproveInviteMutation = useMutation<any, any, { id: number; status: string }>(
		async ({ id, status }) =>
			await api
				.put(
					apiConfig.PUT.UPDATE_INVITE,
					{
						id: id,
						status: status.toLowerCase(),
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
						console.log("invite updated: ", response);

						return response;
					},
					(error) => {
						console.log(error);
						throw error;
					}
				),
		{
			onSuccess(data, { status }, context) {
				toast.success(`Invitation ${status}.`);
			},
			onError: (res) => {
				toast.error("Something went wrong. Please try after sometime");
			},
		}
	);

	return addApproveInviteMutation;
};
