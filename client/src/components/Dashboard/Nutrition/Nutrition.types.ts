export interface ValueUnitPair {
	value: number;
	unit: string;
}

export interface Daum {
	id: number;
	item: string;
	itemName: string;
	itemQty: ValueUnitPair;
	calories: ValueUnitPair;
	fat: ValueUnitPair;
	sugar: ValueUnitPair;
	protein: ValueUnitPair;
	fiber: ValueUnitPair;
	cholesterol: ValueUnitPair;
}

export interface MealInfo {
	type: string;
	title: string;
	data: Daum[];
}
