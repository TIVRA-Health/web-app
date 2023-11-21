import Grid2 from "@mui/material/Unstable_Grid2";
import { useMediaQuery, useTheme } from "@mui/material";
import { FilledSelect, FilledTextField, ProfileDetailsFormGroup } from "components/shared";
import { genderOptions, uiStrings } from "main";
import { FilledDatePicker } from "components/shared/FilledDatePicker";

export const DemographicDetails = ({ control }: { control: any }) => {
	const {
		signUp: { gender, dateOfBirth, address1, address2, city, state, country, zipCode },
	} = uiStrings;
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const isTablet = useMediaQuery(theme.breakpoints.down("md"));

	const validateDateOfBirth = (date: string | number | Date) => {
		const currentDate = new Date();
		const inputDate = new Date(date);
		const minDate = new Date();
		minDate.setFullYear(minDate.getFullYear() - 10); // User must be at least 10 years old

		if (inputDate > currentDate) {
			alert("Date of birth cannot be in the future.");
			return false;
		}

		if (inputDate > minDate) {
			alert("User must be at least 10 years old.");
			return false;
		}

		return true;
	};

	const handleDateOfBirthChange = (value: unknown) => {
		const dateOfBirth = value as string; // Assuming the value is a string
		const name = "demographicDetails.dob";

		if (validateDateOfBirth(dateOfBirth)) {
			control.setValue(name, dateOfBirth);
		}
	};
	if (!isMobile) {
		return (
			<ProfileDetailsFormGroup
				formContent={
					<>
						<Grid2 xs={12} sm={12} md={6} lg={6} xl={6} sx={{ paddingRight: "6px" }}>
							<FilledSelect
								required
								label={gender}
								options={genderOptions}
								name={"demographicDetails.gender"}
								control={control}
							/>
						</Grid2>
						<Grid2
							xs={12}
							sm={12}
							md={6}
							lg={6}
							xl={6}
							sx={{ paddingLeft: isTablet ? "0px" : "6px", paddingTop: isTablet ? "12px" : "" }}
						>
							<FilledDatePicker
								required
								label={dateOfBirth}
								name="demographicDetails.dob"
								control={control}
								onChange={handleDateOfBirthChange}
							/>
						</Grid2>
						<Grid2
							xs={12}
							sm={12}
							md={12}
							lg={6}
							xl={6}
							sx={{ paddingRight: isTablet ? "0px" : "6px", paddingTop: "12px" }}
						>
							<FilledTextField
								required
								name="demographicDetails.address1"
								label={address1}
								control={control}
							/>
						</Grid2>
						<Grid2
							xs={12}
							sm={12}
							md={12}
							lg={6}
							xl={6}
							sx={{ paddingLeft: isTablet ? "0px" : "6px", paddingTop: "12px" }}
						>
							<FilledTextField name="demographicDetails.address2" label={address2} control={control} />
						</Grid2>
						<Grid2
							xs={12}
							sm={12}
							md={6}
							lg={6}
							xl={6}
							sx={{ paddingRight: isTablet ? "0px" : "6px", paddingTop: "12px" }}
						>
							<FilledTextField
								required
								name="demographicDetails.city"
								label={city}
								validate={{
									matchPattern: (v) =>
										/^[A-Za-z\s]+$/.test(v) || " cannot contain numbers or special characters",
								}}
								control={control}
							/>
						</Grid2>
						<Grid2
							xs={12}
							sm={12}
							md={6}
							lg={6}
							xl={6}
							sx={{ paddingLeft: isTablet ? "0px" : "6px", paddingTop: "12px" }}
						>
							<FilledTextField
								required
								name="demographicDetails.state"
								label={state}
								validate={{
									matchPattern: (v) =>
										/^[A-Za-z\s]+$/.test(v) || " cannot contain numbers or special characters",
								}}
								control={control}
							/>
						</Grid2>
						<Grid2
							xs={12}
							sm={12}
							md={6}
							lg={6}
							xl={6}
							sx={{ paddingRight: isTablet ? "0px" : "6px", paddingTop: "12px" }}
						>
							<FilledTextField required name="demographicDetails.zip" label={zipCode} validate={{
								matchPattern: (v) => /^[0-9]+$/.test(v) || " ZIP code should contain only numbers",
							}} control={control} />
						</Grid2>
						<Grid2
							xs={12}
							sm={12}
							md={6}
							lg={6}
							xl={6}
							sx={{ paddingLeft: isTablet ? "0px" : "6px", paddingTop: "12px" }}
						>
							<FilledTextField
								required
								name="demographicDetails.country"
								label={country}
								validate={{
									matchPattern: (v) =>
										/^[A-Za-z\s]+$/.test(v) || " cannot contain numbers or special characters",
								}}
								control={control}
							/>
						</Grid2>
					</>
				}
			/>
		);
	}
	return (
		<ProfileDetailsFormGroup
			formContent={
				<>
					<Grid2 xs={12} sm={12} md={12} lg={12} xl={12} sx={{ paddingRight: "" }}>
						<FilledSelect
							required
							label={gender}
							options={genderOptions}
							name={"demographicDetails.gender"}
							control={control}
						/>
					</Grid2>
					<Grid2 xs={12} sm={12} md={12} lg={12} xl={12} sx={{ paddingRight: "", paddingTop: "12px" }}>
						<FilledDatePicker
							required
							label={dateOfBirth}
							name="demographicDetails.dob"
							control={control}
							onChange={handleDateOfBirthChange}
						/>
					</Grid2>
					<Grid2 xs={12} sm={12} md={12} lg={12} xl={12} sx={{ paddingRight: "", paddingTop: "12px" }}>
						<FilledTextField
							required
							name="demographicDetails.address1"
							label={address1}
							control={control}
						/>
					</Grid2>
					<Grid2 xs={12} sm={12} md={12} lg={12} xl={12} sx={{ paddingLeft: "", paddingTop: "12px" }}>
						<FilledTextField name="demographicDetails.address2" label={address2} control={control} />
					</Grid2>
					<Grid2 xs={12} sm={12} md={12} lg={12} xl={12} sx={{ paddingRight: "", paddingTop: "12px" }}>
						<FilledTextField
							required
							name="demographicDetails.city"
							label={city}
							validate={{
								matchPattern: (v) =>
									/^[A-Za-z\s]+$/.test(v) || "City name cannot contain numbers or special characters",
							}}
							control={control}
						/>
					</Grid2>
					<Grid2 xs={12} sm={12} md={12} lg={12} xl={12} sx={{ paddingLeft: "", paddingTop: "12px" }}>
						<FilledTextField
							required
							name="demographicDetails.state"
							label={state}
							validate={{
								matchPattern: (v) =>
									/^[A-Za-z\s]+$/.test(v) || " cannot contain numbers or special characters",
							}}
							control={control}
						/>
					</Grid2>
					<Grid2 xs={12} sm={12} md={12} lg={12} xl={12} sx={{ paddingRight: "", paddingTop: "12px" }}>
						<FilledTextField required name="demographicDetails.zip" label={zipCode} control={control} />
					</Grid2>
					<Grid2 xs={12} sm={12} md={12} lg={12} xl={12} sx={{ paddingLeft: "", paddingTop: "12px" }}>
						<FilledTextField
							required
							name="demographicDetails.country"
							label={country}
							validate={{
								matchPattern: (v) =>
									/^[A-Za-z\s]+$/.test(v) || " cannot contain numbers or special characters",
							}}
							control={control}
						/>
					</Grid2>
				</>
			}
		/>
	);
};
