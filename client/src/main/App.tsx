import { AppScopeProvider } from "contexts";
import { AppRoutes } from "main";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			useErrorBoundary: true,
			retry: false,
		},
	},
});

export const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<AppScopeProvider>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<ToastContainer />
					<AppRoutes />
				</LocalizationProvider>
			</AppScopeProvider>
		</QueryClientProvider>
	);
};
