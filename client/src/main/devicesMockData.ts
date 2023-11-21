export const activeDevices = [
	{ key: "google-fit", icon: "google-fit", label: "Google Fit" },
	{ key: "samsung-health", icon: "samsung-health", label: "Samsung Health" },
	{ key: "garmin", icon: "garmin", label: "Garmin" },
	{ key: "fitbit", icon: "fitbit", label: "Fitbit" },
	{ key: "withings", icon: "withings", label: "Withings" },
];

export interface IDeviceItem {
	key: string;
	icon: string;
	label: string;
	active: boolean;
}
export const deviceList: IDeviceItem[] = [
	{
		icon: "rouvy",
		key: "rouvy",
		label: "Rouvy",
		active: true,
	},
	{
		icon: "google-fit",
		key: "google-fit",
		label: "Google Fit",
		active: true,
	},
	{
		icon: "biostrap",
		key: "biostrap",
		label: "Biostrap",
		active: true,
	},
	{
		icon: "fitbit",
		key: "fitbit",
		label: "Fitbit",
		active: false,
	},
	{
		icon: "bryton",
		key: "bryton",
		label: "Bryton",
		active: false,
	},
	{
		icon: "whoop",
		key: "whoop",
		label: "Whoop",
		active: false,
	},
	{
		icon: "wahoo",
		key: "wahoo",
		label: "Wahoo",
		active: false,
	},
	{
		icon: "training-peaks",
		key: "training-peaks",
		label: "Training Peaks",
		active: false,
	},
	{
		icon: "final-surge",
		key: "final-surge",
		label: "Final Surge",
		active: false,
	},
	{
		icon: "suunto",
		key: "suunto",
		label: "Suunto",
		active: false,
	},
	{
		icon: "hammerhead",
		key: "hammerhead",
		label: "Hammerhead",
		active: false,
	},
];
