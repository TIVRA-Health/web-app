import { Box, Button, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useCallback, useEffect, useRef, useState } from "react";
import { dayNames } from "main";
import dayjs from "dayjs";
import "../../../css/LoginStyle.css";
export const HorizontalDatePicker = ({
	selectedDate,
	onSelectDate,
	update,
}: {
	selectedDate: Date;
	onSelectDate: (date: Date) => void;
	update: boolean;
}) => {
	const [data, setData] = useState<Date[]>([]);
	const dayjsSelectedDate = dayjs(selectedDate);
	const threeDaysBefore = useRef(dayjsSelectedDate.add(-3, "day"));
	const threeDaysAfter = useRef(dayjsSelectedDate.add(3, "day"));

	const updateData = useCallback(() => {
		const dateArray = [];
		const currentDate = threeDaysBefore.current.toDate();
		while (currentDate <= threeDaysAfter.current.toDate()) {
			dateArray.push(new Date(currentDate));
			currentDate.setDate(currentDate.getDate() + 1);
		}
		setData(dateArray);
	}, [setData]);

	useEffect(() => {
		if (update) {
		  const dayjsSelectedDate = dayjs(selectedDate);
		  const daysBefore = isMobile ? 2 : 3; // Adjust daysBefore based on mobile or not
		  const daysAfter = isMobile ? 2 : 3; // Adjust daysAfter based on mobile or not
	  
		  threeDaysBefore.current = dayjsSelectedDate.subtract(daysBefore, "day");
		  threeDaysAfter.current = dayjsSelectedDate.add(daysAfter, "day");
		  updateData();
		}
	  }, [updateData, selectedDate, update,]);
	  
	  const onBack = () => {
		const daysBefore = isMobile ? 4 : 6; // Adjust daysBefore based on mobile or not
		threeDaysAfter.current = threeDaysBefore.current;
		threeDaysBefore.current = threeDaysBefore.current.subtract(1* daysBefore, "day"); // Subtract 4 days for non-mobile, 2 days for mobile
		updateData();
	  };
	  
	  const onNext = () => {
		const daysAfter = isMobile ? 4 : 6; // Adjust daysAfter based on mobile or not
		threeDaysBefore.current = threeDaysAfter.current;
		threeDaysAfter.current = threeDaysAfter.current.add(1 * daysAfter, "day"); // Add 4 days for non-mobile, 2 days for mobile
		updateData();
	  };
	  
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	if (!isMobile){
	return (
		<Box
			display="flex"
			flexDirection="row"
			width="fit-content"
			justifyContent="center"
			alignItems="center"
			flexGrow={1}
		>
			<IconButton disableRipple onClick={onBack}>
				<ChevronLeftIcon />
			</IconButton>
			<Grid2 container display="flex" justifyContent="space-between" gap={1}>
				{data.map((d, i) => {
					const dayName = dayNames[d.getDay()].substring(0, 3);
					//const monthName = monthNames[d.getMonth()].substring(0, 3);
					const dateString = ("0" + d.getDate()).slice(-2);
					const isSelected = d.toDateString() === selectedDate.toDateString();

					return (
						<Grid2 key={i}>
							<Button
								disableRipple
								sx={{
									width: "fit-content",
									color: "#000",
									fontWeight: 500,
									fontSize: "16px",
									lineHeight: "19px",
									backgroundColor: "transparent",
									"&:hover": {
										backgroundColor: "transparent",
									},
									"&:focus": {
										backgroundColor: "transparent",
									},
									"&:active": {
										backgroundColor: "transparent",
									},
									padding: 1,
								}}
								onClick={() => onSelectDate(d)}
								variant="text"
							>
								<Box
									display="flex"
									flexDirection="column"
									gap={1}
									justifyContent="center"
									alignItems="center"
								>
									<Typography
										fontWeight={500}
										fontSize="12px"
										lineHeight="22px"
										color="#000000"
										textAlign="center"
									>
										{dayName}
									</Typography>

									<Typography
										fontWeight={500}
										fontSize="12px"
										lineHeight="19px"
										textAlign="center"
										alignItems="center"
										border="1px solid #red"
										padding="8px"
										sx={(theme) => ({
											borderRadius: "50%",
											backgroundColor: isSelected ? theme.palette.secondary.main : "transparent",
											color: isSelected ? "#fff" : "#000",
										})}
									>
										{dateString}
									</Typography>
								</Box>
							</Button>
						</Grid2>
					);
				})}
			</Grid2>
			<IconButton disableRipple onClick={onNext}>
				<ChevronRightIcon />
			</IconButton>
		</Box>
	);
};
return (
	<Box
		display="flex"
		flexDirection="row"
		
		// width="fit-content"
		// justifyContent="center"
		// alignItems="center"
		flexGrow={1}
	>
		<IconButton  disableRipple onClick={onBack}>
			<ChevronLeftIcon />
		</IconButton>
		<div
    style={{
      overflowX: "auto",
      display: "flex",
      justifyContent: "center", // Center the items horizontally
      alignItems: "center", // Center the items vertically
      width: "100%", // Ensure the container takes full width
    }}
  >
		
			{data.map((d, i) => {
				const dayName = dayNames[d.getDay()].substring(0, 3);
				//const monthName = monthNames[d.getMonth()].substring(0, 3);
				const dateString = ("0" + d.getDate()).slice(-2);
				const isSelected = d.toDateString() === selectedDate.toDateString();

				return (
				
					<div
          key={i}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "4px", // Adjust padding for mobile
			
          }}
        >
						<Button
							disableRipple
							sx={{
								width: "fit-content",
								color: isSelected ? "#fff" : "#000",
								fontWeight: 500,
								fontSize: "16px",
								lineHeight: "19px",
								backgroundColor: isSelected ? "#391061" : "#fff", // Set background color when selected
								"&:hover": {
								  backgroundColor: isSelected ? "#391061" : "transparent",
								},
								"&:focus": {
								  backgroundColor: isSelected ? "#391061" : "#fff", // Set background color when focused
								},
								"&:active": {
								  backgroundColor: isSelected ? "#391061" : "#fff", // Set background color when active
								},
								padding: "5px 12px", // Adjust padding for smaller buttons
                                // Add margin for spacing between buttons
							}}
							onClick={() => onSelectDate(d)}
							variant="text"
						>
							<Box
								display="flex"
								flexDirection="column"
								gap={1}
								
								justifyContent="center"
								alignItems="center"
								sx={(theme) => ({
									borderRadius: "0%",
									backgroundColor: isSelected ? "#391061" : "  ",
									color: isSelected ? "#fff" : "#391061",
								})}
							><Typography
							fontWeight={500}
							fontSize="14px"
							lineHeight="19px"
							textAlign="center"
							alignItems="center"
							// border="1px solid #red"
							padding="8px"
							
						>
							{dateString}
						</Typography>
								<Typography
									fontWeight={500}
									fontSize="14px"
									lineHeight="22px"
									
									textAlign="center"
								>
									{dayName}
								</Typography>

								
							</Box>
						</Button>
					</div>
					
				);
			})}
		</div>
		
		<IconButton disableRipple onClick={onNext}>
			<ChevronRightIcon />
		</IconButton>
	</Box>
);
};
