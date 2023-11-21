import { Box, Tab, Tabs, Theme, useTheme } from "@mui/material";

const tabStyles =
	(addMargin = true) =>
	(theme: Theme) => ({
		color: "#3A3A3A",
		fontSize: "20px",
		lineHeight: "24px",
		fontWeight: 500,
		minHeight: "24px",
		padding: 0,
		minWidth: 0,
		marginRight: addMargin ? "24px" : 0,
		"&.Mui-selected": {
			color: theme.palette.secondary.main,
		},
	});

export interface ITivraTab {
	key: string;
	label: string;
}

interface ITivraTabsProps {
	value: number;
	onTabChange: (newValue: number) => void;
	items: ITivraTab[];
}

export const TivraTabs = ({ value, items, onTabChange }: ITivraTabsProps) => {
	const theme = useTheme();
	const itemsLength = items.length - 1;

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		onTabChange(newValue);
	};

	return (
		<Box height="36px">
			<Tabs
				value={value}
				onChange={handleChange}
				TabIndicatorProps={{
					sx: { backgroundColor: theme.palette.secondary.main, top: "26px", height: "1px" },
				}}
			>
				{items.map(({ key, label }, i) => {
					return <Tab key={key} disableRipple label={label} sx={tabStyles(i !== itemsLength)} />;
				})}
			</Tabs>
		</Box>
	);
};
export const TivraTabsM = ({ value, items, onTabChange }: ITivraTabsProps) => {
	const theme = useTheme();
	const itemsLength = items.length - 1;

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		onTabChange(newValue);
	};

	return (
		<Box height="36px">
			<Tabs
				value={value}
				onChange={handleChange}
				TabIndicatorProps={{
					sx: { backgroundColor: theme.palette.secondary.main, top: "26px", height: "1px" },
				}}
			>
				{items.map(({ key, label }, i) => {
					return <Tab key={key} disableRipple label={label} sx={tabStyles(i !== itemsLength)} />;
				})}
			</Tabs>
		</Box>
	);
};
const tabStylesss =
	(addMargin = true) =>
	(theme: Theme) => ({
		borderRadius:"30px",
							backgroundColor: '#ffff',
						
							marginRight:  '10px', 
		color: "#391061",
		fontSize: "14px",
	
		fontWeight: 500,
		height: "32px",
		padding: 0,
		minWidth: "90px",
		
		"&.Mui-selected": {
			backgroundColor:'#EA376B',
			color:'#fff',
		},
	});
export const TivraTabsss = ({ value, items, onTabChange }: ITivraTabsProps) => {
	const theme = useTheme();
	const itemsLength = items.length - 1;

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		onTabChange(newValue);
	};

	return (
		<Box height="36px">
			<Tabs
				value={value}
				onChange={handleChange}
				TabIndicatorProps={{
					sx: { backgroundColor: "transparent", top: "26px", height: "1px" },
				}}
			>
				{items.map(({ key, label }, i) => {
					return <Tab key={key} disableRipple label={label} sx={tabStylesss(i !== itemsLength)} />;
				})}
			</Tabs>
		</Box>
	);
};