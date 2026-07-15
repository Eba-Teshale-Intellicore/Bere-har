// src/api/axios.ts

import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,

  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

// Refresh JWT

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      let refresh = null;

      if (typeof window !== "undefined") {
        refresh = localStorage.getItem("refreshToken");
      }

      if (refresh) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}accounts/token/refresh/`,

            {
              refresh,
            },
          );

          const newAccess = response.data.access;

          localStorage.setItem("accessToken", newAccess);

          originalRequest.headers.Authorization = `Bearer ${newAccess}`;

          return api(originalRequest);
        } catch (error) {
          localStorage.removeItem("accessToken");

          localStorage.removeItem("refreshToken");
          console.log(error);
        }
      }
    }

    return Promise.reject(error);
  },
);

export default api;
