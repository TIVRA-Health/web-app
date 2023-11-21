import { Dashboard, ForgotPassword, PrivacyPolicy, SignUp, TermsAndConditions, ResetPassword } from "pages";
import { Navigate, useRoutes } from "react-router-dom";
import { appLinks, dashboardLinks } from "main";
import { BasicProfile, CreateAccount, CreateProfile, DeviceRegistration, PaymentDetails } from "components/Account";
import { Home } from "pages/HomePage";
import { Overview } from "components/Dashboard/Overview";
import { MyTeams } from "components/Dashboard/MyTeams";
import { NutritionLog } from "components/Dashboard/Nutrition/NutritionLog";
import { AuthProvider } from "contexts/AuthProvider";
import { DashboardConfiguration } from "components/Dashboard/DashboardConfiguration";
import { AIConsultation } from "components/Dashboard/AIConsultation";
import { Devices } from "components/Dashboard/Devices";
import { MyConnections } from "components/Dashboard/MyConnections/MyConnections";
import { MyAccount } from "components/Dashboard/MyAccount";
import { SuperAdmin } from "components/Dashboard/SuperAdmin";
import { RoleIdentifier } from "contexts/RoleIdentifier";

export const AppRoutes = () => {
	const elements = useRoutes([
		{
			path: appLinks.index,
			element: <Home />,
		},
		{
			path: appLinks.signUp,
			element: <SignUp />,
			children: [
				{
					path: appLinks.createAccount,
					element: <CreateAccount />,
				},
				{
					path: `${appLinks.paymentDetails}/:profileType?`,
					element: (
						<AuthProvider>
							<PaymentDetails />
						</AuthProvider>
					),
				},
				{
					path: appLinks.createProfile,
					element: (
						<AuthProvider>
							<CreateProfile />
						</AuthProvider>
					),
					children: [
						{
							path: ":profileType",
							element: (
								<AuthProvider>
									<BasicProfile />
								</AuthProvider>
							),
						},
					],
				},
				{
					path: appLinks.deviceRegistration,
					element: (
						<AuthProvider>
							<DeviceRegistration />
						</AuthProvider>
					),
				},
				{
					path: "*",
					element: <Navigate to={appLinks.index} replace />,
				},
			],
		},
		{
			path: appLinks.dashboard,
			element: (
				<AuthProvider>
					<Dashboard />
				</AuthProvider>
			),
			children: [
				{
					path: dashboardLinks.overview,
					element: (
						<AuthProvider>
							<RoleIdentifier screenName={"individualDashboard"}>
								<Overview />
							</RoleIdentifier>
						</AuthProvider>
					),
				},
				{
					path: `${dashboardLinks.myTeam}/:mateId?`,
					element: (
						<AuthProvider>
							<RoleIdentifier screenName={"teamDashboard"}>
								<MyTeams />
							</RoleIdentifier>
						</AuthProvider>
					),
				},
				{
					path: dashboardLinks.configureDashboard,
					element: (
						<AuthProvider>
							<RoleIdentifier screenName={"metricConfiguration"}>
								<DashboardConfiguration />
							</RoleIdentifier>
						</AuthProvider>
					),
				},
				{
					path: dashboardLinks.devices,
					element: (
						<AuthProvider>
							<RoleIdentifier screenName={"newDeviceRegistration"}>
								<Devices />
							</RoleIdentifier>
						</AuthProvider>
					),
				},
				{
					path: dashboardLinks.nutritionLog,
					element: (
						<AuthProvider>
							<RoleIdentifier screenName={"nutritionDataEntry"}>
								<NutritionLog />
							</RoleIdentifier>
						</AuthProvider>
					),
				},
				{
					path: dashboardLinks.myConnections,
					element: (
						<AuthProvider>
							<RoleIdentifier screenName={"individualDashboard"}>
								<MyConnections />
							</RoleIdentifier>
						</AuthProvider>
					),
				},
				{
					path: dashboardLinks.aiConsultation,
					element: (
						<AuthProvider>
							<RoleIdentifier screenName={"aiConsultation"}>
								<AIConsultation />
							</RoleIdentifier>
						</AuthProvider>
					),
				},
				{
					path: dashboardLinks.myAccount,
					element: (
						<AuthProvider>
							<RoleIdentifier screenName={"myAccount"}>
								<MyAccount />
							</RoleIdentifier>
						</AuthProvider>
					),
				},
				{
					path: dashboardLinks.superAdmin,
					element: (
						<AuthProvider>
							<RoleIdentifier screenName={"individualDashboard"}>
								<SuperAdmin />
							</RoleIdentifier>
						</AuthProvider>
					),
				},
			],
		},
		{
			path: appLinks.forgotPassword,
			element: <ForgotPassword />,
		},
		{
			path: appLinks.privacyPolicy,
			element: <PrivacyPolicy />,
		},
		{
			path: appLinks.termsAndConditions,
			element: <TermsAndConditions />,
		},
		{
			path: appLinks.resetPassword,
			element: <ResetPassword />,
		},
	]);

	return elements;
};
