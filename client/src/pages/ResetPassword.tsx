import { Container, Link } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { useLocalStorage } from "hooks/useLocalStorage";
import logoSample from "../assets/images/logo.svg";
import mainImage from "../assets/images/main_1.svg";
import full from "../assets/images/Rectangle73.png"
import box3 from "../assets/images/box3.png";
import { uiStrings } from "main/uiStrings";
import Box from "@mui/material/Box";
import { AppBar, Button, Checkbox, FormControlLabel, IconButton, Stack, Typography, useTheme, TextField, useMediaQuery } from "@mui/material";
import { RHFTextField, TLink } from "components/shared";
import { EmailRegExp } from "main/constants";
import { CheckBoxOutlineBlankOutlined, Lock, Person2 } from "@mui/icons-material";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { STORAGE_USER_INFO_KEY, STORAGE_USER_TOKEN_KEY, appLinks, dashboardLinks } from "main";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";



import rectangle from "../assets/images/Rectangle19.svg";
import down from "../assets/images/down.png";
import "../css/Homepage.css";

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


let profiles = [] as any;
const Header = () => {
    const { appTitle1 } = uiStrings;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <AppBar position="sticky" >
            <Toolbar
                sx={{
                    padding: "25px",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: theme.palette.primary.main,
                }}
            >
                <Box
                    alignSelf="center"
                    component="img"
                    sx={{
                        height: "46px",
                        width: "50px",
                    }}
                    alt={appTitle1}
                    src={logoSample}
                />
                <Stack display="flex" flexDirection="row" marginTop={1}>
                    <Typography
                        sx={{
                            fontSize: "18px",
                            fontWeight: 400,
                            fontStyle: "normal",
                            color: "#FFFFFF",
                        }}
                    >
                        TIVRA
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "18px",
                            fontWeight: 400,
                            fontStyle: "normal",
                            color: "#ED2F2F",
                        }}
                        marginLeft={0.5}
                    >
                        Health
                    </Typography>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

const Mobile = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        < Toolbar
            sx={{
                padding: "25px",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",

            }}
        >
            <Box

                component="img"
                sx={{
                    height: "46px",
                    width: "50px",
                }}

                src={logoSample} />
            <Stack display="flex" flexDirection="row" marginTop={1}>
                <Typography
                    sx={{
                        fontSize: "18px",
                        fontWeight: 400,
                        fontStyle: "normal",
                        color: "#FFFFFF",
                    }}
                >
                    TIVRA
                </Typography>
                <Typography
                    sx={{
                        fontSize: "18px",
                        fontWeight: 400,
                        fontStyle: "normal",
                        color: "#ED2F2F",
                    }}
                    marginLeft={0.5}
                >
                    Health
                </Typography>
            </Stack>
        </Toolbar>

    );
}
const Login = () => {
    const { handleSubmit, control, register } = useForm({
        defaultValues,
        mode: 'onChange',
    });

    const {
        signIn: { forgot, resetPassword, ButtonText, setButtonText },
        validation: { emailFormat, required },
    } = uiStrings;

    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // State to manage OTP input visibility, button text, and reset password form
    const [showOTPInput, setShowOTPInput] = useState(false);
    const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);

    const onSubmit = async (data: any) => {
        if (showOTPInput && !showResetPasswordForm) {
            // Handle OTP submission logic here, e.g., verify OTP with the server
            // If OTP is valid, show the reset password form
            setShowResetPasswordForm(true);
        } else if (showResetPasswordForm) {
            // Handle reset password logic here, e.g., send the new password to the server
            // Once the reset is successful, you can navigate to a success page
            navigate('/reset-password-success');
        } else {
            // Show OTP input and change button text to "Reset Password"
            setShowOTPInput(true);

        }
    };

    return (
        <>
            <Box
                sx={{
                    marginTop: '50px',
                    backgroundColor: isMobile ? '#ffffff' : '#ffffff',
                    borderRadius: '8px',
                    padding: '24px',
                }}
            >
                <Stack gap={1.7} paddingBottom={0} justifyItems="center" alignItems="center">
                    <Typography
                        sx={{
                            color: '#000000',
                            fontWeight: 400,
                            lineHeight: '29px',
                            fontSize: '24px',
                            marginBottom: '15px',
                        }}
                    >
                        {showResetPasswordForm ? resetPassword : forgot}
                    </Typography>
                    {showResetPasswordForm ? (
                        <>
                            <RHFTextField
                                name="New Password"
                                type="password"
                                placeholder="New Password"
                                control={control}
                            // Add validation rules for the new password input
                            />
                            <RHFTextField
                                name="Confirm Password"
                                type="password"
                                placeholder="Confirm Password"
                                control={control}
                            // Add validation rules for the confirm password input
                            />
                        </>
                    ) : (
                        <>
                            <RHFTextField
                                name="Email/Phone Number"
                                placeholder="Email/Phone Number"
                                control={control}
                                pattern={{
                                    value: EmailRegExp,
                                    message: emailFormat,
                                }}
                                required={{
                                    value: true,
                                    message: required,
                                }}
                            />
                            {showOTPInput && (
                                <RHFTextField
                                    name="OTP"
                                    placeholder="OTP"
                                    control={control}
                                // Add validation rules for OTP input if needed
                                />
                            )}
                        </>
                    )}
                    <Button
                        fullWidth
                        type="button"
                        variant="contained"
                        sx={{
                            mt: 3,
                            py: 1.5,
                        }}
                        onClick={handleSubmit(onSubmit)}
                    >
                        {showResetPasswordForm ? 'Reset Password' : ButtonText}
                    </Button>
                </Stack>
            </Box>
        </>
    );
};

const Box1 = () => {
    return (
        <Box>
            <Typography color="#fff" fontSize="22px">
                Fitness is not about being better than
            </Typography>
            <Typography
                sx={{
                    fontWeight: 900,
                    fontSize: "48px",
                    color: "#000",
                    lineHeight: "48px",
                    textShadow: "1px 0 0 #fff, 0 -1px 0 #fff, 0 1px 0 #fff, -1px 0 0 #fff",
                }}
            >
                someone else
            </Typography>
        </Box>
    );
};

const Box2 = () => {
    return (
        <Box>
            <Typography color="#fff" fontSize="22px">
                It&apos;s about being better than
            </Typography>
            <Typography
                color="#fff"
                sx={{
                    fontWeight: 700,
                    lineHeight: "58px",
                    fontSize: "58px",
                }}
            >
                you used to be
            </Typography>
        </Box>
    );
};

const Footer = () => {
    const theme = useTheme();
    const {
        appTitle1,
        signIn: { privacyStatement },
    } = uiStrings;

    return (
        <Box
            padding="60px"
            sx={{ backgroundColor: "#000" }}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
        >
            <Box>
                <Box display="flex" alignItems="center" gap={2} marginBottom="10px">
                    <Box
                        component="img"
                        sx={{
                            height: "46px",
                            width: "50px",
                        }}
                        alt={appTitle1}
                        src={logoSample}
                    />
                    <Stack display="flex" flexDirection="row">
                        <Typography
                            sx={{
                                fontSize: "18px",
                                fontWeight: 400,
                                fontStyle: "normal",
                                color: "#ED2F2F",
                            }}
                        >
                            TIVRA
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "18px",
                                fontWeight: 400,
                                fontStyle: "normal",
                                color: "#FFFFFF",
                            }}
                            marginLeft={0.5}
                        >
                            Health
                        </Typography>
                    </Stack>
                </Box>
                <TLink
                    color={theme.palette.text.secondary}
                    to={appLinks.forgotPassword}
                    fontSize="14px"
                    fontWeight={500}
                    marginLeft="10px"
                >
                    {privacyStatement}
                </TLink>
            </Box>
            <Box>
                <Box marginBottom={2}>
                    <Typography
                        textAlign="right"
                        color={theme.palette.text.secondary}
                        sx={{
                            fontSize: "18px",
                            fontWeight: 400,
                            fontStyle: "normal",
                        }}
                        marginLeft={0.5}
                    >
                        Follow Us On:
                    </Typography>
                    <Stack display="flex" flexDirection="row" gap={1} padding={2} justifyContent="right">
                        <IconButton disableRipple size="large" sx={{ p: 0 }}>
                            <LinkedInIcon fontSize="large" sx={{ color: "#0A66C2" }} />
                        </IconButton>
                        <IconButton disableRipple size="large" sx={{ p: 0 }}>
                            <InstagramIcon fontSize="large" sx={{ color: "#E4405F" }} />
                        </IconButton>
                        <IconButton disableRipple size="large" sx={{ p: 0 }}>
                            <TwitterIcon fontSize="large" sx={{ color: "#00acee" }} />
                        </IconButton>
                    </Stack>
                </Box>
                <Typography
                    color={theme.palette.text.secondary}
                    sx={{
                        fontSize: "14px",
                        fontWeight: 400,
                        fontStyle: "normal",
                    }}
                >
                    &copy; 2022-2023 by TIVRA Health
                </Typography>
            </Box>
        </Box>
    );
};

const Box3 = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                backgroundColor: "#F5F5F5",
                background: "url(" + box3 + ") no-repeat",
                minHeight: "857px",
                position: "relative",
                backgroundPosition: "30% 72%",
            }}
        >
            <Grid2 container>
                <Grid2 xl={6} md={6} position="relative" direction="column">
                    <Box
                        marginLeft="81px"
                        marginTop="-45px"
                        width="fit-content"
                        paddingY="30px"
                        paddingX="50px"
                        position="relative"
                        sx={{
                            borderTopLeftRadius: "30px",
                            borderTopRightRadius: "30px",
                            borderBottomLeftRadius: "30px",
                            backgroundColor: "#Fff",
                            "&::after": {
                                content: '""',
                                position: "absolute",
                                top: "165px",
                                right: 0,
                                width: 0,
                                height: 0,
                                borderTop: "solid 75px #fff",
                                borderLeft: "solid 40px transparent",
                                borderRight: "solid 0px transparent",
                            },
                        }}
                    >
                        <Typography color="#000" fontSize="32px" fontWeight={300} lineHeight={"38px"}>
                            Start your journey with just
                        </Typography>
                        <Typography
                            color={theme.palette.primary.main}
                            sx={{
                                fontWeight: 700,
                                fontSize: "48px",
                                lineHeight: "68px",
                            }}
                        >
                            $9.99 per month
                        </Typography>
                    </Box>
                </Grid2>
                <Grid2 xl={6} md={6} direction="column">
                    <Box marginTop="90px">
                        <Typography
                            color={theme.palette.primary.main}
                            sx={{
                                fontWeight: 700,
                                fontSize: "58px",
                                lineHeight: "58px",
                            }}
                        >
                            Smart platform
                        </Typography>
                        <Typography
                            color={theme.palette.primary.main}
                            fontSize="44px"
                            fontWeight={300}
                            lineHeight={"58px"}
                        >
                            to track your fitness
                        </Typography>
                        <Typography marginTop={2} color="#000" fontSize="30px" fontWeight={500} whiteSpace="pre-wrap">
                            Tailored subscriptions to your
                        </Typography>
                        <Typography
                            color="#000"
                            fontSize="30px"
                            fontWeight={500}
                            whiteSpace="pre-wrap"
                            lineHeight="40px"
                        >
                            specific needs
                        </Typography>
                        <Button
                            type="button"
                            size="large"
                            variant="contained"
                            sx={{
                                mt: 3,
                                py: 1.5,
                            }}
                            onClick={() => {
                                navigate(`${appLinks.signUp}/${appLinks.createAccount}`);
                            }}
                        >
                            Start your journey
                        </Button>
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    );
};

const MobileBox = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    return (
        <>
            <Box
                sx={{
                    backgroundColor: "#F5F5F5",
                    background: "url(" + down + ") no-repeat",
                    minHeight: "740px",
                    position: "relative",
                    marginLeft: "75px",
                    backgroundPosition: "30% 72%",
                }}
            >   <div className="ellipse-1"></div>
                <div className="ellipse-2"></div>
                <div className="ellipse-3"></div>
                <Grid2 container>
                    <Grid2 xl={6} md={6} position="relative" direction="column">
                        <Box
                            marginLeft="-70px"
                            marginTop="350px"
                            width="fit-content"
                            padding="10px"
                            paddingX=""
                            position="relative"
                            sx={{
                                borderTopLeftRadius: "25px",
                                borderTopRightRadius: "25px",
                                borderBottomLeftRadius: "25px",
                                backgroundColor: "#Fff",
                                "&::after": {
                                    content: '""',
                                    position: "absolute",
                                    top: "76px",
                                    right: 0,
                                    width: 0,
                                    height: 0,
                                    borderTop: "solid 40px #fff",
                                    borderLeft: "solid 20px transparent",
                                    borderRight: "solid 0px transparent",
                                },
                            }}
                        >
                            <Typography color="#000" fontSize="13px" marginRight={"9px"} fontWeight={500} lineHeight={"35px"} paddingLeft={"18px"}>
                                Start your journey with just
                            </Typography>
                            <Typography
                                color={theme.palette.primary.main}
                                sx={{
                                    paddingLeft: "15px",
                                    fontWeight: "700",
                                    fontSize: "20px",
                                    lineHeight: "35px",
                                }}
                            >
                                $9.99 per month
                            </Typography>
                        </Box>
                    </Grid2>
                    <Grid2 xl={6} md={6} direction="column">
                        <Box marginTop="150px" marginLeft={"35px"}>
                            <Typography

                                sx={{
                                    marginLeft: "5px",
                                    fontWeight: "700",
                                    fontSize: "18.5px",
                                    lineHeight: "20px",
                                    color: "white",
                                }}
                            >
                                Smart platform
                            </Typography>
                            <Typography
                                marginLeft="5px"
                                color="white"
                                fontSize="15px"
                                fontWeight={300}
                                lineHeight={"30px"}
                            >
                                to track your fitness
                            </Typography>

                            <Typography
                                marginLeft="5px"
                                color="white"
                                fontSize="10px"
                                fontWeight={300}
                                whiteSpace="pre-wrap"
                                lineHeight="10px"
                                marginTop="5px"
                            >
                                Tailored subscriptions<br></br> to your specific needs
                            </Typography>
                            <Button

                                type="button"
                                size="large"
                                variant="contained"
                                sx={{
                                    marginTop: "5px",
                                    mt: 3,
                                    py: 1.5,
                                }}
                                onClick={() => {
                                    navigate(`${appLinks.signUp}/${appLinks.createAccount}`);
                                }}
                            >
                                Start your journey
                            </Button>
                        </Box>
                    </Grid2>
                </Grid2>
            </Box>
        </>
    )
};

export const ResetPassword = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <>
            {!isMobile && <Header />}
            <main>
                {/* Background Image box */}
                <Box
                    sx={{
                        backgroundColor: "",
                        padding: isMobile ? " " : "130px 0px 200px 0px",
                        background: isMobile ? "url(" + full + ")" : "url(" + mainImage + ")",
                        backgroundSize: "cover",


                        minHeight: isMobile ? " " : "70vh",
                        position: "relative",
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: isMobile ? "linear-gradient(180deg, rgba(57, 16, 97, 0.9) 13.85%, rgba(234, 55, 107, 0.9))" : "linear-gradient(180deg, #000, rgba(0, 0, 0, 0) 36.46%, rgba(0, 0, 0, 0) 68.23%, #000)",
                        }
                    }}
                >   {isMobile && <Mobile />}
                    {/* Login Box */}
                    <Box
                        sx={{
                            position: "absolute",
                            top: isMobile ? "100px " : "90px",
                            right: isMobile ? " " : "90px",
                            zIndex: 999,
                        }}
                    > <Login />

                    </Box>
                    {isMobile && <MobileBox />}
                    {/* central boxes */}
                    <Box
                        padding="25px"
                        paddingLeft="100px"
                        marginTop="20px"
                        sx={{
                            backgroundColor: isMobile ? " " : "rgba(0,0,0,0.3)",
                        }}
                    >
                        <Box display="flex" flexDirection="row" gap={2}>
                            <Box width="fit-content">
                                {!isMobile && <Box1 />}
                            </Box>
                            <Box width="fit-content" marginTop="70px" marginBottom="20px">
                                {!isMobile && <Box2 />}
                            </Box>

                        </Box>
                    </Box>
                </Box>
                {!isMobile && <Box3 />}
            </main>
            <footer>
                {!isMobile && <Footer />}
            </footer>
        </>
    );
};