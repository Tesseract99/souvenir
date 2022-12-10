import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authData: JSON.parse(localStorage.getItem("profile")),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logger(state, action) {
      console.log(action?.payload);
      return state;
    },
    auth(state, action) {
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return {
        ...state,
        authData: action.payload,
        loading: false,
        errors: null,
      };
    },
    logout(state, action) {
      localStorage.clear();
      return { ...state, authData: null, loading: false, errors: null };
    },
  },
});
export const { auth, logout, logger } = authSlice.actions;
export default authSlice;
