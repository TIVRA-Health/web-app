/**
 * All application scope actions
 */
import { ImmerReducer } from "use-immer";
import { IAppState } from "..";

export type IAppStateAction =
  | {
      type: "SET_IS_DIRTY";
      isDirty: boolean;
    }
  | {
      type: "SET_IS_LOADING";
      loading: boolean;
    };

export const appStateReducer: ImmerReducer<IAppState, IAppStateAction> = (
	draft,
	action
): IAppState => {
	switch (action.type) {
	case "SET_IS_DIRTY":
		draft.isDirty = action.isDirty;
		return draft;
	case "SET_IS_LOADING":
		draft.loading = action.loading;
		return draft;

	default:
		throw Error("unknown action");
	}
};
