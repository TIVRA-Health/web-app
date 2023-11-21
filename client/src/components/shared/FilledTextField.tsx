import { RHFTextField, RHFTextFieldProps } from "components/shared";

export const FilledTextField = ({ label, InputProps, control, ...rest }: Omit<RHFTextFieldProps, "variant">) => {
	return (
		<RHFTextField
			control={control}
			size="small"
			variant="filled"
			fullWidth
			{...rest}
			label={label}
			inputProps={{
				style: {
					height: "23px",
					fontWeight: 500,
					fontSize: "14px",
					borderRadius: "8px",
				},
			}}
			InputLabelProps={{
				style: {
					color: "#898989",
				},
			}}
			sx={{
				input: {
					backgroundColor: "#efeff5",
				},
			}}
			InputProps={{
				...InputProps,
				sx: {
					borderRadius: "8px",
					backgroundColor: "#efeff5",
					"&:hover": { backgroundColor: "#efeff5" },
					"&:focus": { backgroundColor: "#efeff5" },
					"&:focus-within": { backgroundColor: "#efeff5" },
				},
				disableUnderline: true,
			}}
		/>
	);
};
export const FilledTextFieldM = ({ label, InputProps, control, ...rest }: Omit<RHFTextFieldProps, "variant">) => {
	return (
		<RHFTextField
			control={control}
			size="small"
			variant="filled"
			fullWidth
			{...rest}
			label={label}
			inputProps={{
				style: {
					height: "23px",
					fontWeight: 500,
					fontSize: "14px",
					borderRadius: "8px",
				},
			}}
			InputLabelProps={{
				style: {
					color: "#898989",
				},
			}}
			sx={{
				input: {
					backgroundColor: "#efeff5",
				},
			}}
			InputProps={{
				...InputProps,
				sx: {
					borderRadius: "8px",
					backgroundColor: "#efeff5",
					"&:hover": { backgroundColor: "#efeff5" },
					"&:focus": { backgroundColor: "#efeff5" },
					"&:focus-within": { backgroundColor: "#efeff5" },
				},
				disableUnderline: true,
			}}
		/>
	);
};
