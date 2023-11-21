import { InputAdornment, TextField, TextFieldProps, Typography } from "@mui/material";
import { Control, useController, UseControllerProps, ValidationRule, RegisterOptions } from "react-hook-form";

export type CustomTextFieldProps = {
	startAdornment?: JSX.Element;
	endAdornment?: JSX.Element;
	control?: Control<any, any>;
	pattern?: ValidationRule<RegExp>;
	required?: ValidationRule<boolean>;
	validate?: RegisterOptions["validate"];
};

export type RHFTextFieldProps = Omit<TextFieldProps, "name" | "required" | "pattern"> &
	CustomTextFieldProps &
	Pick<UseControllerProps, "name">;

export const RHFTextField = (props: RHFTextFieldProps) => {
	const {
		name,
		autoComplete,
		startAdornment,
		endAdornment,
		inputProps,
		InputProps,
		required,
		pattern,
		control,
		size = "small",
		validate,
		...textProps
	} = props;

	const { field, fieldState } = useController({
		name,
		control,
		rules: {
			required,
			pattern,
			validate,
		},
	});

	return (
		<div>
			<TextField
				{...textProps}
				{...field}
				autoComplete={autoComplete}
				required={required !== undefined}
				size={size}
				inputProps={{
					style: {
						padding: "10px",
						fontWeight: 500,
						fontSize: "14px",
					},
					...inputProps,
				}}
				InputProps={{
					startAdornment: startAdornment && (
						<InputAdornment position="start">{startAdornment}</InputAdornment>
					),
					endAdornment: endAdornment && <>{endAdornment}</>,
					...InputProps,
				}}
			/>
			{fieldState.error?.message && (
				<Typography width="100%" paddingLeft="2px" color="red" fontSize="12px" textAlign="left" marginTop="2px">
					{fieldState.error?.message}
				</Typography>
			)}
		</div>
	);
};
