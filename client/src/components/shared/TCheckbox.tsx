import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

export const TCheckbox = ({ label, name, onChange }: any) => {
	return (
		<FormControlLabel
			control={<Checkbox color="primary" name={name} onChange={onChange} />}
			label={
				<Typography lineHeight="14px" fontSize="12px" color="#000" fontWeight={500}>
					{label}
				</Typography>
			}
		/>
	);
};
