import axios from "axios";
import { config } from "@/config/config";

export const http = axios.create({
  baseURL: config.BASE_URL,
});

// http.interceptors.request.use((config) => {
//   config.headers.Authorization = localStorage.getItem("authToken") || null;
//   return config;
// });

export const userLogin = async (data, params, headers) =>
  http.post("/api/user/login", data, { params, headers });

export const signup = async (data, params, headers) =>
  http.post("/api/user", data, { params, headers });

export const addTask = async (data, params, headers) =>
  http.post("/api/task", data, { params, headers });
