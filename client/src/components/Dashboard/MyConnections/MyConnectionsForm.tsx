import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import { Header } from "../Header";
import { useAddInviteAPI } from "./useMyConnectionsAPI";
import { useForm } from "react-hook-form";
import { RHFTextField } from "components/shared/RHF/RHFTextField";

const defaultValues = { email: "", subject: "" };

export const MyConnectionsForm = () => {
	const addInviteMutation = useAddInviteAPI();
	const { handleSubmit, control } = useForm({
		defaultValues,
		mode: "onChange",
	});

	const onSubmit = (data: any) => {
		addInviteMutation.mutate(data);
	};
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	if (!isMobile) {
		return (
			<Box>
				<Header title="My Connections" />
				<Box
					padding="20px"
					sx={{ backgroundColor: "#fff", borderRadius: "8px", marginTop: "16px" }}
					display="flex"
					flexDirection="row"
					gap={2}
				>
					<RHFTextField
						size="small"
						name="email"
						type="text"
						control={control}
						required={{
							value: true,
							message: "Email-Id is required",
						}}
						placeholder="Enter email address"
						sx={{  height: "46px" }}
						inputProps={{ style: { padding: "12px" } }}
					/>
					<RHFTextField
						name="subject"
						placeholder="Subject"
						control={control}
						size="small"
						sx={{  height: "46px" }}
						inputProps={{ style: { padding: "12px" } }}
						required={{
							value: true,
							message: "Subject is required",
						}}
					/>
					<Button
						sx={{
							height: "46px",
							color: "#FFF",
							fontSize: "16px",
							fontWeight: 500,
							lineHeight: "20px",
							padding: "13px 16px",
						}}
						onClick={handleSubmit(onSubmit)}
					>
						Invite
					</Button>
				</Box>
			</Box>
		);
	};
	return (
		<Box>
			<Header title="My Connections" />
			<Box
				padding="20px"
				sx={{ backgroundColor: "#fff", borderRadius: "8px", marginTop: "16px" }}
				display="flex"
				flexDirection="column"
				gap={2}
			>
				<RHFTextField
					size="small"
					name="email"
					type="text"
					control={control}
					required={{
						value: true,
						message: "Email-Id is required",
					}}
					placeholder="Enter email address"
					sx={{ width: "100%", height: "46px" }}
					inputProps={{ style: { padding: "12px" } }}
				/>
				<RHFTextField
					name="subject"
					placeholder="Subject"
					control={control}
					size="small"
					sx={{ width: "100%", height: "46px" }}
					inputProps={{ style: { padding: "12px" } }}
					required={{
						value: true,
						message: "Subject is required",
					}}
				/>
				<Button
					sx={{
						height: "46px",
						color: "#FFF",
						fontSize: "16px",
						fontWeight: 500,
						lineHeight: "20px",
						padding: "13px 16px",
					}}
					onClick={handleSubmit(onSubmit)}
				>
					Invite
				</Button>
			</Box>
		</Box>
	);
};
