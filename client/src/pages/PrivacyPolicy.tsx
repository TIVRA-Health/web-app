import { AppBar, Box, Container, IconButton, Link, Stack, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import { TLink } from "components/shared";
import { appLinks, uiStrings } from "main";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import logoSample from "../assets/images/logo.svg";
import React, { CSSProperties } from 'react';

function Copyright() {
	return (
		<Typography variant="body2" color="text.secondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="/">
				Privacy Policy
			</Link>
			{new Date().getFullYear()}
		</Typography>
	);
}
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
					<TLink to={appLinks.index}>
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
					</TLink>
				</Box>
				<TLink
					color={theme.palette.text.secondary}
					to={appLinks.privacyPolicy}
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
					&copy; 2023-2024 by TIVRA Health
				</Typography>
			</Box>
		</Box>
	);
};
const Header = () => {
	const { appTitle1 } = uiStrings;
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<AppBar position="sticky">
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
				<TLink to={appLinks.index}>
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
				</TLink>
			</Toolbar>
		</AppBar>
	);
};
export const PrivacyPolicy = () => {
	// Define the styles for the container div
	const containerStyles: CSSProperties = {
		width: '60vh',
		height: '60vh',
		overflowY: 'auto',
		margin: '0 auto', // Adjust the margin as needed
		top: '5', // Adjust the top as needed
		// Add any other styles you need
	};

	return (
		<>
			{/* Include your Header component */}
			{<Header />}
			<main>
				{/* Background Image box */}
				<div style={{ minHeight: "64vh" }}>
					{/* Privacy Policy Content */}
					<div style={{ ...containerStyles, ...privacyPolicyStyles.container }}>
						<h2 className="font_2 wixui-rich-text__text"><span className="wixui-rich-text__text">Privacy Policy</span></h2>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text"><span className="wixGuard wixui-rich-text__text">​</span></span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</span></p>
						<p className="font_8 wixui-rich-text__text"></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Interpretation and Definitions</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text"><span className="wixGuard wixui-rich-text__text">​</span></span></p>

						<h2 className="font_2 wixui-rich-text__text"><span className="wixui-rich-text__text">Interpretation</span></h2>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</span></p>

						<h2 className="font_2 wixui-rich-text__text"></h2>
						<h2 className="font_2 wixui-rich-text__text"><span className="wixui-rich-text__text">Definitions</span></h2>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">For the purposes of this Privacy Policy:</span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">means a unique account created for You to access our Service or parts of our Service.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">, for the purpose of the CCPA (California Consumer Privacy Act), refers to the Company as the legal entity that collects Consumers' personal information and determines the purposes and means of the processing of Consumers' personal information, or on behalf of which such information is collected and that alone, or jointly with others, determines the purposes and means of the processing of consumers' personal information, that does business in the State of California.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">(referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to TIVRA Health, 8515 Ashgrove Plantation Circle, Vienna, VA 22182.</span></p>
							</li>
						</ul>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">For the purpose of the GDPR, the Company is the Data Controller.</span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">, for the purpose of the CCPA (California Consumer Privacy Act), means a natural person who is a California resident. A resident, as defined in the law, includes (1) every individual who is in the USA for other than a temporary or transitory purpose, and (2) every individual who is domiciled in the USA who is outside the USA for a temporary or transitory purpose.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">refers to: Virginia, United States</span></p>
							</li>
						</ul>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Data Controller, for the purposes of the GDPR (General Data Protection Regulation), refers to the Company as the legal person which alone or jointly with others determines the purposes and means of the processing of Personal Data.</span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">means any device that can access the Service such as a computer, a cellphone or a digital tablet.</span></p>
							</li>
						</ul>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Do Not Track (DNT) is a concept that has been promoted by US regulatory authorities, in particular the U.S. Federal Trade Commission (FTC), for the Internet industry to develop and implement a mechanism for allowing internet users to control the tracking of their online activities across websites.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Personal Data is any information that relates to an identified or identifiable individual.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">For the purposes for GDPR, Personal Data means any information relating to You such as a name, an identification number, location data, online identifier or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural or social identity.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">For the purposes of the CCPA, Personal Data means any information that identifies, relates to, describes or is capable of being associated with, or could reasonably be linked, directly or indirectly, with You.</span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">, for the purpose of the CCPA (California Consumer Privacy Act), means selling, renting, releasing, disclosing, disseminating, making available, transferring, or otherwise communicating orally, in writing, or by electronic or other means, a Consumer's personal information to another business or a third party for monetary or other valuable consideration.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">refers to the Website.</span></p>
							</li>
						</ul>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Service Provider means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used. For the purpose of the GDPR, Service Providers are considered Data Processors.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Usage Data refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">refers to TIVRA Health, accessible from <a className="wixui-rich-text__text" href="http://www.tivrahealth.com/" target="_blank" rel="noopener" data-auto-recognition="true">www.tivrahealth.com</a></span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</span></p>
							</li>
						</ul>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Under GDPR (General Data Protection Regulation), You can be referred to as the Data Subject or as the User as you are the individual using the Service.</span></p>
						<p className="font_8 wixui-rich-text__text"></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Collecting and Using Your Personal Data</span></p>

						<h2 className="font_2 wixui-rich-text__text"></h2>
						<h2 className="font_2 wixui-rich-text__text"><span className="wixui-rich-text__text">Types of Data Collected</span></h2>
						<h3 className="font_3 wixui-rich-text__text"><span className="wixui-rich-text__text">Personal Data</span></h3>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Email address</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">First name and last name</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Phone number</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Address, State, Province, ZIP/Postal code, City</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Usage Data</span></p>

						<h3 className="font_3 wixui-rich-text__text"></h3>
						<h3 className="font_3 wixui-rich-text__text"><span className="wixui-rich-text__text">Usage Data</span></h3>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Usage Data is collected automatically when using the Service.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.</span></p>

						<h3 className="font_3 wixui-rich-text__text"></h3>
						<h3 className="font_3 wixui-rich-text__text"><span className="wixui-rich-text__text">Tracking Technologies and Cookies</span></h3>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service. The technologies We use may include:</span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Cookies or Browser Cookies. A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service. Unless you have adjusted Your browser setting so that it will refuse Cookies, our Service may use Cookies.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Flash Cookies. Certain features of our Service may use local stored objects (or Flash Cookies) to collect and store information about Your preferences or Your activity on our Service. Flash Cookies are not managed by the same browser settings as those used for Browser Cookies. For more information on how You can delete Flash Cookies, please read "Where can I change the settings for disabling, or deleting local shared objects?" available at <a className="wixui-rich-text__text" href="https://helpx.adobe.com/flash-player/kb/disable-local-shared-objects-flash.html#main_Where_can_I_change_the_settings_for_disabling__or_deleting_local_shared_objects_" target="_blank" rel="noreferrer noopener">https://helpx.adobe.com/flash-player/kb/disable-local-shared-objects-flash.html#main_Where_can_I_change_the_settings_for_disabling__or_deleting_local_shared_objects_</a></span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Web Beacons. Certain sections of our Service and our emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages or opened an email and for other related website statistics (for example, recording the popularity of a certain section and verifying system and server integrity).</span></p>
							</li>
						</ul>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser. You can learn more about cookies here: <a className="wixui-rich-text__text" href="https://www.termsfeed.com/blog/cookies/" target="_blank" rel="noreferrer noopener">All About Cookies by TermsFeed</a>.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">We use both Session and Persistent Cookies for the purposes set out below:</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Necessary / Essential Cookies</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Type: Session Cookies</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Administered by: Us</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Cookies Policy / Notice Acceptance Cookies</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Type: Persistent Cookies</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Administered by: Us</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Purpose: These Cookies identify if users have accepted the use of cookies on the Website.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Functionality Cookies</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Type: Persistent Cookies</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Administered by: Us</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Tracking and Performance Cookies</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Type: Persistent Cookies</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Administered by: Third-Parties</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Purpose: These Cookies are used to track information about traffic to the Website and how users use the Website. The information gathered via these Cookies may directly or indirectly identify you as an individual visitor. This is because the information collected is typically linked to a pseudonymous identifier associated with the device you use to access the Website. We may also use these Cookies to test new pages, features or new functionality of the Website to see how our users react to them.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">For more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy or the Cookies section of our Privacy Policy.</span></p>

						<h2 className="font_2 wixui-rich-text__text"></h2>
						<h2 className="font_2 wixui-rich-text__text"><span className="wixui-rich-text__text">Use of Your Personal Data</span></h2>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">The Company may use Personal Data for the following purposes:</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">To provide and maintain our Service, including to monitor the usage of our Service.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">To manage Your Account: to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">For the performance of a contract: the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">To contact You: To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">To provide You with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">To manage Your requests: To attend and manage Your requests to Us.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">For business transfers: We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">For other purposes: We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">We may share Your personal information in the following situations:</span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">With Service Providers: We may share Your personal information with Service Providers to monitor and analyze the use of our Service, for payment processing, to contact You.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">For business transfers: We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">With Affiliates: We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">With business partners: We may share Your information with Our business partners to offer You certain products, services or promotions.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">With other users: when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">With Your consent: We may disclose Your personal information for any other purpose with Your consent.</span></p>
							</li>
						</ul>
						<h2 className="font_2 wixui-rich-text__text"></h2>
						<h2 className="font_2 wixui-rich-text__text"><span className="wixui-rich-text__text">Retention of Your Personal Data</span></h2>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.</span></p>

						<h2 className="font_2 wixui-rich-text__text"></h2>
						<h2 className="font_2 wixui-rich-text__text"><span className="wixui-rich-text__text">Transfer of Your Personal Data</span></h2>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.</span></p>

						<h2 className="font_2 wixui-rich-text__text"></h2>
						<h2 className="font_2 wixui-rich-text__text"><span className="wixui-rich-text__text">Disclosure of Your Personal Data</span></h2>
						<h3 className="font_3 wixui-rich-text__text"><span className="wixui-rich-text__text">Business Transactions</span></h3>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.</span></p>

						<h3 className="font_3 wixui-rich-text__text"><span className="wixui-rich-text__text">Law enforcement</span></h3>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).</span></p>

						<h3 className="font_3 wixui-rich-text__text"><span className="wixui-rich-text__text">Other legal requirements</span></h3>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:</span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Comply with a legal obligation</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Protect and defend the rights or property of the Company</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Prevent or investigate possible wrongdoing in connection with the Service</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Protect the personal safety of Users of the Service or the public</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Protect against legal liability</span></p>
							</li>
						</ul>
						<h2 className="font_2 wixui-rich-text__text"><span className="wixui-rich-text__text"><span className="wixGuard wixui-rich-text__text">​</span></span></h2>
						<h2 className="font_2 wixui-rich-text__text"><span className="wixui-rich-text__text">Security of Your Personal Data</span></h2>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Detailed Information on the Processing of Your Personal Data</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">The Service Providers We use may have access to Your Personal Data. These third-party vendors collect, store, use, process and transfer information about Your activity on Our Service in accordance with their Privacy Policies.</span></p>

						<h2 className="font_2 wixui-rich-text__text"></h2>
						<h2 className="font_2 wixui-rich-text__text"><span className="wixui-rich-text__text">Analytics</span></h2>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">We may use third-party Service providers to monitor and analyze the use of our Service.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Google Analytics</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our Service. This data is shared with other Google services. Google may use the collected data to contextualize and personalize the ads of its own advertising network.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">You can opt-out of having made your activity on the Service available to Google Analytics by installing the Google Analytics opt-out browser add-on. The add-on prevents the Google Analytics JavaScript (ga.js, analytics.js and dc.js) from sharing information with Google Analytics about visits activity.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">For more information on the privacy practices of Google, please visit the Google Privacy &amp; Terms web page: <a className="wixui-rich-text__text" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer noopener">https://policies.google.com/privacy</a></span></p>

						<h2 className="font_2 wixui-rich-text__text"><br className="wixui-rich-text__text" /><span className="wixui-rich-text__text">Email Marketing</span></h2>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">We may use Your Personal Data to contact You with newsletters, marketing or promotional materials and other information that may be of interest to You. You may opt-out of receiving any, or all, of these communications from Us by following the unsubscribe link or instructions provided in any email We send or by contacting Us.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">We may use Email Marketing Service Providers to manage and send emails to You.</span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text"><span className="wixGuard wixui-rich-text__text">​</span></span></p>
							</li>
						</ul>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Mailchimp is an email marketing sending service provided by The Rocket Science Group LLC.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">For more information on the privacy practices of Mailchimp, please visit their Privacy policy: <a className="wixui-rich-text__text" href="https://mailchimp.com/legal/privacy/" target="_blank" rel="noreferrer noopener">https://mailchimp.com/legal/privacy/</a></span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text"><span className="wixGuard wixui-rich-text__text">​</span></span></p>
							</li>
						</ul>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">AWeber is an email marketing sending service provided by AWeber Communications.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">For more information on the privacy practices of AWeber, please visit their Privacy policy: <a className="wixui-rich-text__text" href="https://www.aweber.com/privacy.htm" target="_blank" rel="noreferrer noopener">https://www.aweber.com/privacy.htm</a></span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text"><span className="wixGuard wixui-rich-text__text">​</span></span></p>
							</li>
						</ul>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">GetResponse is an email marketing sending service provided by GetResponse.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">For more information on the privacy practices of GetResponse, please visit their Privacy policy: <a className="wixui-rich-text__text" href="https://www.getresponse.com/legal/privacy.html" target="_blank" rel="noreferrer noopener">https://www.getresponse.com/legal/privacy.html</a></span></p>

						<h2 className="font_2 wixui-rich-text__text"></h2>
						<h2 className="font_2 wixui-rich-text__text"><span className="wixui-rich-text__text">Payments</span></h2>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">We may provide paid products and/or services within the Service. In that case, we may use third-party services for payment processing (e.g. payment processors).</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">We will not store or collect Your payment card details. That information is provided directly to Our third-party payment processors whose use of Your personal information is governed by their Privacy Policy. These payment processors adhere to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, Mastercard, American Express and Discover. PCI-DSS requirements help ensure the secure handling of payment information.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Apple Store In-App Payments</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Their Privacy Policy can be viewed at <a className="wixui-rich-text__text" href="https://www.apple.com/legal/privacy/en-ww/" target="_blank" rel="noreferrer noopener">https://www.apple.com/legal/privacy/en-ww/</a></span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text"><span className="wixGuard wixui-rich-text__text">​</span></span></p>
							</li>
						</ul>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Their Privacy Policy can be viewed at <a className="wixui-rich-text__text" href="https://stripe.com/us/privacy" target="_blank" rel="noreferrer noopener">https://stripe.com/us/privacy</a></span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text"><span className="wixGuard wixui-rich-text__text">​</span></span></p>
							</li>
						</ul>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Their Privacy Policy can be viewed at <a className="wixui-rich-text__text" href="https://go.wepay.com/privacy-policy" target="_blank" rel="noreferrer noopener">https://go.wepay.com/privacy-policy</a></span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text"><span className="wixGuard wixui-rich-text__text">​</span></span></p>
							</li>
						</ul>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Their Privacy Policy can be viewed at <a className="wixui-rich-text__text" href="https://www.worldpay.com/en-gb/privacy-policy" target="_blank" rel="noreferrer noopener">https://www.worldpay.com/en-gb/privacy-policy</a></span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text"><span className="wixGuard wixui-rich-text__text">​</span></span></p>
							</li>
						</ul>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Their Privacy Policy can be viewed at <a className="wixui-rich-text__text" href="https://www.paypal.com/webapps/mpp/ua/privacy-full" target="_blank" rel="noreferrer noopener">https://www.paypal.com/webapps/mpp/ua/privacy-full</a></span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text"><span className="wixGuard wixui-rich-text__text">​</span></span></p>
							</li>
						</ul>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Their Privacy Policy can be viewed at <a className="wixui-rich-text__text" href="https://www.braintreepayments.com/legal/braintree-privacy-policy" target="_blank" rel="noreferrer noopener">https://www.braintreepayments.com/legal/braintree-privacy-policy</a></span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text"><span className="wixGuard wixui-rich-text__text">​</span></span></p>
							</li>
						</ul>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Their Privacy Policy can be viewed at <a className="wixui-rich-text__text" href="http://fastspring.com/privacy/" target="_blank" rel="noreferrer noopener">http://fastspring.com/privacy/</a></span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text"><span className="wixGuard wixui-rich-text__text">​</span></span></p>
							</li>
						</ul>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Their Privacy Policy can be viewed at <a className="wixui-rich-text__text" href="https://www.authorize.net/company/privacy/" target="_blank" rel="noreferrer noopener">https://www.authorize.net/company/privacy/</a></span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text"><span className="wixGuard wixui-rich-text__text">​</span></span></p>
							</li>
						</ul>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Their Privacy Policy can be viewed at <a className="wixui-rich-text__text" href="https://www.2checkout.com/policies/privacy-policy" target="_blank" rel="noreferrer noopener">https://www.2checkout.com/policies/privacy-policy</a></span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Sage Pay</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Their Privacy Policy can be viewed at <a className="wixui-rich-text__text" href="https://www.sagepay.co.uk/policies" target="_blank" rel="noreferrer noopener">https://www.sagepay.co.uk/policies</a></span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text"><span className="wixGuard wixui-rich-text__text">​</span></span></p>
							</li>
						</ul>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Their Privacy Policy can be viewed at <a className="wixui-rich-text__text" href="https://squareup.com/legal/privacy-no-account" target="_blank" rel="noreferrer noopener">https://squareup.com/legal/privacy-no-account</a></span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Go Cardless</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Their Privacy Policy can be viewed at <a className="wixui-rich-text__text" href="https://gocardless.com/en-eu/legal/privacy/" target="_blank" rel="noreferrer noopener">https://gocardless.com/en-eu/legal/privacy/</a></span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text"><span className="wixGuard wixui-rich-text__text">​</span></span></p>
							</li>
						</ul>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Their Privacy Policy can be viewed at <a className="wixui-rich-text__text" href="https://www.elavon.com/privacy-pledge.html" target="_blank" rel="noreferrer noopener">https://www.elavon.com/privacy-pledge.html</a></span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text"><span className="wixGuard wixui-rich-text__text">​</span></span></p>
							</li>
						</ul>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Their Privacy Policy can be viewed at <a className="wixui-rich-text__text" href="https://www.verifone.com/en/us/legal" target="_blank" rel="noreferrer noopener">https://www.verifone.com/en/us/legal</a></span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text"><span className="wixGuard wixui-rich-text__text">​</span></span></p>
							</li>
						</ul>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Their Privacy Policy can be viewed at <a className="wixui-rich-text__text" href="https://www.moneris.com/en/Privacy-Policy" target="_blank" rel="noreferrer noopener">https://www.moneris.com/en/Privacy-Policy</a></span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text"><span className="wixGuard wixui-rich-text__text">​</span></span></p>
							</li>
						</ul>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Their Privacy Policy can be viewed at <a className="wixui-rich-text__text" href="https://www.wechat.com/en/privacy_policy.html" target="_blank" rel="noreferrer noopener">https://www.wechat.com/en/privacy_policy.html</a></span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text"><span className="wixGuard wixui-rich-text__text">​</span></span></p>
							</li>
						</ul>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Their Privacy Policy can be viewed at <a className="wixui-rich-text__text" href="https://render.alipay.com/p/f/agreementpages/alipayglobalprivacypolicy.html" target="_blank" rel="noreferrer noopener">https://render.alipay.com/p/f/agreementpages/alipayglobalprivacypolicy.html</a></span></p>

						<h2 className="font_2 wixui-rich-text__text"><span className="wixui-rich-text__text"><span className="wixGuard wixui-rich-text__text">​</span></span></h2>
						<h2 className="font_2 wixui-rich-text__text"><span className="wixui-rich-text__text">Usage, Performance and Miscellaneous</span></h2>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">We may use third-party Service Providers to provide better improvement of our Service.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Invisible reCAPTCHA</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">We use an invisible captcha service named reCAPTCHA. reCAPTCHA is operated by Google.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">The reCAPTCHA service may collect information from You and from Your Device for security purposes.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">The information gathered by reCAPTCHA is held in accordance with the Privacy Policy of Google: <a className="wixui-rich-text__text" href="https://www.google.com/intl/en/policies/privacy/" target="_blank" rel="noreferrer noopener">https://www.google.com/intl/en/policies/privacy/</a></span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">GDPR Privacy</span></p>

						<h2 className="font_2 wixui-rich-text__text"></h2>
						<h2 className="font_2 wixui-rich-text__text"><span className="wixui-rich-text__text">Legal Basis for Processing Personal Data under GDPR</span></h2>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">We may process Personal Data under the following conditions:</span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Consent: You have given Your consent for processing Personal Data for one or more specific purposes.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Performance of a contract: Provision of Personal Data is necessary for the performance of an agreement with You and/or for any pre-contractual obligations thereof.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Legal obligations: Processing Personal Data is necessary for compliance with a legal obligation to which the Company is subject.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Vital interests: Processing Personal Data is necessary in order to protect Your vital interests or of another natural person.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Public interests: Processing Personal Data is related to a task that is carried out in the public interest or in the exercise of official authority vested in the Company.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Legitimate interests: Processing Personal Data is necessary for the purposes of the legitimate interests pursued by the Company.</span></p>
							</li>
						</ul>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">In any case, the Company will gladly help to clarify the specific legal basis that applies to the processing, and in particular whether the provision of Personal Data is a statutory or contractual requirement, or a requirement necessary to enter into a contract.</span></p>

						<h2 className="font_2 wixui-rich-text__text"></h2>
						<h2 className="font_2 wixui-rich-text__text"><span className="wixui-rich-text__text">Your Rights under the GDPR</span></h2>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">The Company undertakes to respect the confidentiality of Your Personal Data and to guarantee You can exercise Your rights.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">You have the right under this Privacy Policy, and by law if You are within the EU, to:</span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Request access to Your Personal Data. The right to access, update or delete the information We have on You. Whenever made possible, you can access, update or request deletion of Your Personal Data directly within Your account settings section. If you are unable to perform these actions yourself, please contact Us to assist You. This also enables You to receive a copy of the Personal Data We hold about You.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Request correction of the Personal Data that We hold about You. You have the right to have any incomplete or inaccurate information We hold about You corrected.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Object to processing of Your Personal Data. This right exists where We are relying on a legitimate interest as the legal basis for Our processing and there is something about Your particular situation, which makes You want to object to our processing of Your Personal Data on this ground. You also have the right to object where We are processing Your Personal Data for direct marketing purposes.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Request erasure of Your Personal Data. You have the right to ask Us to delete or remove Personal Data when there is no good reason for Us to continue processing it.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Request the transfer of Your Personal Data. We will provide to You, or to a third-party You have chosen, Your Personal Data in a structured, commonly used, machine-readable format. Please note that this right only applies to automated information which You initially provided consent for Us to use or where We used the information to perform a contract with You.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Withdraw Your consent. You have the right to withdraw Your consent on using your Personal Data. If You withdraw Your consent, We may not be able to provide You with access to certain specific functionalities of the Service.</span></p>
							</li>
						</ul>
						<h2 className="font_2 wixui-rich-text__text"></h2>
						<h2 className="font_2 wixui-rich-text__text"><span className="wixui-rich-text__text">Exercising of Your GDPR Data Protection Rights</span></h2>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">You may exercise Your rights of access, rectification, cancellation and opposition by contacting Us. Please note that we may ask You to verify Your identity before responding to such requests. If You make a request, We will try our best to respond to You as soon as possible.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">You have the right to complain to a Data Protection Authority about Our collection and use of Your Personal Data. For more information, if You are in the European Economic Area (EEA), please contact Your local data protection authority in the EEA.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">CCPA Privacy</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">This privacy notice section for California residents supplements the information contained in Our Privacy Policy and it applies solely to all visitors, users, and others who reside in the State of California.</span></p>

						<h2 className="font_2 wixui-rich-text__text"></h2>
						<h2 className="font_2 wixui-rich-text__text"><span className="wixui-rich-text__text">Categories of Personal Information Collected</span></h2>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">We collect information that identifies, relates to, describes, references, is capable of being associated with, or could reasonably be linked, directly or indirectly, with a particular Consumer or Device. The following is a list of categories of personal information which we may collect or may have been collected from California residents within the last twelve (12) months.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Please note that the categories and examples provided in the list below are those defined in the CCPA. This does not mean that all examples of that category of personal information were in fact collected by Us, but reflects our good faith belief to the best of our knowledge that some of that information from the applicable category may be and may have been collected. For example, certain categories of personal information would only be collected if You provided such personal information directly to Us.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Category A: Identifiers.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Examples: A real name, alias, postal address, unique personal identifier, online identifier, Internet Protocol address, email address, account name, driver's license number, passport number, or other similar identifiers.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Collected: Yes.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Category B: Personal information categories listed in the California Customer Records statute (Cal. Civ. Code § 1798.80(e)).</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Examples: A name, signature, Social Security number, physical characteristics or description, address, telephone number, passport number, driver's license or state identification card number, insurance policy number, education, employment, employment history, bank account number, credit card number, debit card number, or any other financial information, medical information, or health insurance information. Some personal information included in this category may overlap with other categories.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Collected: Yes.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Category C: Protected className=fication characteristics under California or federal law.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Examples: Age (40 years or older), race, color, ancestry, national origin, citizenship, religion or creed, marital status, medical condition, physical or mental disability, sex (including gender, gender identity, gender expression, pregnancy or childbirth and related medical conditions), sexual orientation, veteran or military status, genetic information (including familial genetic information).</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Collected: No.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Category D: Commercial information.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Examples: Records and history of products or services purchased or considered.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Collected: Yes.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Category E: Biometric information.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Examples: Genetic, physiological, behavioral, and biological characteristics, or activity patterns used to extract a template or other identifier or identifying information, such as, fingerprints, faceprints, and voiceprints, iris or retina scans, keystroke, gait, or other physical patterns, and sleep, health, or exercise data.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Collected: No.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Category F: Internet or other similar network activity.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Examples: Interaction with our Service or advertisement.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Collected: Yes.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Category G: Geolocation data.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Examples: Approximate physical location.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Collected: No.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Category H: Sensory data.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Examples: Audio, electronic, visual, thermal, olfactory, or similar information.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Collected: No.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Category I: Professional or employment-related information.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Examples: Current or past job history or performance evaluations.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Collected: No.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Category J: Non-public education information (per the Family Educational Rights and Privacy Act (20 U.S.C. Section 1232g, 34 C.F.R. Part 99)).</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Examples: Education records directly related to a student maintained by an educational institution or party acting on its behalf, such as grades, transcripts, className=lists, student schedules, student identification codes, student financial information, or student disciplinary records.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Collected: No.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Category K: Inferences drawn from other personal information.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Examples: Profile reflecting a person's preferences, characteristics, psychological trends, predispositions, behavior, attitudes, intelligence, abilities, and aptitudes.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Collected: No.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Under CCPA, personal information does not include:</span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Publicly available information from government records</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Deidentified or aggregated consumer information</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Information excluded from the CCPA's scope, such as:</span></p>
							</li>
						</ul>
						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Health or medical information covered by the Health Insurance Portability and Accountability Act of 1996 (HIPAA) and the California Confidentiality of Medical Information Act (CMIA) or clinical trial data</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Personal Information covered by certain sector-specific privacy laws, including the Fair Credit Reporting Act (FRCA), the Gramm-Leach-Bliley Act (GLBA) or California Financial Information Privacy Act (FIPA), and the Driver's Privacy Protection Act of 1994</span></p>
							</li>
						</ul>
						<h2 className="font_2 wixui-rich-text__text"></h2>
						<h2 className="font_2 wixui-rich-text__text"><span className="wixui-rich-text__text">Sources of Personal Information</span></h2>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">We obtain the categories of personal information listed above from the following categories of sources:</span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Directly from You. For example, from the forms You complete on our Service, preferences You express or provide through our Service, or from Your purchases on our Service.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Indirectly from You. For example, from observing Your activity on our Service.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Automatically from You. For example, through cookies We or our Service Providers set on Your Device as You navigate through our Service.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">From Service Providers. For example, third-party vendors to monitor and analyze the use of our Service, third-party vendors for payment processing, or other third-party vendors that We use to provide the Service to You.</span></p>
							</li>
						</ul>
						<h2 className="font_2 wixui-rich-text__text"></h2>
						<h2 className="font_2 wixui-rich-text__text"><span className="wixui-rich-text__text">Use of Personal Information for Business Purposes or Commercial Purposes</span></h2>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">We may use or disclose personal information We collect for "business purposes" or "commercial purposes" (as defined under the CCPA), which may include the following examples:</span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">To operate our Service and provide You with our Service.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">To provide You with support and to respond to Your inquiries, including to investigate and address Your concerns and monitor and improve our Service.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">To fulfill or meet the reason You provided the information. For example, if You share Your contact information to ask a question about our Service, We will use that personal information to respond to Your inquiry. If You provide Your personal information to purchase a product or service, We will use that information to process Your payment and facilitate delivery.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">To respond to law enforcement requests and as required by applicable law, court order, or governmental regulations.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">As described to You when collecting Your personal information or as otherwise set forth in the CCPA.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">For internal administrative and auditing purposes.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">To detect security incidents and protect against malicious, deceptive, fraudulent or illegal activity, including, when necessary, to prosecute those responsible for such activities.</span></p>
							</li>
						</ul>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Please note that the examples provided above are illustrative and not intended to be exhaustive. For more details on how we use this information, please refer to the "Use of Your Personal Data" section.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">If We decide to collect additional categories of personal information or use the personal information We collected for materially different, unrelated, or incompatible purposes We will update this Privacy Policy.</span></p>

						<h2 className="font_2 wixui-rich-text__text"><span className="wixui-rich-text__text"><span className="wixGuard wixui-rich-text__text">​</span></span></h2>
						<h2 className="font_2 wixui-rich-text__text"><span className="wixui-rich-text__text">Disclosure of Personal Information for Business Purposes or Commercial Purposes</span></h2>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">We may use or disclose and may have used or disclosed in the last twelve (12) months the following categories of personal information for business or commercial purposes:</span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Category A: Identifiers</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Category B: Personal information categories listed in the California Customer Records statute (Cal. Civ. Code § 1798.80(e))</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Category D: Commercial information</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Category F: Internet or other similar network activity</span></p>
							</li>
						</ul>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Please note that the categories listed above are those defined in the CCPA. This does not mean that all examples of that category of personal information were in fact disclosed, but reflects our good faith belief to the best of our knowledge that some of that information from the applicable category may be and may have been disclosed.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">When We disclose personal information for a business purpose or a commercial purpose, We enter a contract that describes the purpose and requires the recipient to both keep that personal information confidential and not use it for any purpose except performing the contract.</span></p>

						<h2 className="font_2 wixui-rich-text__text"></h2>
						<h2 className="font_2 wixui-rich-text__text"><span className="wixui-rich-text__text">Sale of Personal Information</span></h2>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">As defined in the CCPA, "sell" and "sale" mean selling, renting, releasing, disclosing, disseminating, making available, transferring, or otherwise communicating orally, in writing, or by electronic or other means, a consumer's personal information by the business to a third party for valuable consideration. This means that We may have received some kind of benefit in return for sharing personal information, but not necessarily a monetary benefit.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Please note that the categories listed below are those defined in the CCPA. This does not mean that all examples of that category of personal information were in fact sold, but reflects our good faith belief to the best of our knowledge that some of that information from the applicable category may be and may have been shared for value in return.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">We may sell and may have sold in the last twelve (12) months the following categories of personal information:</span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Category A: Identifiers</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Category B: Personal information categories listed in the California Customer Records statute (Cal. Civ. Code § 1798.80(e))</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Category D: Commercial information</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Category F: Internet or other similar network activity</span></p>
							</li>
						</ul>
						<h2 className="font_2 wixui-rich-text__text"></h2>
						<h2 className="font_2 wixui-rich-text__text"><span className="wixui-rich-text__text">Share of Personal Information</span></h2>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">We may share Your personal information identified in the above categories with the following categories of third parties:</span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Service Providers</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Payment processors</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Our affiliates</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Our business partners</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Third party vendors to whom You or Your agents authorize Us to disclose Your personal information in connection with products or services We provide to You</span></p>
							</li>
						</ul>
						<h2 className="font_2 wixui-rich-text__text"></h2>
						<h2 className="font_2 wixui-rich-text__text"><span className="wixui-rich-text__text">Sale of Personal Information of Minors Under 16 Years of Age</span></h2>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">We do not knowingly collect personal information from minors under the age of 16 through our Service, although certain third party websites that we link to may do so. These third-party websites have their own terms of use and privacy policies and we encourage parents and legal guardians to monitor their children's Internet usage and instruct their children to never provide information on other websites without their permission.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">We do not sell the personal information of Consumers We actually know are less than 16 years of age, unless We receive affirmative authorization (the "right to opt-in") from either the Consumer who is between 13 and 16 years of age, or the parent or guardian of a Consumer less than 13 years of age. Consumers who opt-in to the sale of personal information may opt-out of future sales at any time. To exercise the right to opt-out, You (or Your authorized representative) may submit a request to Us by contacting Us.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">If You have reason to believe that a child under the age of 13 (or 16) has provided Us with personal information, please contact Us with sufficient detail to enable Us to delete that information.</span></p>

						<h2 className="font_2 wixui-rich-text__text"></h2>
						<h2 className="font_2 wixui-rich-text__text"><span className="wixui-rich-text__text">Your Rights under the CCPA</span></h2>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">The CCPA provides California residents with specific rights regarding their personal information. If You are a resident of California, You have the following rights:</span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">The right to notice. You have the right to be notified which categories of Personal Data are being collected and the purposes for which the Personal Data is being used.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">The right to request. Under CCPA, You have the right to request that We disclose information to You about Our collection, use, sale, disclosure for business purposes and share of personal information. Once We receive and confirm Your request, We will disclose to You:</span></p>
							</li>
						</ul>
						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">The categories of personal information We collected about You</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">The categories of sources for the personal information We collected about You</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Our business or commercial purpose for collecting or selling that personal information</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">The categories of third parties with whom We share that personal information</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">The specific pieces of personal information We collected about You</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">If we sold Your personal information or disclosed Your personal information for a business purpose, We will disclose to You:</span></p>
							</li>
						</ul>
						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">The categories of personal information categories sold</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">The categories of personal information categories disclosed</span></p>
							</li>
						</ul>
						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">The right to say no to the sale of Personal Data (opt-out). You have the right to direct Us to not sell Your personal information. To submit an opt-out request please contact Us.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">The right to delete Personal Data. You have the right to request the deletion of Your Personal Data, subject to certain exceptions. Once We receive and confirm Your request, We will delete (and direct Our Service Providers to delete) Your personal information from our records, unless an exception applies. We may deny Your deletion request if retaining the information is necessary for Us or Our Service Providers to:</span></p>
							</li>
						</ul>
						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Complete the transaction for which We collected the personal information, provide a good or service that You requested, take actions reasonably anticipated within the context of our ongoing business relationship with You, or otherwise perform our contract with You.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Detect security incidents, protect against malicious, deceptive, fraudulent, or illegal activity, or prosecute those responsible for such activities.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Debug products to identify and repair errors that impair existing intended functionality.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Exercise free speech, ensure the right of another consumer to exercise their free speech rights, or exercise another right provided for by law.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Comply with the California Electronic Communications Privacy Act (Cal. Penal Code § 1546 et. seq.).</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Engage in public or peer-reviewed scientific, historical, or statistical research in the public interest that adheres to all other applicable ethics and privacy laws, when the information's deletion may likely render impossible or seriously impair the research's achievement, if You previously provided informed consent.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Enable solely internal uses that are reasonably aligned with consumer expectations based on Your relationship with Us.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Comply with a legal obligation.</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Make other internal and lawful uses of that information that are compatible with the context in which You provided it.</span></p>
							</li>
						</ul>
						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">The right not to be discriminated against. You have the right not to be discriminated against for exercising any of Your consumer's rights, including by:</span></p>
							</li>
						</ul>
						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Denying goods or services to You</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Charging different prices or rates for goods or services, including the use of discounts or other benefits or imposing penalties</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Providing a different level or quality of goods or services to You</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Suggesting that You will receive a different price or rate for goods or services or a different level or quality of goods or services</span></p>
							</li>
						</ul>
						<h2 className="font_2 wixui-rich-text__text"></h2>
						<h2 className="font_2 wixui-rich-text__text"><span className="wixui-rich-text__text">Exercising Your CCPA Data Protection Rights</span></h2>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">In order to exercise any of Your rights under the CCPA, and if You are a California resident, You can contact Us:</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">By email: <a className="wixui-rich-text__text" href="mailto:soumya.ramana@tivrahealth.com" data-auto-recognition="true">soumya.ramana@tivrahealth.com</a></span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">By visiting this page on our website: <a className="wixui-rich-text__text" href="http://www.tivrahealth.com/" target="_blank" rel="noopener" data-auto-recognition="true">www.tivrahealth.com</a></span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Only You, or a person registered with the California Secretary of State that You authorize to act on Your behalf, may make a verifiable request related to Your personal information.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Your request to Us must:</span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Provide sufficient information that allows Us to reasonably verify You are the person about whom We collected personal information or an authorized representative</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Describe Your request with sufficient detail that allows Us to properly understand, evaluate, and respond to it</span></p>
							</li>
						</ul>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">We cannot respond to Your request or provide You with the required information if We cannot:</span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Verify Your identity or authority to make the request</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">And confirm that the personal information relates to You</span></p>
							</li>
						</ul>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">We will disclose and deliver the required information free of charge within 45 days of receiving Your verifiable request. The time period to provide the required information may be extended once by an additional 45 days when reasonable necessary and with prior notice.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Any disclosures We provide will only cover the 12-month period preceding the verifiable request's receipt.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">For data portability requests, We will select a format to provide Your personal information that is readily useable and should allow You to transmit the information from one entity to another entity without hindrance.</span></p>

						<h2 className="font_2 wixui-rich-text__text"></h2>
						<h2 className="font_2 wixui-rich-text__text"><span className="wixui-rich-text__text">Do Not Sell My Personal Information</span></h2>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">You have the right to opt-out of the sale of Your personal information. Once We receive and confirm a verifiable consumer request from You, we will stop selling Your personal information. To exercise Your right to opt-out, please contact Us.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">The Service Providers we partner with (for example, our analytics or advertising partners) may use technology on the Service that sells personal information as defined by the CCPA law. If you wish to opt out of the use of Your personal information for interest-based advertising purposes and these potential sales as defined under CCPA law, you may do so by following the instructions below.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Please note that any opt out is specific to the browser You use. You may need to opt out on every browser that You use.</span></p>

						<h3 className="font_3 wixui-rich-text__text"><span className="wixui-rich-text__text">Website</span></h3>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">You can opt out of receiving ads that are personalized as served by our Service Providers by following our instructions presented on the Service:</span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">The NAI's opt-out platform: <a className="wixui-rich-text__text" href="http://www.networkadvertising.org/choices/" target="_blank" rel="noreferrer noopener">http://www.networkadvertising.org/choices/</a></span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">The EDAA's opt-out platform <a className="wixui-rich-text__text" href="http://www.youronlinechoices.com/" target="_blank" rel="noreferrer noopener">http://www.youronlinechoices.com/</a></span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">The DAA's opt-out platform: <a className="wixui-rich-text__text" href="http://optout.aboutads.info/?c=2&amp;lang=EN" target="_blank" rel="noreferrer noopener">http://optout.aboutads.info/?c=2&amp;lang=EN</a></span></p>
							</li>
						</ul>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">The opt out will place a cookie on Your computer that is unique to the browser You use to opt out. If you change browsers or delete the cookies saved by your browser, You will need to opt out again.</span></p>

						<h3 className="font_3 wixui-rich-text__text"></h3>
						<h3 className="font_3 wixui-rich-text__text"><span className="wixui-rich-text__text">Mobile Devices</span></h3>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Your mobile device may give You the ability to opt out of the use of information about the apps You use in order to serve You ads that are targeted to Your interests:</span></p>

						<ul className="font_8 wixui-rich-text__text">
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">"Opt out of Interest-Based Ads" or "Opt out of Ads Personalization" on Android devices</span></p>
							</li>
							<li className="wixui-rich-text__text">
								<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">"Limit Ad Tracking" on iOS devices</span></p>
							</li>
						</ul>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">You can also stop the collection of location information from Your mobile device by changing the preferences on Your mobile device.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">"Do Not Track" Policy as Required by California Online Privacy Protection Act (CalOPPA)</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Our Service does not respond to Do Not Track signals.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">However, some third party websites do keep track of Your browsing activities. If You are visiting such websites, You can set Your preferences in Your web browser to inform websites that You do not want to be tracked. You can enable or disable DNT by visiting the preferences or settings page of Your web browser.</span></p>
						<p className="font_8 wixui-rich-text__text"></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Children's Privacy</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.</span></p>
						<p className="font_8 wixui-rich-text__text"></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent's consent before We collect and use that information.</span></p>
						<p className="font_8 wixui-rich-text__text"></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Your California Privacy Rights (California's Shine the Light law)</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Under California Civil Code Section 1798 (California's Shine the Light law), California residents with an established business relationship with us can request information once a year about sharing their Personal Data with third parties for the third parties' direct marketing purposes.</span></p>
						<p className="font_8 wixui-rich-text__text"></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">If you'd like to request more information under the California Shine the Light law, and if You are a California resident, You can contact Us using the contact information provided below.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">California Privacy Rights for Minor Users (California Business and Professions Code Section 22581)</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">California Business and Professions Code section 22581 allow California residents under the age of 18 who are registered users of online sites, services or applications to request and obtain removal of content or information they have publicly posted.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text"><span className="wixGuard wixui-rich-text__text">​</span></span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">To request removal of such data, and if You are a California resident, You can contact Us using the contact information provided below, and include the email address associated with Your account.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text"><span className="wixGuard wixui-rich-text__text">​</span></span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Be aware that Your request does not guarantee complete or comprehensive removal of content or information posted online and that the law may not permit or require removal in certain circumstances.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Links to Other Websites</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text"><span className="wixGuard wixui-rich-text__text">​</span></span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text"><span className="wixGuard wixui-rich-text__text">​</span></span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Changes to this Privacy Policy</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text"><span className="wixGuard wixui-rich-text__text">​</span></span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text"><span className="wixGuard wixui-rich-text__text">​</span></span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">Contact Us</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text"><span className="wixGuard wixui-rich-text__text">​</span></span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">If you have any questions about this Privacy Policy, You can contact us:</span></p>
						<p className="font_8 wixui-rich-text__text"><span className="wixui-rich-text__text">By email: <a className="wixui-rich-text__text" href="mailto:soumya.ramana@tivrahealth.com" data-auto-recognition="true">soumya.ramana@tivrahealth.com</a></span></p>
					</div>
				</div>
			</main>
			{/* Include your Footer component */}
			{<footer><Footer /></footer>}
		</>
	);
};
// Define your CSS styles
const privacyPolicyStyles = {
	container: {
		width: "70%",
		margin: "0 auto",
	},
	heading: {
		fontSize: "24px",
		marginBottom: "10px",
	},
	sectionHeading: {
		fontSize: "20px",
		marginBottom: "10px",
	},
	text: {
		fontSize: "16px",
		marginBottom: "20px",
	},
	listItem: {
		fontWeight: "bold",
	},
};





