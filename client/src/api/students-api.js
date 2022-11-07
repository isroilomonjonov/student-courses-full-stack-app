import { toast } from "react-toastify";
import http from "../utils/axios-instance";
import axiosInstance from "../utils/axios-instance";
export const getStudents = async ({ page, size, courseId, search = "" }) => {

  try {
     const path = `?size=${size}&page=${page}${search ? `&search=${search}` : ""}${
    courseId ? `&course_id=${courseId}` : ""
  }`;
  const res = await axiosInstance(`students${path}`);
  console.log(res);
  return {
    students: res.data.data.allStudents.content,
    pages: res.data.data.allStudents.pagination.allPagesCount,
    count: res.data.data.allStudents.pagination.allItemsCount,
  };
  } catch (error) {
    toast.error(error.response.data.message)
  }
 
};
export const deleter = async (id) => {
  try {
     const res = await axiosInstance.delete(`/students/${id}`);
  return res.data; 
  } catch (error) {
    toast.error(error.response.data.message)
  }

};
export const submit = async ({ data, isUpdate, id, query, navigate }) => {
  try {
     const res = await axiosInstance({
    url: isUpdate ? `/students/${id}` : "/students",
    method: isUpdate ? "PATCH" : "POST",
    data: data
  });
  navigate("/students?page=1&size=2");
  return res.data;
  } catch (error) {
    toast.error(error.response.data.message)
  }
 
};
export const getAllCourses = async () => {
  try {
      const res = await http( `/courses?page=1&size=200&fields=id,name,description`);
  console.log(res);
  return res.data.data.allCourses.content;
  } catch (error) {
    toast.error(error.response.data.message)
  }

};
export const createCourseById = async ({ id, reset }) => {
  try {
      const res = await axiosInstance(`/courses/${id}`);
  reset({ course_id: res.data.data.byId.id });
  } catch (error) {
    toast.error(error.response.data.message)
  }

};
export const studentsById = async ({ id, reset }) => {
  try {
      const res = await axiosInstance(`/students/${id}`);
  reset(res.data.data.byId);
  return  res.data.data.byId
  } catch (error) {
    toast.error(error.response.data.message)
  }

};