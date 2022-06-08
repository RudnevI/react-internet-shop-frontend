import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./state/productSlice";

export default configureStore({
  reducer: {
    products: productReducer,
  },
});
