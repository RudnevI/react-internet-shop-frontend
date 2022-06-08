import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsArray: [],
  pageCount: 0,
  currentPage: 0,
  currentRequest: "",
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    get: (state) => {
      return state.value.slice();
    },
    set: (state, action) => {
      state.productsArray = action.payload;
      console.log(state.productsArray);
    },
    setPageCount: (state, action) => {
      state.pageCount = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setCurrentRequest: (state, action) => {
      state.currentRequest = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { get, set } = productsSlice.actions;

export default productsSlice.reducer;
