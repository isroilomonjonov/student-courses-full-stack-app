import { toast } from "react-toastify";
import http from "../utils/axios-instance";


export const getAllCourses = async ({ page, size, search = "", sort }) => {
  try {
    const res = await http(
      `/courses?page=${page || 1}&size=${size || 2}&search=${
        search || ""
      }`
    );
    return({
      courses: res.data.data.allCourses.content,
      pages: res.data.data.allCourses.pagination.allPagesCount,
      count: res.data.data.allCourses.pagination.allItemsCount,
      active:res.data.data.active,
      inActive:res.data.data.inActive,
      allStudentsCount: res.data.data.allStudents
    });
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
};

export const getAllCoursesStatistics = async () => {
  try {
    const res = await http(
      "/courses"
    );
    return({
      active:res.data.data.active,
      inActive:res.data.data.inActive,
      allStudentsCount:res.data.data.inActive+res.data.data.active
    });
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
};
export const deleter = async (id) => {
  try {
      const res = await http.delete(`/courses/${id}`);
  return res.data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message)
  }

};
export const submit = async ({ data, isUpdate, id, navigate, size,userId }) => {
  try {
    const res = await http({
    url: isUpdate
      ? `/courses/${id}`
      : "/courses",
    method: isUpdate ? "PATCH" : "POST",
    data:isUpdate?data: {...data,userId:userId},
  });
  navigate(`/courses`);
  return res.data;
  } catch (error) {
    toast.error(error.response.data.message)
  }
  
};
export const changeStatus = async ({ data, id, navigate }) => {
  try {
    const res = await http({
    url: `/courses/${id}`,
    method: "PUT",
    data: {status:data},
  });
  navigate(`/courses`);
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