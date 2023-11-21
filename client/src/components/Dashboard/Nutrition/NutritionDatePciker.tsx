import { Box, Button, styled, useMediaQuery, useTheme } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TodayIcon from "@mui/icons-material/Today";
import dayjs, { Dayjs } from "dayjs";
import { HorizontalDatePicker } from "./HorizontalDatePicker";
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const StyledTodayButton = styled(Button)(() => ({
	width: "fit-content",
	color: "#391061",
	fontWeight: 500,
	fontSize: "16px",
	lineHeight: "19px",
	border: "1px solid #E3E3E3",
	backgroundColor: "transparent",
	"&:hover": {
		backgroundColor: "transparent",
		border: "1px solid #E3E3E3",
		boxShadow: 1,
	},
	"&:focus": {
		border: "1px solid #E3E3E3",
		backgroundColor: "transparent",
	},
	"&:active": {
		border: "1px solid #E3E3E3",
		backgroundColor: "transparent",
	},
	padding: 1,
}));
const StyledTodayButton1 = styled(Button)(() => ({
	position: 'absolute',   // Set the position to absolute
	top: '0',              // Adjust the top property to position it at the top of the header
	right: '20px',         // Adjust the right property to position it to the right
	width: 'fit-content',
	color: '#ffff',
	fontWeight: 500,
	fontSize: '16px',
	lineHeight: '19px',
	border: '1px solid #E3E3E3',
	backgroundColor: '#ed2f46',
	'&:hover': {
		color: '#391061',
		backgroundColor: '#ed2f46',
		border: '1px solid #E3E3E3',
		boxShadow: 1,
	},
	'&:focus': {
		border: '1px solid #E3E3E3',
		backgroundColor: '#ed2f46',
	},
	'&:active': {
		border: '1px solid #E3E3E3',
		backgroundColor: '#ed2f46',
	},
	padding: 1,
}));


interface DateSelectorProps {
	newSelectedDate: Dayjs;
	onDateChange: (newDate: Dayjs) => void; // Callback prop
}

export const NutritionDatePicker = ({ newSelectedDate, onDateChange }: DateSelectorProps) => {
	const [open, setOpen] = useState(false);
	const [update, setUpdate] = useState(true);
	const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

	const handleDateSelection = (newDate: Dayjs) => {
		onDateChange(newDate);
	};
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	if (!isMobile) {
		return (
			<Box padding="8px 16px" display="flex" flexDirection="row" alignItems="center">
				<Box display="flex" flexDirection="column" width="fit-content" justifyContent="center" alignItems="center">
					<StyledTodayButton
						startIcon={<TodayIcon />}
						disableRipple
						onClick={() => {
							setUpdate(true);
							setSelectedDate(dayjs());
							handleDateSelection(dayjs());
						}}
						variant="outlined"
						sx={{ padding: 1 }}
					>
						Today
					</StyledTodayButton>
					<DatePicker
						open={open}
						onOpen={() => setOpen(true)}
						onClose={() => setOpen(false)}
						value={selectedDate}
						onChange={(newValue) => {
							if (!newValue) return;
							setOpen(false);
							setSelectedDate(newValue);
							setUpdate(true);
							handleDateSelection(newValue);
						}}
						format="DD MMM, YYYY"
						slots={{ openPickerIcon: ExpandMoreIcon }}
						slotProps={{
							openPickerButton: {
								disableRipple: true,
								style: {
									fontSize: "14px",
									fontWeight: 500,
									lineHeight: "17px",
									color: "#000",
								},
							},
							textField: {
								inputProps: {
									style: {
										cursor: "pointer",
										fontSize: "14px",
										fontWeight: 500,
										lineHeight: "17px",
										color: "#391061",
									},
									readOnly: true,
								},
								sx: {
									width: "160px",
									backgroundColor: "transparent",
									"& fieldset": { border: "none" },
									"&:hover": { backgroundColor: "transparent" },
									"&:active": { backgroundColor: "transparent" },
									"&:focus": { backgroundColor: "transparent" },
									"&:focus-within": { backgroundColor: "transparent" },
								},
								onClick: () => setOpen(true),
							},
						}}
					/>
				</Box>
				<Box flexGrow={1} display="flex" flexDirection="row" alignItems="stretch">
					<HorizontalDatePicker
						onSelectDate={(newDate) => {
							setSelectedDate(dayjs(newDate));
							setUpdate(false);
							handleDateSelection(dayjs(newDate));
						}}
						selectedDate={selectedDate.toDate()}
						update={update}
					/>
				</Box>
			</Box>
		);
	};
	return (
		<Box padding="0px 0px" position={"relative"} display="flex" flexDirection="column" alignItems="center" marginTop={"0px"} >
			<Box display="flex" flexDirection="row" alignItems="stretch" gap={17} marginTop={"0px"}>
				<StyledTodayButton
					startIcon={<TodayIcon />}
					disableRipple
					onClick={() => {
						setUpdate(true);
						setSelectedDate(dayjs());
						handleDateSelection(dayjs());
					}}
					variant="outlined"
					sx={{ padding: 1 }}
				>
					Today
				</StyledTodayButton>
				<Box width={"px"}>
				<DatePicker
						open={open}
						onOpen={() => setOpen(true)}
						onClose={() => setOpen(false)}
						value={selectedDate}
						onChange={(newValue) => {
							if (!newValue) return;
							setOpen(false);
							setSelectedDate(newValue);
							setUpdate(true);
							handleDateSelection(newValue);
						}}
						format="DD MMM, YYYY"
						slots={{ openPickerIcon: ExpandMoreIcon }}
						slotProps={{
							openPickerButton: {
								disableRipple: true,
								style: {
									fontSize: "14px",
									fontWeight: 500,
									lineHeight: "17px",
									color: "#000",
								},
							},
							textField: {
								inputProps: {
									style: {
										cursor: "pointer",
										fontSize: "14px",
										fontWeight: 500,
										lineHeight: "17px",
										color: "#391061",
									},
									readOnly: true,
								},
								sx: {
									width: "125px",
									backgroundColor: "transparent",
									"& fieldset": { border: '1px solid #E3E3E3'},
									"&:hover": { backgroundColor: "transparent" },
									"&:active": { backgroundColor: "transparent" },
									"&:focus": { backgroundColor: "transparent" },
									"&:focus-within": { backgroundColor: "transparent" },
								},
								onClick: () => setOpen(true),
							},
						}}
					/>
				</Box>
			</Box>
			<Box display="flex" flexDirection="row" alignItems="stretch" marginTop={"5px"}>
				<HorizontalDatePicker
					onSelectDate={(newDate) => {
						setSelectedDate(dayjs(newDate));
						setUpdate(false);
						handleDateSelection(dayjs(newDate));
					}}
					selectedDate={selectedDate.toDate()}
					update={update}
				/>
			</Box>
		</Box>
	);
};
export const NutritionDatePickerM = ({ newSelectedDate, onDateChange }: DateSelectorProps) => {
	const [open, setOpen] = useState(false);
	const [update, setUpdate] = useState(true);
	const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

	const handleDateSelection = (newDate: Dayjs) => {
		onDateChange(newDate);
	};

	return (


		<StyledTodayButton
			startIcon={<TodayIcon />}
			disableRipple
			onClick={() => {
				setUpdate(true);
				setSelectedDate(dayjs());
				handleDateSelection(dayjs());
			}}
			variant="outlined"
			sx={{ padding: 1 }}
		>
			Today
		</StyledTodayButton>




	);
};