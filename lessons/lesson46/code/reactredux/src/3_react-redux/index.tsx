import React from "react";
import { store } from "../store";
import { Provider } from "react-redux";
import { Counter } from "./Counter";

export const App = () => (
  <Provider store={store}>
    <Counter />
  </Provider>
);
