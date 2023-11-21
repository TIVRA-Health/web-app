import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useDeleteNutritionLogAPI, useGetNutritionLogAPI } from "api/useNutritionLogAPI";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { Daum, ValueUnitPair } from "./Nutrition.types";
import { NutritionDatePicker } from "./NutritionDatePciker";
import { NutritionLogs } from "./NutritionLogs";

export const splitIntoValueAndUnit = (input: string | undefined | null): ValueUnitPair | null => {
	if (input === undefined || input === null || input.trim() === "") {
		return {
			value: 0,
			unit: "",
		};
	}

	const valueAndUnit = input.split(/(\d+)/).filter(Boolean);

	const length = valueAndUnit?.length;
	if (length) {
		return {
			value: Number(valueAndUnit[0]),
			unit: valueAndUnit.length === 2 ? valueAndUnit[1] : "",
		};
	}

	return null;
};

const formatData = (inputArray: any[]): Daum[] => {
	return (
		inputArray?.map((x) => {
			return {
				calories: splitIntoValueAndUnit(x.calories),
				cholesterol: splitIntoValueAndUnit(x.cholesterol),
				fat: splitIntoValueAndUnit(x.fat),
				fiber: splitIntoValueAndUnit(x.fiber),
				protein: splitIntoValueAndUnit(x.protein),
				sugar: splitIntoValueAndUnit(x.sugar),
				id: x._id,
				item: x.item,
				itemName: x.itemName,
				itemQty: splitIntoValueAndUnit(x.itemQty),
			} as Daum;
		}) ?? []
	);
};

export const NutritionLog = () => {
	// const {
	// 	nutritionLogs: { isLoading, data },
	// } = useNutritionLogAPI(false, dayjs());
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
	const [data, setData] = useState("");
	const [status, setStatus] = useState("");

	const getNutritionLogAPI = useGetNutritionLogAPI();
	const deleteNutritionLog = useDeleteNutritionLogAPI();

	useEffect(() => {
		getNutritionLogAPI(
			{ selectedDate: selectedDate },
			{
				onSuccess: (resp: any) => {
					console.log(resp);
					setData(resp);
					setStatus("success");
				},
				onError: (err: any) => {
					setStatus("failure");
				},
			}
		);
	}, [getNutritionLogAPI, selectedDate, deleteNutritionLog]);
	if (!isMobile) {
	if (status === "success") {
		const formattedData = formatData(data as any);

		// Callback function to update selected date
		const handleDateChange = (newDate: Dayjs) => {
			setSelectedDate(newDate);
		};

		const onDelete = (id: string) => {
			deleteNutritionLog(
				{ nutritionLogId: id },
				{
					onSuccess: async (resp: any) => {
						console.log(resp);
						// After successful deletion, refresh the data
						getNutritionLogAPI(
							{ selectedDate: selectedDate },
							{
								onSuccess: (resp: any) => {
									console.log(resp);
									setData(resp);
									setStatus("success");
								},
								onError: (err: any) => {
									setStatus("failure");
								},
							}
						);
					},
					onError: (err: any) => {
						console.log(err);
					},
				}
			);
		};

		const onUpdate = (id: string) => {
			deleteNutritionLog(
				{ nutritionLogId: id },
				{
					onSuccess: (resp: any) => {
						console.log(resp);
					},
					onError: (err: any) => {
						console.log(err);
					},
				}
			);
		};

		return (
			<Box>
				<NutritionDatePicker newSelectedDate={selectedDate} onDateChange={handleDateChange} />
				<NutritionLogs
					isLoading={false}
					data={formattedData}
					selectedDate={selectedDate}
					onDelete={onDelete}
					onUpdate={onUpdate}
				/>
			</Box>
		);
	}
};
if (status === "success") {
	const formattedData = formatData(data as any);

	// Callback function to update selected date
	const handleDateChange = (newDate: Dayjs) => {
		setSelectedDate(newDate);
	};

	const onDelete = (id: string) => {
		deleteNutritionLog(
			{ nutritionLogId: id },
			{
				onSuccess: async (resp: any) => {
					console.log(resp);
					// After successful deletion, refresh the data
					getNutritionLogAPI(
						{ selectedDate: selectedDate },
						{
							onSuccess: (resp: any) => {
								console.log(resp);
								setData(resp);
								setStatus("success");
							},
							onError: (err: any) => {
								setStatus("failure");
							},
						}
					);
				},
				onError: (err: any) => {
					console.log(err);
				},
			}
		);
	};

	const onUpdate = (id: string) => {
		deleteNutritionLog(
			{ nutritionLogId: id },
			{
				onSuccess: (resp: any) => {
					console.log(resp);
				},
				onError: (err: any) => {
					console.log(err);
				},
			}
		);
	};

	return (
		<Box>
			<NutritionDatePicker newSelectedDate={selectedDate} onDateChange={handleDateChange} />
			<NutritionLogs
				isLoading={false}
				data={formattedData}
				selectedDate={selectedDate}
				onDelete={onDelete}
				onUpdate={onUpdate}
			/>
		</Box>
	);
}
};
