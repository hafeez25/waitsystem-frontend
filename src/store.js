import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux";

export default configureStore({
  reducer: rootReducer,
  devTools:window.location.origin.includes('localhost')
});