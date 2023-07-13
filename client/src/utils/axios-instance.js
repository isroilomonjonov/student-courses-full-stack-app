import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "/api/v1/",
  // baseURL:"https://student-courses.onrender.com/api/v1"
});
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
});
export default axiosInstance;
