import { Box } from "@mui/material";
import { useAuthVerify } from "hooks/useAuthVerify";
import { InviteAndApprovals } from "./InviteAndApprovals";
import { MyConnectionsForm } from "./MyConnectionsForm";

export const MyConnections = () => {
	const { isAuthenticated } = useAuthVerify();

	if (!isAuthenticated) return null;

	return (
		<Box display="flex" flexDirection="column" gap={2}>
			<MyConnectionsForm />
			<InviteAndApprovals />
		</Box>
	);
};
