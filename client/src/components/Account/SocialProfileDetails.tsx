import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { FilledTextField, FilledSelect, ProfileDetailsFormGroup } from "components/shared";
import { uiStrings, educationLevels, yesOrNoOptions, incomeRanges } from "main";
import { useMediaQuery, useTheme } from "@mui/material";


export const SocialProfileDetails = ({ control }: { control: any }) => {
	const {
		signUp: {
			//socialDetailsTip,
			// socialDetailsTitle,
			educationLevel,
			incomeRange,
			healthCare,
			hospitalAssociated,
		},
	} = uiStrings;

	const defaultValues = {
		educationLevel: "",
		incomeRange: "",
		healthCare: "",
		hospitalAssociated: "",
	};
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const isTablet = useMediaQuery(theme.breakpoints.down("md"));
	if (!isMobile) {
		return (
			<ProfileDetailsFormGroup
				//title={socialDetailsTitle}
				//tip={socialDetailsTip}
				formContent={
					<>
						<Grid2 xs={12} sm={12} md={6} lg={6} xl={6} sx={{ paddingRight: "6px" }}>
							<FilledSelect
								label={educationLevel}
								options={educationLevels}
								required
								name={"socialProfile.educationLevel"}
								control={control}
							/>
						</Grid2>
						<Grid2 xs={12} sm={12} md={6} lg={6} xl={6} sx={{paddingLeft: isTablet ? "0px" : "6px", paddingTop: isTablet ? "12px" : "" }}>
							<FilledSelect
								label={incomeRange}
								options={incomeRanges}
								required
								name={"socialProfile.incomeRange"}
								control={control}
							/>
						</Grid2>
						<Grid2 xs={12} sm={12} md={6} lg={6} xl={6} sx={{ paddingRight:isTablet ? "0px" : "6px", paddingTop: "12px" }}>
							<FilledSelect
								label={healthCare}
								options={yesOrNoOptions}
								required
								name={"socialProfile.healthCare"}
								control={control}
							/>
						</Grid2>
						<Grid2 xs={12} sm={12} md={6} lg={6} xl={6} sx={{ paddingLeft: isTablet ? "0px" : "6px", paddingTop: "12px" }}>
							<FilledTextField
								required
								name="socialProfile.hospitalAssociated"
								label={hospitalAssociated}
								control={control}
							/>
						</Grid2>
					</>
				}
			/>
		);
	};
	return (
		<ProfileDetailsFormGroup
			//title={socialDetailsTitle}
			//tip={socialDetailsTip}
			formContent={
				<>
					<Grid2 xs={12} sm={12} md={12} lg={12} xl={12} sx={{ paddingRight: "" }}>
						<FilledSelect
							label={educationLevel}
							options={educationLevels}
							required
							name={"socialProfile.educationLevel"}
							control={control}
						/>
					</Grid2>
					<Grid2 xs={12} sm={12} md={12} lg={12} xl={12} sx={{ paddingLeft: "", paddingTop: "12px" }}>
						<FilledSelect
							label={incomeRange}
							options={incomeRanges}
							required
							name={"socialProfile.incomeRange"}
							control={control}
						/>
					</Grid2>
					<Grid2 xs={12} sm={12} md={12} lg={12} xl={12} sx={{ paddingRight: "", paddingTop: "12px" }}>
						<FilledSelect
							label={healthCare}
							options={yesOrNoOptions}
							required
							name={"socialProfile.healthCare"}
							control={control}
						/>
					</Grid2>
					<Grid2 xs={12} sm={12} md={12} lg={12} xl={12} sx={{ paddingLeft: "", paddingTop: "12px" }}>
						<FilledTextField
							required
							name="socialProfile.hospitalAssociated"
							label={hospitalAssociated}
							control={control}
						/>
					</Grid2>
				</>
			}
		/>
	);
};
