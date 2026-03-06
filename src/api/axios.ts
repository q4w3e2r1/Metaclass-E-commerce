import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  config.headers.Accept = "application/json";
  config.headers.Authorization = `Bearer ${import.meta.env.VITE_API_TOKEN}`
  return config;
});