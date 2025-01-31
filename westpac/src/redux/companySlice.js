import { createSlice } from "@reduxjs/toolkit";
import data from "../sample-data.json";

const initialState = data;

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompanyInfo: (state, action) => {
      state.companyInfo = action.payload;
    },
  },
});

export const { setCompanyInfo } = companySlice.actions;

export default companySlice.reducer;
