import { useCallback, useEffect, useMemo } from "react";
import { parseJwt } from "../main/utils";
import { useLocalStorage } from "hooks/useLocalStorage";
import { STORAGE_USER_INFO_KEY, STORAGE_USER_TOKEN_KEY } from "../main/constants";
import { useAuth } from "contexts/AuthProvider";

export const useAuthVerify = () => {
	const { logout } = useAuth();
	const [user, setUser] = useLocalStorage(STORAGE_USER_INFO_KEY, null);
	const [token, setToken] = useLocalStorage(STORAGE_USER_TOKEN_KEY, null);

	const isAuthenticated = useMemo(() => user !== null && token !== null, [token, user]);

	const validateToken = useCallback(() => {
		const decodedJwt = parseJwt(token);

		if (decodedJwt === null || decodedJwt.exp * 1000 < Date.now()) {
			setToken(null);
			setUser(null);
			logout();
		}
	}, [logout, setToken, setUser, token]);

	useEffect(() => {
		if (token) {
			validateToken();
		} else {
			logout();
		}
	}, [logout, token, validateToken]);

	return { isAuthenticated };
};
