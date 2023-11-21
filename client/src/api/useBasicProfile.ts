import { useForm } from "react-hook-form";

export interface IDemographicDetails {
	gender: string;
	dob: Date | "";
	address1: string;
	address2: string;
	city: string;
	state: string;
	zip: string;
	country: string;
}
export interface ICorporateDetails {
	organizationName: string;
	npiNumber: string;
	yearsOfCoaching: number | "";
	trackHealth: boolean | "";
	address1: string;
	address2: string;
	city: string;
	state: string;
	zip: string;
	country: string;
}
export interface ISocialProfile {
	educationLevel: string;
	incomeRange: string;
	healthCare: boolean | "";
	hospitalAssociated: string;
}

export interface IFitnessProfile {
	chronicCondition: string;
	weight: string;
	height: string;
	smoker: boolean | "";
}

export interface IBasicProfile {
	demographicDetails: IDemographicDetails | any;
	corporateProfile: ICorporateDetails | any;
	socialProfile: ISocialProfile | any;
	fitnessProfile: IFitnessProfile | any;
}

const defaultValues: IBasicProfile = {
	demographicDetails: {
		gender: "",
		dob: "",
		address1: "",
		address2: "",
		city: "",
		state: "",
		country: "",
		zip: "",
	},
	corporateProfile: {
		organizationName: "",
		npiNumber: "",
		yearsOfCoaching: "",
		trackHealth: "",
		address1: "",
		address2: "",
		city: "",
		state: "",
		zip: "",
		country: "",
	},
	socialProfile: {
		educationLevel: "",
		incomeRange: "",
		healthCare: "",
		hospitalAssociated: "",
	},
	fitnessProfile: {
		chronicCondition: "",
		weight: "",
		height: "",
		smoker: "",
	},
};

export const useBasicProfile = () => {
	const form = useForm({
		defaultValues,
		mode: "onChange",
	});

	const onSubmitCorporateAffiliationDetails = (data: any, callback: () => void) => {
		// console.log("onSubmitCorporateAffiliationDetails", JSON.stringify(data));
		callback();
	};

	const onSubmitDemographicDetails = (data: any, callback: () => void) => {
		// console.log("onSubmitDemographicDetails", JSON.stringify(data));
		callback();
	};

	const onSubmitDeviceDetails = (data: any, callback: () => void) => {
		// console.log("onSubmitDeviceDetails", JSON.stringify(data));
		callback();
	};

	const onSubmitHealthAndFitness = (data: any, callback: () => void) => {
		// console.log("onSubmitHealthAndFitness", JSON.stringify(data));
		callback();
	};

	return { form, onSubmitCorporateAffiliationDetails, onSubmitDemographicDetails, onSubmitDeviceDetails, onSubmitHealthAndFitness };
};
