import { STORAGE_ROLES_KEY, STORAGE_USER_INFO_KEY } from "main";
import { useEffect, useState } from "react";

export const RoleIdentifier = ({ screenName, children }: any) => {
	let userData: any = window.localStorage.getItem(STORAGE_USER_INFO_KEY);
	userData = userData ? JSON.parse(userData) : {};

	const [isUserAuthorized, setIsUserAuthorized] = useState(false);

	const userInMemoryRoles: any = window.localStorage.getItem(STORAGE_ROLES_KEY);
	const userRoles = JSON.parse(userInMemoryRoles);
	useEffect(() => {
		if (userRoles) {
			userRoles?.map((role: any) => {
				if (role.id == userData?.userRoleId) {
					setIsUserAuthorized(role.screen[screenName]);
				}
			});
		}
	}, [userRoles?.data, screenName]);

	return isUserAuthorized ? children : null;
};
