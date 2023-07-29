import { toast } from "react-toastify";
import axiosInstance from "../utils/axios-instance";

export const getTests= async ({id}) => {
  console.log(id);
    try {

      const res = await axiosInstance(`/tests?courseId=${id}`);
      return {
        tests: res.data.data.allTests,
      };
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  export const changeStatusHandler = async ({ status, id }) => {
    try {
      const res = await axiosInstance({
        url: `/tests/${id}`,
        method: "PUT",
        data: { status },
      });
      console.log(res);
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  export const testById = async ({ id ,reset}) => {
    try {
      const res = await axiosInstance(`/tests/${id}`);
      console.log(res?.data?.data?.byId[0]);
      reset&&reset(res.data?.data?.byId[0])
      return res?.data?.data?.byId;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  export const submit = async ({ data, id, navigate, isUpdate, courseId }) => {
    console.log(courseId);
    try {
      const res = await axiosInstance({
        url: isUpdate ? `/tests/${id}` : "/tests",
        method: isUpdate ? "PATCH" : "POST",
        data:{...data,courseId:courseId},
      });
      console.log(res);
      navigate("/courses");
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };