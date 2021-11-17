import { createSlice } from "@reduxjs/toolkit";

export const actionsCounterSlice = createSlice({
  name: "actionsCounter",
  initialState: {
    count: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addDefaultCase((state) => {
      state.count++;
    });
  },
});
