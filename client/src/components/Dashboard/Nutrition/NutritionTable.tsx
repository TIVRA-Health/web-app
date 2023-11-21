import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
	IconButton,
	Menu,
	MenuItem,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { useState } from "react";
import "../../../css/LoginStyle.css";
import { Daum } from "./Nutrition.types";
const StyledTableCell = ({ title, align = "center", width }: any) => {
	return (
		<TableCell
			sx={() => ({
				fontWeight: 500,
				fontSize: "14px",
				lineHeight: "17px",
				color: "#B9B9B9",
				borderBottom: "none",
				width,
			})}
			align={align}
		>
			{title}
		</TableCell>
	);
};

const StyledTableCellValue = ({ children, align = "center", sx, isLast = false, hasData = true }: any) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	if (!isMobile) {
		return (
			<TableCell
				sx={() => ({
					...sx,
					borderBottom: "none",
					fontSize: "14px",
					fontWeight: 500,
					lineHeight: "17px",
					color: "000000",
					paddingX: "16px",
					paddingBottom: "4px",
					paddingTop: isLast ? (hasData ? "20px" : "80px") : "4px",
					"& span": {
						textTransform: "lowercase",
					},
				})}
				align={align}
			>
				{children}
			</TableCell>
		);
	}
	return (
		<TableCell
			sx={() => ({
				...sx,
				borderBottom: "none",
				fontSize: "14px",
				fontWeight: 500,
				lineHeight: "17px",
				color: "000000",
				paddingX: "5px",
				paddingBottom: "4px",
				paddingTop: isLast ? (hasData ? "0px" : "8px") : "2px",
				"& span": {
					textTransform: "lowercase",
				},
			})}
			align={align}
		>
			{children}
		</TableCell>
	);
};

export const NutritionFoodRow = ({
	data: { id, itemName, itemQty, calories, cholesterol, fat, fiber, protein, sugar },
	onDelete,
	onUpdate,
}: {
	data: Daum;
	onDelete: (id: string) => void; // Define the delete function signature
	onUpdate: (id: string) => void; // Define the update function signature
}) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleDelete = () => {
		setAnchorEl(null);
		onDelete(String(id));
	};

	const handleUpdate = () => {
		setAnchorEl(null);
		onUpdate(String(id));
	};

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	if (!isMobile) {
		return (
			<TableRow
				key={String(id)}
				sx={{
					backgroundColor: "#F5F5F5",
					fontSize: "14px",
					fontWeight: 500,
					lineHeight: "17px",
				}}
			>
				<StyledTableCellValue
					align="left"
					sx={{
						borderTopLeftRadius: "8px",
						borderBottomLeftRadius: "8px",
					}}
				>
					{itemName}
				</StyledTableCellValue>
				<StyledTableCellValue>
					{itemQty.value}
					<span style={{ textTransform: "lowercase" }}>{itemQty.unit}</span>
				</StyledTableCellValue>
				<StyledTableCellValue>
					{calories.value}
					{/* <span style={{ textTransform: "lowercase" }}>{calories.unit}</span> */}
				</StyledTableCellValue>
				<StyledTableCellValue>
					{fat.value}
					{/* <span style={{ textTransform: "lowercase" }}>{fat.unit}</span> */}
				</StyledTableCellValue>
				<StyledTableCellValue>
					{sugar.value}
					{/* <span style={{ textTransform: "lowercase" }}>{sugar.unit}</span> */}
				</StyledTableCellValue>
				<StyledTableCellValue>
					{protein.value}
					{/* <span style={{ textTransform: "lowercase" }}>{protein.unit}</span> */}
				</StyledTableCellValue>
				<StyledTableCellValue>
					{fiber.value}
					{/* <span style={{ textTransform: "lowercase" }}>{fiber.unit}</span> */}
				</StyledTableCellValue>
				<StyledTableCellValue>
					{cholesterol.value}
					{/* <span style={{ textTransform: "lowercase" }}>{cholesterol.unit}</span> */}
				</StyledTableCellValue>
				<StyledTableCellValue
					sx={{
						borderTopRightRadius: "8px",
						borderBottomRightRadius: "8px",
					}}
				>
					<IconButton id="more-button" onClick={handleClick}>
						<MoreVertIcon sx={(t) => ({ color: t.palette.secondary.main })} />
					</IconButton>
					<Menu
						MenuListProps={{
							"aria-labelledby": "more-button",
						}}
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
					>
						{/* <MenuItem onClick={handleUpdate}>Update</MenuItem> */}
						<MenuItem onClick={handleDelete}>Delete</MenuItem>
					</Menu>
				</StyledTableCellValue>
			</TableRow>
		);
	}
	return (
		<TableRow
			key={String(id)}
			sx={{
				backgroundColor: "#F5F5F5",
				fontSize: "13px",
				fontWeight: 500,
				lineHeight: "17px",
			}}
		>
			{/* <StyledTableCellValue>
				{itemQty.value}
				<span style={{ textTransform: "lowercase" }}>{itemQty.unit}</span>
			</StyledTableCellValue> */}
			<StyledTableCellValue>
				{calories.value}
				{/* <span style={{ textTransform: "lowercase" }}>{calories.unit}</span> */}
			</StyledTableCellValue>
			<StyledTableCellValue>
				{fat.value}
				{/* <span style={{ textTransform: "lowercase" }}>{fat.unit}</span> */}
			</StyledTableCellValue>
			<StyledTableCellValue>
				{sugar.value}
				{/* <span style={{ textTransform: "lowercase" }}>{sugar.unit}</span> */}
			</StyledTableCellValue>
			<StyledTableCellValue>
				{protein.value}
				{/* <span style={{ textTransform: "lowercase" }}>{protein.unit}</span> */}
			</StyledTableCellValue>
			<StyledTableCellValue>
				{fiber.value}
				{/* <span style={{ textTransform: "lowercase" }}>{fiber.unit}</span> */}
			</StyledTableCellValue>
			<StyledTableCellValue>
				{cholesterol.value}
				{/* <span style={{ textTransform: "lowercase" }}>{cholesterol.unit}</span> */}
			</StyledTableCellValue>
			<StyledTableCellValue
				sx={{
					borderTopRightRadius: "8px",
					borderBottomRightRadius: "8px",
				}}
			>
				<IconButton id="more-button" onClick={handleClick}>
					<MoreVertIcon sx={(t) => ({ color: t.palette.secondary.main })} />
				</IconButton>
				<Menu
					MenuListProps={{
						"aria-labelledby": "more-button",
					}}
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
				>
					{/* <MenuItem onClick={handleUpdate}>Update</MenuItem> */}
					<MenuItem onClick={handleDelete}>Delete</MenuItem>
				</Menu>
			</StyledTableCellValue>
		</TableRow>
	);
};

export const NutritionTable = ({
	items,
	onDelete,
	onUpdate,
}: {
	items: Daum[];
	onDelete: (id: string) => void;
	onUpdate: (id: string) => void;
}) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	if (!isMobile) {
		return (
			<TableContainer
				sx={{
					marginTop: "16px",
				}}
			>
				<Table sx={{ borderSpacing: "0 6px", borderCollapse: "separate" }}>
					<TableHead>
						<TableRow sx={{ borderRadius: "8px", borderTop: "2px solid #E3E3E3" }}>
							<StyledTableCell align="left" title="Item Name" width="220px" />
							<StyledTableCell title="Qty" />
							<StyledTableCell title="Cal" />
							<StyledTableCell title="Fat" />
							<StyledTableCell title="Sugar" />
							<StyledTableCell title="Protein" />
							<StyledTableCell title="Fiber" />
							<StyledTableCell title="Cholesterol" />
							<StyledTableCell />
						</TableRow>
					</TableHead>
					<TableBody
						sx={{
							"& > :not(:last-child)": {
								borderBottom: "25px solid red",
							},
						}}
					>
						{items.map((x: Daum) => {
							return <NutritionFoodRow key={x.id} data={x} onDelete={onDelete} onUpdate={onUpdate} />;
						})}
					</TableBody>
				</Table>
			</TableContainer>
		);
	}
	return (
		<TableContainer
			sx={{
				marginTop: "16px",
			}}
		>
			<StyledTableCell align="left" title="Item Name" width="220px" />
			<Table sx={{ borderSpacing: "0 0px", borderCollapse: "separate" }}>
				<TableHead>
					<TableRow sx={{ borderRadius: "8px", borderTop: "2px solid #E3E3E3" }}>
						<StyledTableCell title="Cal" />
						<StyledTableCell title="Fat" />
						<StyledTableCell title="Sugar" />
						<StyledTableCell title="Protein" />
						<StyledTableCell title="Fiber" />
						<StyledTableCell title="Cholest" />
						<StyledTableCell />
					</TableRow>
				</TableHead>
				<TableBody
					sx={{
						"& > :not(:last-child)": {
							borderBottom: "25px solid red",
						},
					}}
				>
					{items.map((x: Daum) => {
						return <NutritionFoodRow key={x.id} data={x} onDelete={onDelete} onUpdate={onUpdate} />;
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
