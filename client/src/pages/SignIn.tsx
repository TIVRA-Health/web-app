import { CheckBoxOutlineBlankOutlined, Lock, Person2 } from "@mui/icons-material";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { Box, Button, Checkbox, FormControlLabel, Stack, useTheme } from "@mui/material";
import { RHFTextField, SignInSignUpGrid, TLink } from "components/shared";
import logoSample from "../assets/images/logo_sample.jpg";
import signinRight from "../assets/images/signin.jpg";
import { useNavigate } from "react-router-dom";
import { appLinks, EmailRegExp, uiStrings } from "main";
import { useForm } from "react-hook-form";
import "../css/LoginStyle.css";

interface ISignInState {
	username: string; 
	password: string;
	persistUser: boolean;
}

const defaultValues: ISignInState = {
	password: "",
	persistUser: false,
	username: "",
};

export const SignIn = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const {
		appTitle1,
		signIn: { username, password, login, rememberMe, forgotPassword, doNotHaveAccount, signUp },
		validation: { emailFormat, required },
	} = uiStrings;

	const { handleSubmit, control, register } = useForm({
		defaultValues,
		mode: "onChange",
	});

	const onSubmit = (data: any) => {
		navigate(appLinks.dashboard);
	};

	return (
		<SignInSignUpGrid
			contentLeft={
				<Stack alignItems="center" justifyContent="start" bgcolor={theme.palette.primary.main} height="100vh">
					<Stack
						gap={1.5}
						padding={2}
						paddingBottom={0}
						justifyItems="center"
						alignItems="center"
						marginTop={15}
					>
						<Box 
							className="login_box"
							component="img"
							// sx={{
							// 	height: { xs: 80, md: 150, xl: 150 },
							// 	width: { xs: 100, md: 200, xl: 200 },
							// }}
							alt={appTitle1}
							src={logoSample}
						/>
						<RHFTextField
							name="username"
							placeholder={username}
							control={control}
							pattern={{
								value: EmailRegExp,
								message: emailFormat,
							}}
							required={{
								value: true,
								message: required,
							}}
							startAdornment={<Person2 fontSize="small" />}
						/>
						<RHFTextField
							name="password"
							type="password"
							control={control}
							required={{
								value: true,
								message: required,
							}}
							placeholder={password}
							startAdornment={<Lock fontSize="small" />}
						/>
						<Button
							fullWidth
							type="button"
							variant="contained"
							sx={{
								mt: 1,
							}}
							onClick={handleSubmit(onSubmit, (s: any) => {
								console.log(s);
							})}
						>
							{login}
						</Button>
						<Stack
							mt="-12px"
							width="100%"
							flexDirection="row"
							justifyContent="space-between"
							alignItems="center"
						>
							<FormControlLabel
								control={
									<Checkbox
										//control={control}
										icon={<CheckBoxOutlineBlankOutlined sx={{ strokeWidth: 0 }} />}
										checkedIcon={<CheckBoxOutlinedIcon />}
										size="small"
										sx={{
											color: "#898989",
											strokeWidth: 1,
											"&.Mui-checked": {
												color: "#898989",
											},
										}}
										{...register("persistUser")}
									/>
								}
								label={
									<Box component="div" fontSize={12}>
										{rememberMe}
									</Box>
								}
							/>
							<TLink
								to={appLinks.forgotPassword}
								fontSize={12}
								sx={{
									borderBottom: "1px solid",
								}}
							>
								{forgotPassword}
							</TLink>
						</Stack>
					</Stack>

					<Stack direction="row" position="absolute" bottom={60}>
						<Box fontSize={13}>{doNotHaveAccount}</Box>
						<TLink
							to={`${appLinks.signUp}/${appLinks.createAccount}`}
							fontSize={13}
							sx={{
								borderBottom: "1px solid",
								marginLeft: "3px",
							}}
						>
							{signUp}
						</TLink>
					</Stack>
				</Stack>
			}
			contentRight={
				<Stack
					sx={{
						height: "100vh",
						position: "relative",
					}}
				>
					<Box
						component="img"
						sx={{
							width: "100%",
							height: "100%",
						}}
						alt={appTitle1}
						src={signinRight}
					/>
					{/* <Stack
            spacing={6}
            direction="row"
            position="absolute"
            bottom={{ xs: 60, md: 120, xl: 120 }}
            sx={{
              width: "100%",
              zIndex: 9,
              overflow: "hidden",
              display: "flex",
              height: "220px",
              color: "#fff",
              backgroundColor: "#85403d",
              opacity: 0.75,
              padding: "20px 30px",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignSelf: "flex-start",
              }}
            >
              <Typography variant="h5">
                Fitness is not about being better than
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  textShadow:
                    "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                }}
              >
                someone else
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignSelf: "flex-end",
              }}
            >
              <Typography variant="h5">It's about being better than</Typography>
              <Typography variant="h2">you used to be</Typography>
            </Box>
          </Stack> */}
				</Stack>
			}
		/>
	);
};
