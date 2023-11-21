import CloseIcon from "@mui/icons-material/Close";
import {
	Box,
	IconButton,
	MenuItem,
	Modal,
	Paper,
	Select,
	useMediaQuery,
	useTheme
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Header } from "./Header";
import { InfoChip } from "./InfoChip";
import { MyTeamsTable } from "./MyTeamsTable";
import { ProfileSummary } from "./ProfileSummary";
import { TeammateProfile } from "./TeammateProfile";
// import { rows } from "./mockData";
import { useTeamInfoGetAPI } from "api/useTeamAPI";
import { useAuthVerify } from "hooks/useAuthVerify";
import { STORAGE_USER_INFO_KEY } from "main";
import "../../css/LoginStyle.css";

type MyTeamsParams = { mateId: string };

export const MyTeams = () => {
	const user = window.localStorage.getItem(STORAGE_USER_INFO_KEY);
	const userInfo = JSON.parse(String(user));

	const theme = useTheme();
	const params = useParams<MyTeamsParams>();

	const formattedName = userInfo?.firstName
		?.toLowerCase()
		.split(" ")
		.map((word: string) => word.charAt(0).toLocaleUpperCase() + word.slice(1))
		.join(" ");
	// const { user } = useAuth();
	const navigate = useNavigate();
	useAuthVerify();
	const [searchParams] = useSearchParams();
	const filterBy = searchParams.get("filterBy") ?? "live";
	const mateId = params.mateId ?? "";
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const [mateModalOpen, setMateModalOpen] = useState(false);
	const [selectedMate, setSelectedMate] = useState<string | null>(null);
	const [rows, setRows] = useState<any[]>([]);

	const getTeamInfoMutation: any = useTeamInfoGetAPI();
	useEffect(() => {
		if (getTeamInfoMutation?.data) {
			let res = [] as any;

			getTeamInfoMutation?.data.forEach((teamInfo: any) => {
				res.push(teamInfo);
			});
			setRows(res);
		}
	}, [getTeamInfoMutation?.data]);

	const changeFilter = ({ target: { value } }: any) => {
		navigate({
			pathname: "/dashboard/my-team",
			search: `?filterBy=${value}`,
		});
	};

	const openMateProfile = (mateId: string) => {
		setSelectedMate(mateId);
		setMateModalOpen(true);
	};

	const handleCloseMateModal = () => {
		setSelectedMate(null);
		setMateModalOpen(false);
	};
	if (!isMobile) {
		const val = true;
		return (
			<Grid2 container>
				<Grid2 md={6} xl={6} sx={{ paddingRight: "6px" }}>
					<Box padding="16px 24px" sx={{ backgroundColor: "#FFF", borderRadius: "8px", width: "100%" }}>
						<ProfileSummary
							name={formattedName ?? "User"}
							showBasicOnly
							role={userInfo?.roleName?.toUpperCase() ?? "Player"}
						/>
					</Box>
					<Box marginTop="16px">
						<Header title="Players" />
						<Box sx={{ backgroundColor: "#FFF" }} padding="16px 16px" borderRadius="8px">
							<Box display="flex" justifyContent="space-between" alignItems="center">
								<InfoChip label="Total members" value={rows.length} />
								{/* <Select
									value={filterBy}
									onChange={changeFilter}
									displayEmpty
									size="small"
									sx={(theme) => ({
										borderRadius: "4px",
										color: "#fff",
										border: "none",
										backgroundColor: theme.palette.secondary.main,
										"& .MuiSvgIcon-root": {
											color: "white",
										},
										"& fieldset": { border: "none" },
										minWidth: "110px",
									})}
								>
									<MenuItem value={"live"}>Live</MenuItem>
									<MenuItem value={"weekly"}>Weekly</MenuItem>
									<MenuItem value={"monthly"}>Monthly</MenuItem>
									<MenuItem value={"yearly"}>Yearly</MenuItem>
								</Select> */}
							</Box>
							<Grid2 marginTop={3}>
								<MyTeamsTable rows={rows} mateId={mateId} onRowClick={openMateProfile} />
							</Grid2>
						</Box>
					</Box>
				</Grid2>
				<Grid2 md={6} xl={6} sx={{ paddingLeft: "6px" }}>
					{mateId && <TeammateProfile mateId={mateId} rows={rows} />}
				</Grid2>
			</Grid2>
		);
	}
	return (
		<Grid2>
			<Grid2 md={6} xl={6} sx={{ paddingRight: "6px" }}>
				<Box padding="24px 0px" sx={{ backgroundColor: "#FFF", borderRadius: "8px" }}>
					<ProfileSummary
						name={formattedName ?? "User"}
						showBasicOnly
						role={userInfo?.roleName?.toUpperCase() ?? "Player"}
					/>
				</Box>
				<Box marginTop="16px">
					<Header title="Players" />
					<Box sx={{ backgroundColor: "#FFF" }} padding="" borderRadius="8px">
						<Box display="flex" justifyContent="space-between" alignItems="center">
							<InfoChip label="Total members" value={rows.length} />
							{/* <Select
								value={filterBy}
								onChange={changeFilter}
								displayEmpty
								size="small"
								sx={(theme) => ({
									borderRadius: "4px",
									color: "#fff",
									border: "none",
									backgroundColor: theme.palette.secondary.main,
									"& .MuiSvgIcon-root": {
										color: "white",
									},
									"& fieldset": { border: "none" },
									minWidth: "110px",
								})}
							>
								<MenuItem value={"live"}>Live</MenuItem>
								<MenuItem value={"weekly"}>Weekly</MenuItem>
								<MenuItem value={"monthly"}>Monthly</MenuItem>
								<MenuItem value={"yearly"}>Yearly</MenuItem>
							</Select> */}
						</Box>
						<Grid2 marginTop={3}>
							<MyTeamsTable rows={rows} mateId={mateId} onRowClick={openMateProfile} />
						</Grid2>
					</Box>
				</Box>
			</Grid2>

			<Modal open={mateModalOpen} onClose={handleCloseMateModal}>
				<Paper
					sx={{
						position: "absolute",
						left: "50%",
						top: "50%",
						marginTop: "40px",
						transform: "translate(-50%, -50%)",
						height: "90%",
						width: "93vw",

						padding: "16px" /* Add padding as needed */,
					}}
				>
					<Box padding={6}>
						<IconButton
							edge="end"
							onClick={handleCloseMateModal}
							aria-label="close"
							sx={{
								padding: "0px",
								position: "absolute",
								top: 1,
								right: 25,
								border: "2px solid red",
								color: "red",
							}}
						>
							<CloseIcon />
						</IconButton>
						{selectedMate !== null && <TeammateProfile mateId={selectedMate} rows={rows} />}
					</Box>
				</Paper>
			</Modal>
		</Grid2>
	);
};
