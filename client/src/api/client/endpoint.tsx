const apiConfig = {
	BASE_URL: "https://uattivrafit.com",
	GET: {
		//payment plan role
		PAYMENT_PLAN_ROLE: "/plan/payment-plan-role",

		//user
		USER_DEMOGRAPHIC: "/user/demographic/userId",
		USER_SOCIAL: "/user/social/userId",
		USER_HEALTH_FITNESS: "/user/health-fitness/userId",
		CORPORATE_DETAIL: "/account/corporate-detail",
		USER_INFO: "/user/userId",

		VALIDATE_NPI: "/organization/npi/validate/number",

		//Team
		TEAM_INFO: "/team/info/userId",
		TEAMMATE_DETAIL: "/team/member/data/teammateId/filter",

		//dashboard
		DASHBOARD_DATA: "/dashboard/data/userId/filter",

		//dashboard configuration
		DC_TEAM_PREFERENCE: "/dashboard/config/preference/team/userId",
		DC_DASHBOARD_PREFERENCE: "/dashboard/config/preference/dashboard/userId",
		USER_DASHBOARD_CONFIG: "/dashboard/config/userId",

		//device
		ALL_ACTIVE_DEVICE: "/device",
		USER_DEVICE: "/device/userId",

		//nutrition
		NUTRITION_SEARCH: "/nutrition/search/filter",
		USER_NUTRITION_LOG: "/nutrition-log/userId",

		//invite
		MY_INVITE: "/invite/sent/userId",
		MY_APPROVAL: "/invite/receive/userId",

		//icon
		LOAD_ICON: "/image/icon/loadAll",

		LOAD_ORGANIZATION_BY_NAME: "/organization/load/orgName",

		LOAD_ALL_USER_ROLES: "/user/role/loadAll",
	},
	POST: {
		AI_CONSULT: "/openai/chat",
		REGISTER_USER: "/account/register",
		OTP_GENERATE: "/account/otp-generate",
		OTP_VALIDATE: "/account/otp-validate",
		SIGN_IN: "/account/login",
		NUTRITION_FOOD_DETAIL: "/nutrition/food-detail",
		NUTRITION_UPLOAD: "/nutrition-log/upload",
		SENT_INVITE: "/invite",

		PAYMENT_LINK: "/payment/create/payment-link",
		DEVICE_WIDGET_SESSION: "/device/widget-session",
		DEVICE_SESSION: "/device/device-session",
		DEVICE_REGISTER: "/device/register",
		CREATE_ORGANIZATION: "/organization/create",

		SAVE_DASHBOARD_CONFIG: "/dashboard/config",

		GOOGLE_ADDRESS_VALIDATION: "/google/validate/address",
	},
	PUT: {
		USER_ROLE: "/user/role",
		USER_DEMOGRAPHIC: "/user/demographic",
		USER_SOCIAL: "/user/social",
		USER_HEALTH_FITNESS: "/user/healthFitness",
		USER_CORPORATE_ASSOCIATION: "/user/corporateAssociation",
		USER_PASSWORD_RESET: "/account/reset-password",
		USER_DETAIL: "/user/account",
		USER_PROFILE: "/user/account/edit",
		UPDATE_INVITE: "/invite/update",
		REJECT_INVITE: "/invite/reject",
		UPDATE_DEVICE_STATUS: "/device/update",

		USER_DASHBOARD_PREFERENCE: "/dashboard/config/preference/dashboard",
		USER_TEAM_PREFERENCE: "/dashboard/config/preference/team",
	},
	DELETE: {
		DELETE_USER_DASHBOARD_PREFERENCE: "",
		DELETE_USER_TEAM_PREFERENCE: "",
		DE_REGISTER_DEVICE: "/device/delete/terraDeviceUserId/tivraUserId",
		NUTRITION_LOG: "/nutrition-log/remove/nutritionLogId",
	},
};

export default apiConfig;
