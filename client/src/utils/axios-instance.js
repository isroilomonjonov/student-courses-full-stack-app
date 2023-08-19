import axios from "axios";
const axiosInstance = axios.create({
  // baseURL: "/api/v1/",
  baseURL: "http://localhost:8080/api/v1/",
});
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      (error.response &&
      error.response.status === 500 &&
      error.response.data.message === "jwt expired")||(error.response.status===401)
    ) {
       window.location.replace("/login");
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
