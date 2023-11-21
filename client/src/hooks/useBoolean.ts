import React, { useState } from "react";

export const useBoolean = (initialState = false): [boolean, () => void, () => void] => {
	const [value, setValue] = useState(initialState);

	const setTrue = React.useCallback(() => {
		setValue(true);
	}, [setValue]);

	const setFalse = React.useCallback(() => {
		setValue(false);
	}, [setValue]);

	return [value, setTrue, setFalse];
};
