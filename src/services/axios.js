import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.VUE_APP_API_BASE_URL}/api`,
  timeout: 10000, // Optional: Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      (error.response && error.response.status === 401) ||
      error.response.status === 403
    ) {
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
