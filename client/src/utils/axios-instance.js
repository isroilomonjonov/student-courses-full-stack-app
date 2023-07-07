import axios from "axios";
console.log(window.location.protocol);

// localhost
console.log(window.location.hostname);
const axiosInstance=axios.create({
  // baseURL: "http://localhost:8080/api/v1"
  baseURL:"https://student-courses-full-stack-app.vercel.app/api/v1"
});
// https://student-course-t530.onrender.com
axiosInstance.interceptors.request.use((config)=>{
const token = localStorage.getItem("token");
if(token){
  config.headers["Authorization"]="Bearer " + token;
}
return config;
})
export default axiosInstance;