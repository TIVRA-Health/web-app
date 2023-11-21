import axios from "axios";
import { STORAGE_USER_TOKEN_KEY } from "main";

const axiosConfig = axios.create({
	baseURL: "http://18.206.136.4:82/",
});

// Add a request interceptor
axiosConfig.interceptors.request.use(
	function (config) {
		let token = window.localStorage.getItem(STORAGE_USER_TOKEN_KEY);
		token = token ? JSON.parse(token) : "";
		if (token) {
			config.headers.Authorization = "Bearer " + token;
		}
		// Do something before request is sent
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);
export default axiosConfig;
