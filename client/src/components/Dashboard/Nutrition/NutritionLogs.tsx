import { Box, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import { Dayjs } from "dayjs";
import { onlyUnique, toTitleCase } from "main/utils";
import { Daum } from "./Nutrition.types";
import { NutritionConsolidatedInfo } from "./NutritionConsolidatedInfo";
import { NutritionMealInfo } from "./NutritionMealInfo";

export const NutritionLogs = ({
	isLoading,
	data,
	selectedDate,
	onDelete,
	onUpdate,
}: {
	isLoading: boolean;
	data: Daum[];
	selectedDate: Dayjs;
	onDelete: (id: string) => void;
	onUpdate: (id: string) => void;
}) => {
	const uniqueItems = data?.map((x) => x.item).filter(onlyUnique) ?? [];
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	if (!isMobile) {
		return isLoading ? (
			<Box textAlign="center" padding="50px">
				<CircularProgress color="secondary" />
			</Box>
		) : (
			<>
				<NutritionConsolidatedInfo data={data} />
				<Box position="relative">
					{uniqueItems.map((item) => {
						const itemData = data.filter((x) => x.item === item);
						const mealInfo = { type: item, title: toTitleCase(item), data: itemData };
						return (
							<NutritionMealInfo
								key={item}
								data={mealInfo}
								selectedDate={selectedDate}
								onDelete={onDelete}
								onUpdate={onUpdate}
							/>
						);
					})}
				</Box>
			</>
		);
	}
	return isLoading ? (
		<Box textAlign="center" padding="50px">
			<CircularProgress color="secondary" />
		</Box>
	) : (
		<>
			{/* <NutritionConsolidatedInfo data={data} /> */}
			<Box position="relative">
				{uniqueItems.map((item) => {
					const itemData = data.filter((x) => x.item === item);
					const mealInfo = { type: item, title: toTitleCase(item), data: itemData };
					return (
						<NutritionMealInfo
							key={item}
							data={mealInfo}
							selectedDate={selectedDate}
							onDelete={onDelete}
							onUpdate={onUpdate}
						/>
					);
				})}
			</Box>
		</>
	);
};
