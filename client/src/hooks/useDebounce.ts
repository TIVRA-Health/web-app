import React from "react";

export function useDebounce<T>(value: T, delay: number) {
	const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

	React.useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
}

export function useFunctionDebounce<T>(fn: T, delay: number) {
	const functionRef = React.useRef(fn);

	React.useEffect(() => {
		const handler = setTimeout(() => {
			functionRef.current = fn;
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [fn, delay]);

	return functionRef.current;
}
