import axios from "axios";
import { url } from "./urlBase";

// Automatically determine the server IP
const BASE_URL = url; // Default port is 8000, adjust if needed

// Create Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to the header
apiClient.interceptors.request.use(async (config) => {
  if (config.url === "/token/refresh") {
    return config;
  }
  let token = localStorage.getItem("access_token");
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
});

// Request interceptor
const refreshToken = async (error) => {
  if (
    error.response?.status === 401 &&
    error.config &&
    !error.config.__isRetryRequest
  ) {
    error.config.__isRetryRequest = true;
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      const response = await apiClient.post("/token/refresh", {
        data: { refresh_token: refreshToken },
      });
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      error.config.headers["Authorization"] =
        "Bearer " + response.data.access_token;
      return apiClient(error.config);
    } catch (error) {
      if (error.response?.status === 500) {
        const theme = localStorage.getItem("theme");
        localStorage.clear();
        localStorage.setItem("theme", theme);
        window.location.href = "/admin-sign-in";
      }
      console.error("Refresh token failed:", error?.message);
      return Promise.reject(error);
    }
  }
  return Promise.reject(error);
};

apiClient.interceptors.request.use((config) => {
  console.log(`Requesting [${config.method.toUpperCase()}] ${config.url}`);
  return config;
}, refreshToken);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response.data; // Simplify response handling
  },
  (error) => {
    if (error.response?.status === 401) {
      return refreshToken(error);
    }
    console.error("Response Error:", error.message);
    if (error.response) {
      console.error("Error Response Data:", error.response.data);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
