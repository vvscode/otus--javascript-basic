import { configureStore } from "@reduxjs/toolkit";
import { actionsCounterSlice } from "./actionsCounter";
import { counterSlice } from "./counter";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    actionsCounter: actionsCounterSlice.reducer,
  },
});
