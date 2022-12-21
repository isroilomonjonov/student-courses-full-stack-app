import { toast } from "react-toastify";
import http from "../utils/axios-instance";
export const getCourses = async ({ page, size, search="",fields,sort }) => {
  try {
    const res = await http(
    `/courses?page=${page || 1}&size=${size||2}&search=${search||""}&fields=${fields}&sort=${sort}`
  );
  return {
    courses: res.data.data.allCourses.content,
    pages: res.data.data.allCourses.pagination.allPagesCount,
    count: res.data.data.allCourses.pagination.allItemsCount,
  };
  } catch (error) {
    toast.error(error.response.data.message)
  }
  
};
export const deleter = async (id) => {
  try {
      const res = await http.delete(`/courses/${id}`);
  return res.data;
  } catch (error) {
    toast.error(error.response.data.message)
  }

};
export const submit = async ({ data, isUpdate, id, navigate, size }) => {
  try {
    const res = await http({
    url: isUpdate
      ? `https://student-course-t530.onrender.com/api/v1/courses/${id}`
      : "https://student-course-t530.onrender.com/api/v1/courses",
    method: isUpdate ? "PATCH" : "POST",
    data: data,
  });
  navigate(`/courses?page=1&size=${size || 2}`);
  return res.data;
  } catch (error) {
    toast.error(error.response.data.message)
  }
  
};
export const courseById = async ({ id, reset }) => {
  try {
     const res = await http(`/courses/${id}`);
  reset(res.data.data.byId);
  return []; 
  } catch (error) {
    toast.error(error.response.data.message)
  }

};