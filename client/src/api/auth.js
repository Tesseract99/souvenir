import axios from "axios";
const url = "https://souvenir-brkr.onrender.com/auth";

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
