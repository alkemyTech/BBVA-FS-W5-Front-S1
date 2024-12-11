import axios from "axios";

const apiConfig = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiConfig.interceptors.request.use(
  (config) => {
    if (!config.url.startsWith("/auth")) {
      const token = localStorage.getItem("token"); 
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Añade el token al header
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiConfig;