import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Automatically send JWT with protected requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// AUTH

export const signupUser = (userData) => {
  return API.post("/auth/signup", userData);
};

export const loginUser = (userData) => {
  return API.post("/auth/login", userData);
};


// POSTS

export const getPosts = () => {
  return API.get("/posts");
};

export const createPost = (postData) => {
  return API.post("/posts", postData);
};

export const likePost = (postId) => {
  return API.post(`/posts/${postId}/like`);
};

export const commentPost = (postId, text) => {
  return API.post(`/posts/${postId}/comment`, {
    text,
  });
};

export default API;