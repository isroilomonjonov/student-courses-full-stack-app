import http from "../utils/axios-instance";
import axiosInstance from "../utils/axios-instance";
export const getStudents = async ({ page, size, courseId, search = "" }) => {
  const path = `?size=${size}&page=${page}${search ? `&search=${search}` : ""}${
    courseId ? `&courseId=${courseId}` : ""
  }`;
  const res = await axiosInstance(`students${path}`);
  console.log(res);
  return {
    students: res.data.data.allStudents.content,
    pages: res.data.data.allStudents.pagination.allPagesCount,
    count: res.data.data.allStudents.pagination.allItemsCount,
  };
};
export const deleter = async (id) => {
  const res = await axiosInstance.delete(`/students/${id}`);
  return res.data;
};
export const submit = async ({ data, isUpdate, id, query, navigate }) => {
  console.log(data);
  const res = await axiosInstance({
    url: isUpdate ? `/students/${id}` : "/students",
    method: isUpdate ? "PATCH" : "POST",
    data: data
  });
  navigate("/students?page=1&size=2");
  return res.data;
};
export const getAllCourses = async () => {
  const res = await http( `/courses?page=1&size=200&fields=id,name,description`);
  console.log(res);
  return res.data.data.allCourses.content;
};
export const createCourseById = async ({ id, reset }) => {
  const res = await axiosInstance(`/courses/${id}`);
  reset({ course_id: res.data.data.byId.id });
};
export const studentsById = async ({ id, reset }) => {
  const res = await axiosInstance(`/students/${id}`);
  reset(res.data.data.byId);
  return  res.data.data.byId
};