import { toast } from "react-toastify";
import axiosInstance from "../utils/axios-instance";

export const getTeachers = async ({ page, size, courseId, search = "" }) => {
    try {
      const path = `?size=${size}&page=${page}${
        search ? `&search=${search}` : ""
      }`;
      const res = await axiosInstance(`/users/teachers${path}`);
      return {
        users: res.data.data.allUsers.content,
        pages: res.data.data.allUsers.pagination.allPagesCount,
        count: res.data.data.allUsers.pagination.allItemsCount,
      };
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };