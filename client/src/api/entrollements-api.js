import { toast } from "react-toastify";
import axiosInstance from "../utils/axios-instance";
export const getStudentsByCourseId = async (courseId) => {
  try {
    const res = await axiosInstance(`entrollement/${courseId}`);
    return {
      students: res.data.data.students,
      course: res.data.data.course,
      teachers:res.data.data.teachers
    };
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const submit = async ({ data, id, close }) => {
  if(data?.length===0){
    return
  }
  

  try {
    const res = await axiosInstance({
      url: "/entrollement",
      method: "POST",
      data: { users: typeof data==="object"?[...data]:[data], courseId: id },
    });
    close();
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const deleteHandlar = async ({ id, courseId,getStudents,getForCourse }) => {
  try {
    const res = await axiosInstance({
      url: `/entrollement/${id}`,
      method: "DELETE",
      data: { courseId },
    });
    getStudents()
    getForCourse()
    return res.data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
};
