import {
	Alert,
	Avatar,
	Box,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { getFormattedDate, stringAvatar } from "main/utils";
import { StyledActionButton, StyledTableCell, StyledTypography, StylesTableRowCell } from "./MyConnectonsInternal";
import { useApproveInviteAPI, useRejectInviteAPI } from "./useMyConnectionsAPI";

export const ConnectionsTableApprovals = ({ items }: { items: any[] }) => {
	const addApproveInviteMutation = useApproveInviteAPI();
	const addRejectInviteMutation = useRejectInviteAPI();

	const onApproveOrReject = (flow: string, id: number, isApproved: boolean) => () => {
		if (flow === "accept") {
			addApproveInviteMutation.mutate({ id, isApproved });
		} else if (flow === "reject") {
			addRejectInviteMutation.mutate({ id, isRejected: isApproved });
		}
	};
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	if (!isMobile) {
		return (
			<Box sx={{ backgroundColor: "#FFF" }} padding="16px 16px" borderRadius="8px" marginTop="8px">
				{items?.length > 0 ? (
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<StyledTableCell title="Profile" />
									<StyledTableCell title="Role" />
									<StyledTableCell title="Date" />
									<StyledTableCell title="Subject" />
									<StyledTableCell title="Action" />
								</TableRow>
							</TableHead>
							<TableBody>
								{items.map((x) => {
									let { id, userName, icon, role, subject, date, isApproved } = x;
									if (userName == "") {
										userName = "Unknown User";
									}
									return (
										<TableRow
											key={id}
											sx={{
												paddingTop: "10px",
												border: "10px solid #fff",
												"&:hover": {
													cursor: "pointer",
													backgroundColor: "#3910611A",
												},
											}}
										>
											<StylesTableRowCell align="left" sx={{ border: "none" }}>
												<Box
													justifyContent="left"
													alignItems="center"
													display="flex"
													flexDirection="row"
													gap={2}
												>
													<Avatar alt={userName} src={icon} {...stringAvatar(userName)} />
													<StyledTypography
														fontSize="12x"
														lineHeight="15px"
														textAlign="center"
														sx={(theme) => ({
															color: theme.palette.primary.main,
															maxWidth: "120px",
															textOverflow: "ellipsis",
															whiteSpace: "nowrap",
															overflow: "hidden",
														})}
													>
														{userName}
													</StyledTypography>
												</Box>
											</StylesTableRowCell>
											<StylesTableRowCell align="left">
												<StyledTypography fontSize="12x">{role}</StyledTypography>
											</StylesTableRowCell>
											<StylesTableRowCell align="left">
												<StyledTypography>{getFormattedDate(date)}</StyledTypography>
											</StylesTableRowCell>
											<StylesTableRowCell align="left">
												<StyledTypography>Not available</StyledTypography>
											</StylesTableRowCell>
											<StylesTableRowCell align="left">
												<Box
													justifyContent="left"
													alignItems="left"
													display="flex"
													flexDirection="row"
													gap={1}
												>
													{isApproved ? (
														<StyledActionButton
															kind="secondary"
															variant="outlined"
															onClick={onApproveOrReject("reject", id, true)}
														>
															Reject
														</StyledActionButton>
													) : (
														<StyledActionButton
															kind="primary"
															variant="outlined"
															onClick={onApproveOrReject("accept", id, true)}
														>
															Accept
														</StyledActionButton>
													)}
												</Box>
											</StylesTableRowCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>
				) : (
					<Alert severity="info">No data found.</Alert>
				)}
			</Box>
		);
	}
	return (
		<Box padding="2px" marginTop="8px">
			{items?.length > 0 ? (
				<Box sx={{ marginBottom: "16px" }}>
					{items.map((x) => {
						const { id, userName, icon, role, subject, date, isApproved } = x;

						return (
							<Box
								key={id}
								sx={{
									backgroundColor: "#FFF",
									marginBottom: "16px",
									padding: "16px",
									borderRadius: "10px",
									boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
									"&:hover": {
										cursor: "pointer",
										backgroundColor: "#3910611A",
									},
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
								}}
							>
								<Box
									width={"60px"}
									justifyContent="left"
									alignItems="top"
									display="flex"
									flexDirection="column"
									gap={1.5}
								>
									<Avatar alt={userName} src={icon} {...stringAvatar(userName)} />
									<Box fontSize="10px">{getFormattedDate(date)}</Box>
								</Box>

								<Box
									fontSize="12px"
									lineHeight="15px"
									justifyContent="left"
									alignItems="top"
									display="flex"
									flexDirection="column"
									gap={"5px"}
									width={"100px"}
								>
									<Box
										fontSize="14px"
										lineHeight="15px"
										sx={(theme) => ({
											color: theme.palette.primary.main,
											textOverflow: "ellipsis",
										})}
									>
										{userName}
									</Box>
									<Box fontSize="10px">{role}</Box>
								</Box>

								<Box>
									<Box alignItems="top" fontSize="10px">
										Not available
									</Box>
								</Box>

								<Box justifyContent="left" alignItems="left" display="flex" flexDirection="row" gap={2}>
									{isApproved ? (
										<StyledActionButton
											kind="secondary"
											variant="outlined"
											onClick={onApproveOrReject("reject", id, false)}
										>
											Reject
										</StyledActionButton>
									) : (
										<StyledActionButton
											kind="primary"
											variant="outlined"
											onClick={onApproveOrReject("accept", id, true)}
										>
											Accept
										</StyledActionButton>
									)}
								</Box>
							</Box>
						);
					})}
				</Box>
			) : (
				<Alert severity="info">No data found.</Alert>
			)}
		</Box>
	);
};
