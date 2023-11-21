import Grid2 from "@mui/material/Unstable_Grid2";

interface ISignInSignUpGridProps {
	contentLeft: JSX.Element;
	contentRight: JSX.Element;
}

export const SignInSignUpGrid = ({
	contentLeft,
	contentRight,
}: ISignInSignUpGridProps) => {
	return (
		<Grid2 container padding={0} paddingRight={0}>
			<Grid2 xs={5} sm={5} md={5} lg={3} xl={3} padding={0} paddingRight={0}>
				{contentLeft}
			</Grid2>
			<Grid2 xs={7} sm={7} md={7} lg={9} xl={9} padding={0} paddingRight={0}>
				{contentRight}
			</Grid2>
		</Grid2>
	);
};
