import { LoginResponse } from "api/useLoginAPI";
import { useLocalStorage } from "hooks/useLocalStorage";
import { STORAGE_USER_INFO_KEY, STORAGE_USER_TOKEN_KEY } from "main";
import { createContext, useCallback, useContext, useMemo } from "react";
import { Navigate, useNavigate } from "react-router-dom";

interface IAuthProvider {
	user: LoginResponse | null;
	logout: () => void;
	token: string;
	isAuthenticated: boolean;
}

export const AuthContext = createContext<IAuthProvider>({ user: null } as IAuthProvider);

export const AuthProvider = ({ children }: any) => {
	const [user, setUser] = useLocalStorage(STORAGE_USER_INFO_KEY, null);
	const [token, setToken] = useLocalStorage(STORAGE_USER_TOKEN_KEY, null);
	const navigate = useNavigate();

	const logout = useCallback(() => {
		console.log("logout");
		setUser(null);
		setToken(null);
		navigate("/", { replace: true });
	}, [navigate, setToken, setUser]);

	const value = useMemo(
		() => ({
			user,
			token,
			logout,
			isAuthenticated: user !== null && token !== null,
		}),
		[logout, user, token]
	);

	if (!user || !token) {
		return <Navigate to="/" />;
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};
