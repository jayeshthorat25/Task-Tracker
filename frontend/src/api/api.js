import axios from "axios";
import { set } from "date-fns";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { redirectToLogin } from "../navigate/authRedirect";

const API_BASE_URL = "http://localhost:8000/api";


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const apiPublic = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// const navigate = useNavigate();

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry && !originalRequest.url.includes("/auth/refresh")) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await api.post(
          `/auth/refresh`,
          {},
          { withCredentials: true }
        );
        const newAccessToken = refreshResponse.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        toast.error("Session expired. Redirecting to login...", { autoClose: 3000 });
        // redirectToLogin()
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;

export { apiPublic };

