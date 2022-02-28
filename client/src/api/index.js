import axios from "axios";

// https://memories-project-ytb.herokuapp.com/posts
const API = axios.create({ baseURL: "http://localhost:5000" });

/** POSTS */
export const fetchPosts = () => API.get("/posts");
export const createPost = (post) => API.post("/posts", post);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

/** USER */
export const signin = (user) => API.post("/auth/signin", user);
export const signup = (user) => API.post("/auth/signup", user);