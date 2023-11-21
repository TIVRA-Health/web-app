import {
	Avatar,
	Badge,
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	styled,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { STORAGE_ICON_KEY } from "main";
import { useNavigate, useSearchParams } from "react-router-dom";

const metric = window.localStorage.getItem(STORAGE_ICON_KEY);
const metricIcons = JSON.parse(String(metric));

const StyledBadge = styled(Badge)(({ theme }) => ({
	"& .MuiBadge-badge": {
		backgroundColor: "#44b700",
		color: "#44b700",
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		"&::after": {
			position: "absolute",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			borderRadius: "50%",
			animation: "ripple 1.2s infinite ease-in-out",
			border: "1px solid currentColor",
			content: '""',
		},
	},
	"@keyframes ripple": {
		"0%": {
			transform: "scale(.8)",
			opacity: 1,
		},
		"100%": {
			transform: "scale(2.4)",
			opacity: 0,
		},
	},
}));

const InfoChip2 = ({ icon, unit, value, alt, selected }: any) => {
	return (
		<Box
			display="flex"
			gap={3}
			flexDirection="row"
			alignItems="center"
			padding="4px 8px"
			borderRadius="5px"
			sx={{
				minWidth: "100px",
				backgroundColor: "#fff",
				border: selected ? "none" : "1px solid  #EFEFF5",
				height: "44px",
			}}
		>
			{/* <img width="32" height="32" src={icon} alt={alt} /> */}
			{(metricIcons as any[]).map((metricIcon) => {
				if (metricIcon.image_name == icon) {
					return <img key={metricIcon._id} width="32" height="32" src={metricIcon.image_data} alt={alt} />;
				}
			})}
			<Box>
				<Typography fontSize="20px" fontWeight={600} lineHeight="24px" color="#3A3A3A" textAlign="center">
					{value}
				</Typography>
				{unit && (
					<Typography fontSize="12px" fontWeight={400} lineHeight="15px" color="#3A3A3A" textAlign="center">
						{unit}
					</Typography>
				)}
			</Box>
		</Box>
	);
};

const StyledTableCell = ({ title, align = "center" }: any) => {
	return (
		<TableCell
			sx={(theme) => ({
				fontWeight: 600,
				fontSize: "12px",
				lineHeight: "15px",
				color: theme.palette.primary.main,
			})}
			align={align}
		>
			{title}
		</TableCell>
	);
};
const StyledBadgeM = styled(Badge)(({ theme }) => ({
	"& .MuiBadge-badge": {
		backgroundColor: "#44b700",
		color: "#44b700",
		// boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		"&::after": {
			position: "relative",
			top: 0,
			left: 0,
			// width: "100%",
			height: "100%",
			borderRadius: "50%",
			animation: "ripple 1.2s infinite ease-in-out",
			border: "1px solid currentColor",
			content: '""',
		},
	},
	"@keyframes ripple": {
		"0%": {
			transform: "scale(.8)",
			opacity: 1,
		},
		"100%": {
			transform: "scale(1.6)",
			opacity: 0,
		},
	},
}));

const InfoChip2M = ({ icon, unit, value, alt, selected }: any) => {
	return (
		<Box
			display="flex"
			gap={0.5}
			flexDirection="row"
			alignItems="center"
			padding="0px 0px"
			borderRadius="5px"
			sx={{
				width:"55px",
				backgroundColor: "#fff",
				border: selected ? "none" : "1px solid  #EFEFF5",
				height: "44px",
			}}
		>
			{/* <img width="32" height="32" src={icon} alt={alt} /> */}
			{(metricIcons as any[]).map((metricIcon) => {
				if (metricIcon.image_name == icon) {
					return <img key={metricIcon._id} width="24" height="24" src={metricIcon.image_data} alt={alt} />;
				}
			})}
			<Box>
				<Typography fontSize="14px" fontWeight={600} lineHeight="24px" color="#3A3A3A" textAlign="center">
					{value}
				</Typography>
				{unit && (
					<Typography fontSize="14px" fontWeight={600} lineHeight="15px" color="#3A3A3A" textAlign="center">
						{unit}
					</Typography>
				)}
			</Box>
		</Box>
	);
};

const StyledTableCellM = ({ title, align = "center" }: any) => {
	return (
		<TableCell
			sx={(theme) => ({
				fontWeight: 500,
				fontSize: "12px",
				lineHeight: "10px",
				color: theme.palette.primary.main,
			})}
			align={align}
		>
			{title}
		</TableCell>
	);
};

const getIconUrl = (name: string) => {
	const iconURL = new URL(`../../assets/icons/${name}.svg`, import.meta.url).href;
	return iconURL;
};

export const MyTeamsTable = ({ rows, mateId, onRowClick }: any) => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const onRowSelection = (selectedUser: number) => {
		searchParams.delete("mateFilterBy");
		navigate({
			pathname: `/dashboard/my-team/${selectedUser}`,
			search: searchParams.toString(),
		});
		onRowClick(selectedUser); // Notify the parent component of row selection
	};

	// Extract dynamic column names from the first row (excluding 'id' and 'mateId')
	const columnNames =
		rows.length > 0
			? Object.keys(rows[0]).filter((columnName) => columnName !== "id" && columnName !== "mateId")
			: [];

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	if (!isMobile) {
		return (
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							{columnNames.map((columnName) => (
								<StyledTableCell key={columnName} title={columnName} />
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row: any) => {
							const selected = row.mateId === Number(mateId);
							return (
								<TableRow
									key={row.mateId}
									sx={{
										borderLeft: selected ? "5px solid #EA376B" : "none",
										backgroundColor: selected ? "#3910611A" : "#fff",
										"&:last-child td, &:last-child th": {
											border: 0,
										},
										"&:hover": {
											cursor: "pointer",
										},
									}}
									onClick={() => onRowSelection(row.mateId)}
								>
									{columnNames.map((columnName) => (
										<TableCell key={columnName} component="th" >
											<Box display="flex" flexDirection="column" alignItems="center" gap={0}>
												{/* Render cell content dynamically based on columnName */}
												{columnName.toUpperCase() === "PLAYER" && (
													<Box  display="flex" alignItems="center" flexDirection="column" >
														{row.player.active === "isEven" ? (
															<StyledBadge
																overlap="circular"
																anchorOrigin={{
																	vertical: "bottom",
																	horizontal: "right",
																}}
																variant="dot"
															>
																<Avatar alt={row.player.name} src={row.player.icon} />
															</StyledBadge>
														) : (
															<Avatar alt={row.player.name} src={row.player.icon} />
														)}
														<Typography
															fontSize="12px"
															lineHeight="15px"
															fontWeight={400}
															textAlign="center"
															sx={(theme) => ({
																color: theme.palette.primary.main,
																maxWidth: "120px",
																textOverflow: "ellipsis",
																whiteSpace: "nowrap",
																overflow: "hidden",
															})}
														>
															{row.player.name}
														</Typography>
													</Box>
													
												)}
												{columnName.toUpperCase() !== "PLAYER" && (
													<InfoChip2
														selected={selected}
														icon={row[columnName]?.icon}
														value={row[columnName]?.value}
														unit={row[columnName]?.unit}
														alt={columnName.toLowerCase()}
													/>
												)}
											</Box>
										</TableCell>
									))}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		);
	}
	return (
		<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							{columnNames.map((columnName) => (
								<StyledTableCell key={columnName} title={columnName} />
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row: any) => {
							const selected = row.mateId === Number(mateId);
							return (
								<TableRow
									key={row.mateId}
									sx={{
										borderLeft: selected ? "5px solid #EA376B" : "none",
										backgroundColor: selected ? "#3910611A" : "#fff",
										"&:last-child td, &:last-child th": {
											border: 0,
										},
										"&:hover": {
											cursor: "pointer",
										},
									}}
									onClick={() => onRowSelection(row.mateId)}
								>
									{columnNames.map((columnName) => (
										<TableCell key={columnName} component="th" >
											<Box display="flex" flexDirection="column" alignItems="center" gap={0}>
												{/* Render cell content dynamically based on columnName */}
												{columnName.toUpperCase() === "PLAYER" && (
													<Box  display="flex" alignItems="center" flexDirection="column" >
														{row.player.active === "isEven" ? (
															<StyledBadge
																overlap="circular"
																anchorOrigin={{
																	vertical: "bottom",
																	horizontal: "right",
																}}
																variant="dot"
															>
																<Avatar alt={row.player.name} src={row.player.icon} />
															</StyledBadge>
														) : (
															<Avatar alt={row.player.name} src={row.player.icon} />
														)}
														<Typography
															fontSize="12px"
															lineHeight="15px"
															fontWeight={400}
															textAlign="center"
															sx={(theme) => ({
																color: theme.palette.primary.main,
																maxWidth: "120px",
																textOverflow: "ellipsis",
																whiteSpace: "nowrap",
																overflow: "hidden",
															})}
														>
															{row.player.name}
														</Typography>
													</Box>
													
												)}
												{columnName.toUpperCase() !== "PLAYER" && (
													<InfoChip2M
														selected={selected}
														icon={row[columnName].icon}
														value={row[columnName].value}
														unit={row[columnName]?.unit}
														alt={columnName.toLowerCase()}
													/>
												)}
											</Box>
										</TableCell>
									))}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
	);
};
