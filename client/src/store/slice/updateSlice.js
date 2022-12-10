import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: {},
  currentId: null,
};

const updateSlice = createSlice({
  name: "update",
  initialState,
  reducers: {
    populateForm(state, action) {
      //return {post, currentId}
      //   console.log(action.payload);
      return {
        post: action.payload,
        currentId: action.payload._id,
      };
    },
  },
});

export const { populateForm } = updateSlice.actions;
export default updateSlice;
