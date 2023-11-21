import { Box } from "@mui/material";

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

export const TabPanel = (props: TabPanelProps) => {
	const { children, value, index } = props;

	return (
		<Box role="tabpanel" hidden={value !== index} aria-labelledby={`tab-${index}`}>
			{children}
		</Box>
	);
};
