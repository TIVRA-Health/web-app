import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useState } from "react";
import { Controller } from "react-hook-form";

export interface IFilledDatePickerProps extends DatePickerProps<unknown> {
	required?: boolean;
	name: string;
	control?: any;
}

export const FilledDatePicker = ({ required, slotProps, name, control, ...rest }: IFilledDatePickerProps) => {
	// Function to check if a date is in the future
	const isFutureDate = (date: Date) => {
		const currentDate = new Date();
		return date > currentDate;
	  };

	return (
		<Controller
			name={name}
			control={control}
			rules={{ required }}
			render={({ field: { ref, ...restFields } }) => (
				<DatePicker
					{...rest}
					shouldDisableDate={isFutureDate} // Restrict future dates
					slotProps={{
						...slotProps,
						textField: {
							required: required,
							fullWidth: true,
							variant: "filled",
							size: "small",
							inputProps: {
								style: {
									height: "23px",
									fontWeight: 500,
									fontSize: "14px",
									borderRadius: "8px",
								},
							},
							InputLabelProps: {
								style: {
									color: "#898989",
								},
							},
							sx: {
								input: {
									backgroundColor: "#efeff5",
								},
							},
							InputProps: {
								sx: {
									borderRadius: "8px",
									backgroundColor: "#efeff5",
									"&:hover": { backgroundColor: "#efeff5" },
									"&:focus": { backgroundColor: "#efeff5" },
									"&:focus-within": { backgroundColor: "#efeff5" },
								},
								disableUnderline: true,
							},
						},
					}}
					inputRef={ref}
					{...restFields}
				/>
			)}
		/>
	);
};
