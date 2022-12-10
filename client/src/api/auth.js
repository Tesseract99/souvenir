import axios from "axios";
const url = "http://localhost:5000/auth";

const API = axios.create({ baseURL: url });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const signInRequest = (formData) => {
  return API.post(`/signin`, formData);
};
export const signUpRequest = (formData) => {
  return API.post(`/signup`, formData);
};
