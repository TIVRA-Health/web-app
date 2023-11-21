import { CheckBoxOutlineBlankOutlined } from "@mui/icons-material";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import {
	AutocompleteInputChangeReason,
	Checkbox,
	FormControlLabel,
	TextField,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useGetOrganizationDataByNameAPI } from "api/useOrganizationAPI";
import { ProfileDetailsFormGroup } from "components/shared";
import { uiStrings } from "main";
import { SyntheticEvent, useEffect, useState } from "react";
import "./temp.css";

export const CorporateAffiliation = ({
	control,
	register,
	formState,
	setFormState,
}: {
	control: any;
	register: any;
	formState: any;
	setFormState: any;
}) => {
	const {
		signUp: {
			corporateAffiliationNote1,
			organizationName,
			npiNumber,
			corporateAddress1,
			corporateAddress2,
			city,
			state,
			zipCode,
			country,
			yearsOfCoaching,
		},
	} = uiStrings;

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const isTablet = useMediaQuery(theme.breakpoints.down("md"));

	const [searchTerm, setSearchTerm] = useState("");
	const [orgNameSearchData, setOrgNameSearchData] = useState<any>({});

	const [selectionMade, setSelectionMade] = useState(false);

	const orgNameSearchAPI = useGetOrganizationDataByNameAPI();

	useEffect(() => {
		orgNameSearchAPI(
			{ orgName: searchTerm },
			{
				onSuccess: (res: any) => {
					if (res?.data) {
						setOrgNameSearchData(res);
					}
				},
				onError: (err: any) => {
					console.log(err);
				},
			}
		);
	}, [searchTerm]);

	const [matchingOrgNames, setMatchingOrgNames] = useState<any>([]);
	const [showDropdown, setShowDropdown] = useState(false);

	useEffect(() => {
		const filteredOrgNames = orgNameSearchData?.data?.filter((org: any) =>
			org.organizationName.toLowerCase().includes(searchTerm.toLowerCase())
		);
		if (filteredOrgNames) {
			setMatchingOrgNames(filteredOrgNames?.map((org: any) => org));
			setShowDropdown(filteredOrgNames.length > 0);
		}
	}, [searchTerm, orgNameSearchData]);

	const onInputChange = (_event: SyntheticEvent, value: string, reason: AutocompleteInputChangeReason) => {
		if (reason === "reset") {
			setFormState((ps: any) => ({ ...ps, organizationName: "" }));
			return;
		} else if (_event.type === "change") {
			setSearchTerm(value);
		}
	};

	useEffect(() => {
		if (selectionMade) {
			console.log("Form state:", formState);
		}
	}, [selectionMade, formState]);

	const handleSelect = (event: any, value: any) => {
		if (value) {
			setFormState({
				organizationName: value.organizationName,
				npi: value.npi,
				yearsOfCoaching: value.yearsOfCoaching,
				address1: value.address1,
				address2: value.address2,
				state: value.state,
				city: value.city,
				zipCode: value.zipCode,
				country: value?.country,
			});
			console.log("Form state:", formState);
			setSelectionMade(true);
			setShowDropdown(false);
		}
	};

	const handleInputChange = (e: any) => {
		const { name, value } = e?.target;
		if (name === "organizationName") {
			setSearchTerm(value);
			if (!value) {
				setFormState({
					organizationName: "",
					npi: "",
					yearsOfCoaching: "",
					address1: "",
					address2: "",
					state: "",
					city: "",
					zipCode: "",
					country: "",
				});
				setSelectionMade(true);
				setShowDropdown(false);
			}
		}
		setFormState({ ...formState, [name]: value });
	};

	if (!isMobile) {
		return (
			<ProfileDetailsFormGroup
				formContent={
					<>
						<Grid2 xs={12} sm={12} md={6} lg={6} xl={6} sx={{ paddingRight: "6px " }}>
							<div className="search-container">
								<TextField
									name="organizationName"
									label={organizationName}
									required
									fullWidth
									value={formState?.organizationName}
									sx={{ height: "3.5em" }}
									placeholder="Search or Enter Organization name"
									onChange={handleInputChange}
								/>
								{showDropdown && (
									<ul className="dropdown">
										{matchingOrgNames.map((org: any, index: any) => (
											<li key={index} onClick={() => handleSelect(null, org)}>
												{org?.organizationName}
											</li>
										))}
									</ul>
								)}
							</div>
						</Grid2>
						<Grid2
							xs={12}
							sm={12}
							md={6}
							lg={6}
							xl={6}
							sx={{ paddingLeft: isTablet ? "0px" : "6px", paddingTop: isTablet ? "20px" : "" }}
						>
							<TextField
								required
								fullWidth
								sx={{ height: "3.5em" }}
								name="npi"
								label={npiNumber}
								value={formState?.npi}
								onChange={handleInputChange}
							/>
						</Grid2>
						<Grid2
							xs={12}
							sm={12}
							md={6}
							lg={6}
							xl={6}
							sx={{ paddingRight: isTablet ? "0px" : "6px", paddingTop: isTablet ? "20px" : "25px" }}
						>
							<TextField
								required
								fullWidth
								sx={{ height: "3.5em" }}
								name="yearsOfCoaching"
								label={yearsOfCoaching}
								value={formState?.yearsOfCoaching}
								onChange={handleInputChange}
							/>
						</Grid2>
						<Grid2
							xs={12}
							sm={12}
							md={6}
							lg={6}
							xl={6}
							sx={{ paddingLeft: isTablet ? "0px" : "6px", paddingTop: isTablet ? "20px" : "25px" }}
						>
							<TextField
								required
								fullWidth
								sx={{ height: "3.5em" }}
								name="address1"
								label={corporateAddress1}
								value={formState?.address1}
								onChange={handleInputChange}
							/>
						</Grid2>
						<Grid2
							xs={12}
							sm={12}
							md={6}
							lg={6}
							xl={6}
							sx={{ paddingRight: isTablet ? "0px" : "6px", paddingTop: isTablet ? "20px" : "25px" }}
						>
							<TextField
								fullWidth
								sx={{ height: "3.5em" }}
								name="address2"
								label={corporateAddress2}
								value={formState?.address2}
								onChange={handleInputChange}
							/>
						</Grid2>
						<Grid2
							xs={12}
							sm={12}
							md={6}
							lg={6}
							xl={6}
							sx={{ paddingRight: isTablet ? "0px" : "6px", paddingTop: isTablet ? "20px" : "25px" }}
						>
							<TextField
								required
								fullWidth
								sx={{ height: "3.5em" }}
								name="city"
								label={city}
								value={formState?.city}
								onChange={handleInputChange}
							/>
						</Grid2>
						<Grid2
							xs={12}
							sm={12}
							md={6}
							lg={6}
							xl={6}
							sx={{ paddingLeft: isTablet ? "0px" : "6px", paddingTop: isTablet ? "20px" : "25px" }}
						>
							<TextField
								required
								fullWidth
								sx={{ height: "3.5em" }}
								name="state"
								label={state}
								value={formState?.state}
								onChange={handleInputChange}
							/>
						</Grid2>
						<Grid2
							xs={12}
							sm={12}
							md={6}
							lg={6}
							xl={6}
							sx={{ paddingLeft: isTablet ? "0px" : "6px", paddingTop: isTablet ? "20px" : "25px" }}
						>
							<TextField
								required
								fullWidth
								sx={{ height: "3.5em" }}
								name="zip"
								label={zipCode}
								value={formState?.zipCode}
								onChange={handleInputChange}
							/>
						</Grid2>
						<Grid2
							xs={12}
							sm={12}
							md={6}
							lg={6}
							xl={6}
							sx={{ paddingRight: isTablet ? "0px" : "6px", paddingTop: isTablet ? "20px" : "25px" }}
						>
							<TextField
								required
								fullWidth
								sx={{ height: "3.5em" }}
								name="country"
								label={country}
								value={formState?.country}
								onChange={handleInputChange}
							/>
						</Grid2>
						<Grid2 md={12} lg={12} xl={12} paddingTop={0}>
							{/* <TCheckbox
							label={corporateAffiliationNote1}
							name="trackHealth"
							onChange={control}
						/> */}
							<FormControlLabel
								control={
									<Checkbox
										//
										icon={<CheckBoxOutlineBlankOutlined sx={{ strokeWidth: 0 }} />}
										checkedIcon={<CheckBoxOutlinedIcon />}
										sx={{
											color: "#898989",
											strokeWidth: 1,
											"&.Mui-checked": {
												color: "#898989",
											},
										}}
										value={"trackHealth"}
										onChange={handleInputChange}
										{...register("trackHealth")}
									/>
								}
								label={corporateAffiliationNote1}
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
						<div className="search-container">
							<TextField
								name="organizationName"
								label={organizationName}
								required
								fullWidth
								value={formState?.organizationName}
								sx={{ height: "3.5em" }}
								placeholder="Search or Enter Organization name"
								onChange={handleInputChange}
							/>
							{showDropdown && (
								<ul className="dropdown">
									{matchingOrgNames.map((org: any, index: any) => (
										<li key={index} onClick={() => handleSelect(null, org)}>
											{org?.organizationName}
										</li>
									))}
								</ul>
							)}
						</div>
					</Grid2>
					<Grid2 xs={12} sm={12} md={12} lg={12} xl={12} sx={{ paddingLeft: "", paddingTop: "25px" }}>
						<TextField
							required
							sx={{ height: "3.5em" }}
							fullWidth
							name="npi"
							label={npiNumber}
							value={formState.npi}
							onChange={handleInputChange}
						/>
					</Grid2>
					<Grid2 xs={12} sm={12} md={12} lg={12} xl={12} sx={{ paddingRight: "", paddingTop: "25px" }}>
						<TextField
							required
							fullWidth
							sx={{ height: "3.5em" }}
							name="yearsOfCoaching"
							label={yearsOfCoaching}
							value={formState.yearsOfCoaching}
							onChange={handleInputChange}
						/>
					</Grid2>
					<Grid2 xs={12} sm={12} md={12} lg={12} xl={12} sx={{ paddingLeft: "", paddingTop: "25px" }}>
						<TextField
							required
							sx={{ height: "3.5em" }}
							fullWidth
							name="address1"
							label={corporateAddress1}
							value={formState.address1}
							onChange={handleInputChange}
						/>
					</Grid2>
					<Grid2 xs={12} sm={12} md={12} lg={12} xl={12} sx={{ paddingRight: "", paddingTop: "25px" }}>
						<TextField
							fullWidth
							sx={{ height: "3.5em" }}
							name="address2"
							label={corporateAddress2}
							value={formState.address2}
							onChange={handleInputChange}
						/>
					</Grid2>
					<Grid2 xs={12} sm={12} md={12} lg={12} xl={12} sx={{ paddingLeft: "", paddingTop: "25px" }}>
						<TextField
							fullWidth
							sx={{ height: "3.5em" }}
							required
							name="state"
							label={state}
							value={formState.state}
							onChange={handleInputChange}
						/>
					</Grid2>
					<Grid2 xs={12} sm={12} md={12} lg={12} xl={12} sx={{ paddingRight: "", paddingTop: "25px" }}>
						<TextField
							fullWidth
							sx={{ height: "3.5em" }}
							required
							name="city"
							label={city}
							value={formState.city}
							onChange={handleInputChange}
						/>
					</Grid2>
					<Grid2 xs={12} sm={12} md={12} lg={12} xl={12} sx={{ paddingLeft: "", paddingTop: "25px" }}>
						<TextField
							fullWidth
							sx={{ height: "3.5em" }}
							required
							name="zip"
							label={zipCode}
							value={formState.zipCode}
							onChange={handleInputChange}
						/>
					</Grid2>
					<Grid2 md={12} lg={12} xl={12} paddingTop={0}>
						{/* <TCheckbox
						label={corporateAffiliationNote1}
						name="trackHealth"
						onChange={control}
					/> */}
						<FormControlLabel
							control={
								<Checkbox
									//
									icon={<CheckBoxOutlineBlankOutlined sx={{ strokeWidth: 0 }} />}
									checkedIcon={<CheckBoxOutlinedIcon />}
									size="small"
									sx={{
										color: "#898989",
										strokeWidth: 1,
										"&.Mui-checked": {
											color: "#898989",
										},
									}}
									value={"trackHealth"}
									onChange={handleInputChange}
									{...register("trackHealth")}
								/>
							}
							label={corporateAffiliationNote1}
						/>
					</Grid2>
				</>
			}
		/>
	);
};
