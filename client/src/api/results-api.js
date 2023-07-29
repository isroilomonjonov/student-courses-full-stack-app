import { toast } from "react-toastify";
import axiosInstance from "../utils/axios-instance";

export const getAllResults = async ({ page, size, search = "" }) => {
  try {
    const path = `?size=${size}&page=${page}${
      search ? `&search=${search}` : ""
    }`;
    const res = await axiosInstance(`/results${path}`);
    return {
      results: res.data.data.allResults.content,
      pages: res.data.data.allResults.pagination.allPagesCount,
      count: res.data.data.allResults.pagination.allItemsCount,
    };
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const getAllResultsByTestId=async ({id})=>{
  try {
    const res = await axiosInstance(`/results/${id}`);
    console.log(res);
    return {
      results: res.data.data.allResults
    };
  } catch (error) {
    toast.error(error.response.data.message);
  }
}
export const submitResult = async ({ data, testId,userId, close }) => {
  try {
    const res = await axiosInstance({
      url: "/results",
      method: "POST",
      data: {...data,testId,userId},
    });
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
