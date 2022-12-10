import { createSlice } from "@reduxjs/toolkit";
import { Grid, CircularProgress } from "@mui/material";
const initialState = [];

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    fetchAllPosts(state, action) {
      //fetchAll called
      return action.payload;
    },
    createOnePost(state, action) {
      //create a post
      // console.log("Creating a Post.");
      return [...state, action.payload];
    },
    updateOnePost(state, action) {
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    },
    deleteOnePost(state, action) {
      return state.filter((post) => post._id !== action.payload.id);
    },
  },
});
export const { fetchAllPosts, createOnePost, updateOnePost, deleteOnePost } =
  postSlice.actions;
export default postSlice;
