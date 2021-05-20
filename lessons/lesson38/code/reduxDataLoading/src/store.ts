import { createStore, applyMiddleware } from "redux";
import { apiReducer } from "./reducer";
import { loggerMiddleware } from "./logger";

export const store =
  typeof loggerMiddleware === "function"
    ? createStore(apiReducer, applyMiddleware(loggerMiddleware))
    : createStore(apiReducer);
