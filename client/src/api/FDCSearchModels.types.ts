export interface FDCFoodSearchData {
	totalHits: number;
	currentPage: number;
	totalPages: number;
	pageList: number[];
	foodSearchCriteria: FoodSearchCriteria;
	foods: Food[];
	aggregations: Aggregations;
}

export interface FoodSearchCriteria {
	query: string;
	generalSearchInput: string;
	pageNumber: number;
	sortBy: string;
	sortOrder: string;
	numberOfResultsPerPage: number;
	pageSize: number;
	requireAllWords: boolean;
}

export interface Food {
	fdcId: number;
	description: string;
	dataType: string;
	gtinUpc: string;
	publishedDate: string;
	brandOwner: string;
	brandName: string;
	ingredients: string;
	marketCountry: string;
	foodCategory: string;
	modifiedDate: string;
	dataSource: string;
	packageWeight?: string;
	servingSizeUnit: string;
	servingSize: number;
	tradeChannels: string[];
	allHighlightFields: string;
	score: number;
	microbes: any[];
	foodNutrients: FoodNutrient[];
	finalFoodInputFoods: any[];
	foodMeasures: any[];
	foodAttributes: any[];
	foodAttributeTypes: FoodAttributeType[];
	foodVersionIds: any[];
	subbrandName?: string;
	householdServingFullText?: string;
	shortDescription?: string;
}

export interface FoodNutrient {
	nutrientId: number;
	nutrientName: string;
	nutrientNumber: string;
	unitName: string;
	derivationCode: string;
	derivationDescription: string;
	derivationId: number;
	value: number;
	foodNutrientSourceId: number;
	foodNutrientSourceCode: string;
	foodNutrientSourceDescription: string;
	rank: number;
	indentLevel: number;
	foodNutrientId: number;
	percentDailyValue?: number;
}

export interface FoodAttributeType {
	name: string;
	description: string;
	id: number;
	foodAttributes: FoodAttribute[];
}

export interface FoodAttribute {
	value: string;
	name: string;
	id: number;
}

export interface Aggregations {
	dataType: DataType;
	nutrients: Nutrients;
}

export interface DataType {
	Branded: number;
	"Survey (FNDDS)": number;
	"SR Legacy": number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Nutrients {}
