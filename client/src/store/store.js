import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./slice/postSlice";
import updateSlice from "./slice/updateSlice";
import authSlice from "./slice/authSlice";
const reducer = {
  posts: postSlice.reducer,
  update: updateSlice.reducer,
  auth: authSlice.reducer,
};

const store = configureStore({
  reducer,
});

export default store;
