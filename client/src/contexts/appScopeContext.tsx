import { CircularProgress } from "@mui/material";
import { createContext } from "react";
import { useImmerReducer } from "use-immer";
import { IAppScopeProviderProps, IAppState } from ".";
import { IAppStateAction, appStateReducer } from "./actions";

export const AppStateDispatcherContext =
  createContext<React.Dispatch<IAppStateAction> | null>(null);

export const AppStateContext = createContext<IAppState | null>(null);

/**
 * Initial app state
 */
const initialAppState: IAppState = {
	loading: false,
	isDirty: false,
	notification: undefined,
};

export const AppScopeProvider = ({ children }: IAppScopeProviderProps) => {
	const [appState, stateDispatcher] = useImmerReducer(
		appStateReducer,
		initialAppState
	);

	if (appState.loading) return <CircularProgress />;
	return (
		<AppStateDispatcherContext.Provider value={stateDispatcher}>
			<AppStateContext.Provider value={appState}>
				{children}
			</AppStateContext.Provider>
		</AppStateDispatcherContext.Provider>
	);
};
