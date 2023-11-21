import { FormControl, InputLabel, MenuItem, Select, styled } from "@mui/material";
import { Controller } from "react-hook-form";

interface ISelectOption {
	label: string;
	value: string;
}

interface IFilledSelectProps {
	label: string;
	outerLabel?: string;
	options: ISelectOption[];
	formControlStyle?: React.CSSProperties;
	required?: boolean;
	fullWidth?: boolean;
	disabled?: boolean;
	name: string;
	control?: any;
	
}

const InnerInputLabel = styled(InputLabel)(() => ({
	"&.Mui-focused": {
		color: "#898989",
	},
}));

export const FilledSelect = ({
	outerLabel,
	label,
	required,
	options,
	fullWidth = true,
	disabled = false,
	formControlStyle,
	name,
	control,
	
}: IFilledSelectProps) => {
	return (
		<>
			{outerLabel && (
				<InputLabel
					sx={{
						fontStyle: "normal",
						fontWeight: "500",
						fontSize: "12px",
						lineHeight: "15px",
						color: "#000000",
					}}
				>
					{outerLabel}
				</InputLabel>
			)}
			<FormControl
				size="small"
				variant="filled"
				fullWidth={fullWidth}
				required={required}
				style={formControlStyle}
			>
				<InnerInputLabel id="filled-select-label">{label}</InnerInputLabel>
				<Controller
					rules={{ required }}
					render={({ field }) => (
						<Select
							fullWidth={fullWidth}
							label={label}
							labelId="filled-select-label"
							disableUnderline={true}
							disabled={disabled}
							{...field}
						>
							{options?.map((po) => {
								return (
									<MenuItem key={po.value} value={po.value}>
										{po.label}
									</MenuItem>
								);
							})}
						</Select>
					)}
					name={name}
					control={control}
					
				/>
			</FormControl>
		</>
	);
};
