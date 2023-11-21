import {
	Autocomplete,
	AutocompleteInputChangeReason,
	Box,
	Button,
	CircularProgress,
	TextField,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { useNutritionixFoodDetailAPI, useNutritionixSearchAPI } from "api/useNutritionAPI";
import { useAddNutritionLogAPI } from "api/useNutritionLogAPI";
import dayjs, { Dayjs } from "dayjs";
import { SyntheticEvent, useState } from "react";
import { toast } from "react-toastify";

export interface IFormState {
	name: any | null;
	quantity: string;
}

export const NutritionAddForm = ({ type, selectedDate }: { type: string; selectedDate: Dayjs }) => {
	// const addNutrition = useNutritionLogAPI();
	const addNutrition = useAddNutritionLogAPI();
	const [formState, setFormState] = useState<IFormState>({
		name: null,
		quantity: "",
	});
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedFoodDetail, setSelectedFoodDetail] = useState({});
	const [dataTable, setDataTable] = useState([]);

	const fdcFoodSearchData = useNutritionixSearchAPI(searchTerm);
	const nutritionFoodDetailApi = useNutritionixFoodDetailAPI();

	const addData = async (data: IFormState) => {
		
		console.log(data.name);
		console.log(selectedFoodDetail);
		if (data.name && data.quantity !== "") {
			const proteinInfo = data.name.foodNutrients.find((x: any) => x.nutrientName === "Protein");
			const cholesterolInfo = data.name.foodNutrients.find((x: any) => x.nutrientName === "Cholesterol");
			const fiberInfo = data.name.foodNutrients.find((x: any) => x.nutrientName === "Fiber, total dietary");
			const sugarInfo = data.name.foodNutrients.find(
				(x: any) => x.nutrientName === "Sugars, total including NLEA"
			);
			const fatInfo = data.name.foodNutrients.find((x: any) => x.nutrientName === "Total lipid (fat)");
			const caloriesInfo = data.name.foodNutrients.find((x: any) => x.nutrientName === "Energy");

			const protein = { value: proteinInfo?.value ?? 0, unitName: proteinInfo?.unitName ?? "" };
			const cholesterol = { value: cholesterolInfo?.value ?? 0, unitName: cholesterolInfo?.unitName ?? "" };
			const fiber = { value: fiberInfo?.value ?? 0, unitName: fiberInfo?.unitName ?? "" };
			const sugar = { value: sugarInfo?.value ?? 0, unitName: sugarInfo?.unitName ?? "" };
			const fat = { value: fatInfo?.value ?? 0, unitName: fatInfo?.unitName ?? "" };
			const calories = { value: caloriesInfo?.value ?? 0, unitName: caloriesInfo?.unitName ?? "" };
			const itemQty = Number(data.quantity);

			const newItem = {
				itemName: `${data.name.description} ${data.name.brandName ?? ""}`,
				itemQty: { unit: "", value: itemQty },
				calories: {
					value: Number(((calories?.value ?? 0) * itemQty).toFixed(2)),
					unit: calories?.unitName ?? "",
				},
				fat: { value: Number(((fat?.value ?? 0) * itemQty).toFixed(2)), unit: fat?.unitName ?? "" },
				sugar: { value: Number(((sugar?.value ?? 0) * itemQty).toFixed(2)), unit: sugar?.unitName ?? "" },
				protein: {
					value: Number(((protein?.value ?? 0) * itemQty).toFixed(2)),
					unit: protein?.unitName ?? "",
				},
				fiber: { value: Number(((fiber?.value ?? 0) * itemQty).toFixed(2)), unit: fiber?.unitName ?? "" },
				cholesterol: {
					value: Number(((cholesterol?.value ?? 0) * itemQty).toFixed(2)),
					unit: cholesterol?.unitName ?? "",
				},
			};

			const dayjsDate = selectedDate.toString();
			const mongodbFormattedDate = dayjs(dayjsDate).format();
			const dateObj = new Date(mongodbFormattedDate);
			const date = dateObj.toISOString().split("T")[0];

			const newNutritionLog = {
				itemName: newItem.itemName,
				calories: newItem.calories.value + newItem.calories.unit,
				cholesterol: newItem.cholesterol.value + newItem.cholesterol.unit,
				fat: newItem.fat.value + newItem.fat.unit,
				protein: newItem.protein.value + newItem.protein.unit,
				fiber: newItem.fiber.value + newItem.fiber.unit,
				sugar: newItem.sugar.value + newItem.sugar.unit,
				itemQty: newItem.itemQty.value + newItem.itemQty.unit,
				item: type,
				creationTs: date,
			};

			addNutrition(newNutritionLog, {
				onSuccess: () => {
					console.log("success");
				},
			});
		} else {
			toast.warn("Please fill missing data.");
		}
	};

	const onSubmit = () => {
		if (searchTerm && formState.quantity != "") {
			nutritionFoodDetailApi(
				{ foodName: formState.name, qty: formState.quantity },
				{
					onSuccess: (res) => {
						setSelectedFoodDetail(res);
						
						addData(res);
						
					},
					onError: (err) => {
						console.log(err);
					},
				}
			);
		}
	};

	const onInputChange = (_event: SyntheticEvent, value: string, reason: AutocompleteInputChangeReason) => {
		if (reason === "reset") {
			setFormState((ps) => ({ ...ps, name: null }));
			return;
		} else if (_event.type === "change") {
			setSearchTerm(value);
		}
	};
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<Box display="flex" flexDirection="row" gap={2}>
			<Autocomplete
				renderOption={(props, option) => {
					return (
						<li {...props} key={option.fdcId}>
							{option.description} {option.brandName ?? ""}
						</li>
					);
				}}
				onChange={(_, newValue: any | null) => {
					setFormState((ps) => ({ ...ps, name: newValue }));
				}}
				getOptionLabel={(o) => `${o.description} ${o.brandName ?? ""}`}
				value={formState.name}
				disablePortal
				options={fdcFoodSearchData?.data?.foods?.map((x: any) => ({ ...x, key: x.fdcId })) ?? []}
				onInputChange={onInputChange}
				renderInput={(params) => (
					<TextField
						{...params}
						size="small"
						sx={{
							"& .MuiInputBase-root": {
								height: "46px",
								width: "320px", // Default width for non-mobile
							},
							"@media (max-width: 600px)": {
								// Set styles for screens with a max width of 600px (adjust as needed)
								"& .MuiInputBase-root": {
									height: "46px", // Set height for mobile
									width: "170px", // Set width for mobile
								},
							},
						}}
						placeholder="Enter food item"
						InputProps={{
							...params.InputProps,
							endAdornment: (
								<>
									{fdcFoodSearchData?.isLoading && <CircularProgress color="inherit" size={20} />}
									{params.InputProps.endAdornment}
								</>
							),
						}}
					/>
				)}
			/>
			<TextField
				autoComplete="off"
				type="number"
				inputProps={{ min: 1 }}
				placeholder="Qty"
				size="small"
				sx={{
					"& .MuiInputBase-root": {
						height: 46,
						width: "70px",
					},
				}}
				onChange={({ target: { value } }) => {
					setFormState((ps) => ({ ...ps, quantity: value }));
				}}
			/>
			<Button sx={{ color: "#FFF" }} onClick={onSubmit}>
				Add
			</Button>
		</Box>
	);
};
