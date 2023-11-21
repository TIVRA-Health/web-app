import { useAuth } from "contexts/AuthProvider";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: any) => {
	const { user } = useAuth();
	if (!user) {
		// user is not authenticated
		return <Navigate to="/" />;
	}
	return children;
};
