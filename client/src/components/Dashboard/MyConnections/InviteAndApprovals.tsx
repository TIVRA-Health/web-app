import { Box, Button, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import { TabPanel } from "components/shared/TabPanel";
import { TivraTabs, ITivraTab } from "components/shared/TivraTabs";
import { useState } from "react";
import { ConnectionsTableInvite } from "./ConnectionsTableInvite";
import { ConnectionsTableApprovals } from "./ConnectionsTableApprovals";
import { useMyConnectionsAPI } from "./useMyConnectionsAPI";
import { useAuthVerify } from "hooks/useAuthVerify";

const tabs: ITivraTab[] = [
	{ key: "my-invites", label: "My Invites" },
	{ key: "my-approvals", label: "My Approvals" },
];

export const InviteAndApprovals = () => {
	const { isAuthenticated } = useAuthVerify();
	const [value, setValue] = useState(0);
	const { invitesQuery, approvalsQuery } = useMyConnectionsAPI(
		isAuthenticated && value === 0,
		isAuthenticated && value === 1
	);

	const onTabChange = (newValue: number) => {
		setValue(newValue);
	};
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	if (!isMobile) {
		return (
			<Box>
				<TivraTabs value={value} onTabChange={onTabChange} items={tabs} />
				<TabPanel value={value} index={0}>
					{invitesQuery.isLoading && (
						<Box textAlign="center" padding="50px">
							<CircularProgress color="secondary" />
						</Box>
					)}
					{invitesQuery.data && <ConnectionsTableInvite items={invitesQuery.data} />}
				</TabPanel>
				<TabPanel value={value} index={1}>
					{approvalsQuery.isLoading && (
						<Box textAlign="center" padding="50px">
							<CircularProgress color="secondary" />
						</Box>
					)}
					{approvalsQuery.data && <ConnectionsTableApprovals items={approvalsQuery.data} />}
				</TabPanel>
			</Box>
		);
	};
	return (
		<Box>
			<div>
				{tabs.map((tab, index) => (
					<Button
						key={index}
						variant="contained"
						onClick={() => onTabChange(index)}
						style={{
							borderRadius:"30px",
							backgroundColor: value === index ? '#EA376B' : '#ffff',
							color: value === index ? '#fff' : '#391061',
							marginRight:  '10px', 
						}}
					>{tab.label}
					</Button>
				))}
			</div>
			<div>
				{value === 0 && (
					<TabPanel value={value} index={0}>
						{invitesQuery.isLoading && (
							<Box textAlign="center" padding="50px">
								<CircularProgress color="secondary" />
							</Box>
						)}
						{invitesQuery.data && <ConnectionsTableInvite items={invitesQuery.data} />}
					</TabPanel>
				)}
				{value === 1 && (
					<TabPanel value={value} index={1}>
						{approvalsQuery.isLoading && (
							<Box textAlign="center" padding="50px">
								<CircularProgress color="secondary" />
							</Box>
						)}
						{approvalsQuery.data && <ConnectionsTableApprovals items={approvalsQuery.data} />}
					</TabPanel>
				)}
			</div>
		</Box>
	);
};
