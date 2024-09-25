import axios from "axios";
import { config } from "@/config/config";

export const http = axios.create({
  baseURL: config.BASE_URL,
});

http.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem("AuthToken") || null;
  return config;
});

export const userLogin = async (data, params, headers) =>
  http.post("/api/user/login", data, { params, headers });

export const signup = async (data, params, headers) =>
  http.post("/api/user", data, { params, headers });

export const addTask = async (data, params, headers) =>
  http.post("/api/task", data, { params, headers });

export const validate = async (params, headers) =>
  http.get(`/api/user/current`, {
    params,
    headers,
  });

export const logout = async (params, headers) =>
  http.post("/api/user/logout", { params, headers });

export const getUserTasks = async (userId, params, headers) =>
  http.get(`/api/task?userId=${userId}`, { params, headers });

export const deleteTask = async (taskId, params, headers) =>
  http.delete(`/api/task/${taskId}`, { params, headers });

export const sendMail = async (data, params, headers) =>
  http.post("/api/mail", data, { params, headers });
