import { toast } from "react-toastify";
import http from "../utils/axios-instance";
import axiosInstance from "../utils/axios-instance";
export const getStudents = async ({ page, size, courseId, search = "" }) => {
  try {
    const path = `?size=${size}&page=${page}${
      search ? `&search=${search}` : ""
    }`;
    const res = await axiosInstance(`/users/students${path}`);
    return {
      users: res.data.data.allUsers.content,
      pages: res.data.data.allUsers.pagination.allPagesCount,
      count: res.data.data.allUsers.pagination.allItemsCount,
    };
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const getStudentsForCourse = async ({id,search,role}) => {
  try {
    const res = await axiosInstance(`/users/students/course/${id}${search?`?search=${search}`:''}${role?`?role=${role}`:""}`);
    return {
      students: res.data.data.allStudents
    };
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const getStudentsStatistics = async () => {
  try {
    const res = await axiosInstance(`users/students/statistics`);
    return {
      active: res.data.data.active,
      inActive: res.data.data.inActive,
      all: res.data.data.active + res.data.data.inActive,
    };
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const deleter = async ({id,get}) => {
  try {
    const res = await axiosInstance.delete(`/students/${id}`);
    get()
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
// export const changeStatusHandler = async ({ data, id }) => {
//   try {
//     const res = await axiosInstance({
//       url: `/students/${id}`,
//       method: "PUT",
//       data: { status: data },
//     });
//     return res.data;
//   } catch (error) {
//     toast.error(error.response.data.message);
//   }
// };
export const getAllCourses = async () => {
  try {
    const res = await http(`/courses/all`);
    console.log(res);
    return res.data.data.allCourses;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const createCourseById = async ({ id, reset }) => {
  try {
    const res = await axiosInstance(`/courses/${id}`);
    reset({ course_id: res.data.data.byId.id });
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const studentsById = async ({ id, reset }) => {
  try {
    const res = await axiosInstance(`/students/${id}`);
    reset(res.data.data.byId);
    console.log(res.data.data.byId);
    return res.data.data.byId;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
