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
// import CommentIcon from "@mui/icons-material/Comment";
import {
	StyledActionButton,
	StyledTableCell,
	StyledTypography,
	StylesTableRowCell,
	availableStatus,
	isPendingRenew,
} from "./MyConnectonsInternal";
import { stringAvatar, getFormattedDate } from "main/utils";
import { useUpdateInviteStatusAPI } from "./useMyConnectionsAPI";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

export const ConnectionsTableInvite = ({ items }: { items: any[] }) => {
	const updateInviteStatusAPI = useUpdateInviteStatusAPI();

	const onButtonClick = (id: number, status: string) => () => {
		updateInviteStatusAPI.mutate({ id, status });
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
									<StyledTableCell title="Status" />
									<StyledTableCell align="center" title="Action" />
								</TableRow>
							</TableHead>
							<TableBody>
								{items.map((x) => {
									const { id, userName, icon, role, status, date, endDate, isApproved } = x;

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
												gap: "20px",
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
												<StyledTypography>
													{isPendingRenew(endDate)
														? availableStatus[3]
														: availableStatus[status]}
													{/* {comment !== "" && <CommentIcon />} */}
												</StyledTypography>
											</StylesTableRowCell>
											<StylesTableRowCell align="center">
												<Box
													justifyContent="center"
													alignItems="left"
													display="flex"
													flexDirection="row"
													gap={1}
												>
													{isApproved ? (
														<>
															<StyledActionButton
																kind="secondary"
																variant="outlined"
																onClick={onButtonClick(id, "Revoke")}
															>
																Revoke
															</StyledActionButton>
															<StyledActionButton
																kind="primary"
																variant="outlined"
																onClick={onButtonClick(id, "Renew")}
															>
																Renew
															</StyledActionButton>
														</>
													) : (
														<>
															<StyledActionButton
																kind="primary"
																variant="outlined"
																onClick={onButtonClick(id, "Resend")}
															>
																Resend
															</StyledActionButton>
															<StyledActionButton
																kind="secondary"
																variant="outlined"
																onClick={onButtonClick(id, "Revoke")}
															>
																Revoke
															</StyledActionButton>
														</>
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
						const { id, userName, icon, role, status, date, endDate, isApproved } = x;

						return (
							<Box
								key={id}
								sx={{
									backgroundColor: "#FFF",
									marginBottom: "16px", // Add margin between items
									padding: "16px", // Add padding to each item
									borderRadius: "10px", // Add rounded corners
									boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)", // Add a shadow for depth
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
									gap={"20px"}
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
										{isPendingRenew(endDate) ? availableStatus[3] : availableStatus[status]}
										{/* {comment !== "" && <CommentIcon />} */}
									</Box>
								</Box>

								<Box
									justifyContent="left"
									alignItems="left"
									display="flex"
									flexDirection="column"
									gap={1}
								>
									{isApproved ? (
										<>
											<StyledActionButton
												kind="secondary"
												variant="outlined"
												onClick={onButtonClick(id, "Revoke")}
											>
												Revoke
											</StyledActionButton>
											<StyledActionButton
												kind="primary"
												variant="outlined"
												onClick={onButtonClick(id, "Renew")}
											>
												Renew
											</StyledActionButton>
										</>
									) : (
										<>
											<StyledActionButton
												kind="primary"
												variant="outlined"
												onClick={onButtonClick(id, "Resend")}
											>
												Resend
											</StyledActionButton>
											<StyledActionButton
												kind="secondary"
												variant="outlined"
												onClick={onButtonClick(id, "Revoke")}
											>
												Revoke
											</StyledActionButton>
										</>
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
