import Grid2 from "@mui/material/Unstable_Grid2";
import { FilledSelect, FilledTextField, ProfileDetailsFormGroup } from "components/shared";
import { uiStrings, yesOrNoOptions, heightOptions, chronicConditions } from "main";
import { useForm } from "react-hook-form";
import { useMediaQuery, useTheme } from "@mui/material";
export const HealthFitnessProfileDetails = ({ control }: { control: any }) => {
	const {
		signUp: {
			//healthAndFitnessDetailsTip,
			//healthAndFitnessDetailsTitle,
			chronicCondition,
			weight,
			height,
			smoker,
		},
	} = uiStrings;
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const isTablet = useMediaQuery(theme.breakpoints.down("md"));
	if (!isMobile) {
		return (
			<ProfileDetailsFormGroup
				//title={healthAndFitnessDetailsTitle}
				//tip={healthAndFitnessDetailsTip}
				formContent={
					<>
						<Grid2 xs={12} sm={12} md={6} lg={6} xl={6} sx={{ paddingRight: "6px" }}>
							<FilledSelect
								label={height}
								options={heightOptions}
								required
								name={"fitnessProfile.height"}
								control={control}
							/>
						</Grid2>
						<Grid2 xs={12} sm={12} md={6} lg={6} xl={6} sx={{ paddingLeft: isTablet ? "0px" : "6px", paddingTop: isTablet ? "12px" : ""}}>
							<FilledTextField required={{
								value: true,
								message: "Please enter a valid weight",
							}} name="fitnessProfile.weight" label={weight} validate={{
								matchPattern: (v) => /^[0-9]*$/.test(v) || " Weight must be a number",
							}} control={control} />
						</Grid2>
						<Grid2 xs={12} sm={12} md={6} lg={6} xl={6} sx={{ paddingRight:  isTablet ? "0px" :"6px", paddingTop: "12px" }}>
							<FilledSelect
								label={chronicCondition}
								options={chronicConditions}
								required
								name={"fitnessProfile.chronicCondition"}
								control={control}
							/>
						</Grid2>
						<Grid2 xs={12} sm={12} md={6} lg={6} xl={6} sx={{ paddingLeft: isTablet ? "0px" : "6px", paddingTop: "12px" }}>
							<FilledSelect
								required
								label={smoker}
								options={yesOrNoOptions}
								name={"fitnessProfile.smoker"}
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
			//title={healthAndFitnessDetailsTitle}
			//tip={healthAndFitnessDetailsTip}
			formContent={
				<>
					<Grid2 xs={12} sm={12} md={12} lg={12} xl={12} sx={{ paddingRight: "" }}>
						<FilledSelect
							label={height}
							options={heightOptions}
							required
							name={"fitnessProfile.height"}
							control={control}
						/>
					</Grid2>
					<Grid2 xs={12} sm={12} md={12} lg={12} xl={12} sx={{ paddingTop: "12px" }}>
						<FilledTextField required={{
							value: true,
							message: "Please enter a valid weight",
						}} name="fitnessProfile.weight" label={weight} validate={{
							matchPattern: (v) => /^[0-9]*$/.test(v) || " Weight must be a number",
						}} control={control} />
					</Grid2>
					<Grid2 xs={12} sm={12} md={12} lg={12} xl={12} sx={{ paddingTop: "12px" }}>
						<FilledSelect
							label={chronicCondition}
							options={chronicConditions}
							required
							name={"fitnessProfile.chronicCondition"}
							control={control}
						/>
					</Grid2>
					<Grid2 xs={12} sm={12} md={12} lg={12} xl={12} sx={{ paddingTop: "12px" }}>
						<FilledSelect
							required
							label={smoker}
							options={yesOrNoOptions}
							name={"fitnessProfile.smoker"}
							control={control}
						/>
					</Grid2>
				</>
			}
		/>
	);
};
