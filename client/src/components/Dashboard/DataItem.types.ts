export type DataType = "progress" | "string";

export interface IDataItem {
	type: DataType;
	label: string;
	icon: string;
	value?: string;
	secondaryValue?: string;
	customLabelColor?: string;
	customFontSize?: string;
	customLineHeight?: string;
	progressValue?: number;
	progressLabel?: JSX.Element;
}

export interface IGraphData {
	label: string;
	icon: string;
	data: any;
}
