// import { useAuthToken } from "@/helpers/use-auth-token";
import { actionToken } from "@/helpers/action-token";
import axios from "axios";
const apiUrl = import.meta.env.VITE_APP_API_URL;


export const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const { getToken } = actionToken
    const authorization = getToken('token');
    config.headers['x-auth-token'] = authorization;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);