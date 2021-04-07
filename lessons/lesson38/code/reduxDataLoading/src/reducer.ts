import { Reducer } from "redux";

export type State = {
  isLoading: boolean;
  data: any | undefined;
  error: Error | undefined;
};

const initialState: State = {
  isLoading: false,
  data: undefined,
  error: undefined,
};

export const apiReducer: Reducer<State> = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true };
    case "SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: undefined,
      };
    case "ERROR":
      return {
        ...state,
        isLoading: false,
        data: undefined,
        error: action.error,
      };
    default:
      return state;
  }
};
