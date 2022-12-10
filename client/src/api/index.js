import axios from "axios";

const url = "http://localhost:5000";
// const url = "https://salty-shelf-09646.herokuapp.com/posts";

const API = axios.create({ baseURL: url });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);

export const updatePost = (id, updatedPost) =>
  API.patch(`posts/${id}`, updatedPost);
export const deletePost = ({ _id, creatorId }) => {
  console.log("id to be deleted: ", _id, creatorId);

  return API.delete(`posts/${_id}`, { data: { creatorId } });
};

export const likePost = (id) => {
  return API.patch(`/posts/${id}/likePost`);
};
