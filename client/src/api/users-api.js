import { toast } from "react-toastify";
import axiosInstance from "../utils/axios-instance";
export const getUsers = async ({ page, size, search, active }) => {
  try {
     const path = `?size=${size}&page=${page}${search ? `&search=${search}` : ""}${
    active && `&active=${active}`
  }`;
  const res = await axiosInstance(`users${path}`);
  return {
    users: res.data.data.allUser.rows,
    pages: res.data.data.allUser.totalPages,
    count: res.data.data.allUser.count,
  };
  } catch (error) {
    toast.error(error.response.data.message)
  }
 
};
export const deleter = async (id) => {
  try {
      const res = await axiosInstance.delete(`/users/${id}`);
  return res.data;
  } catch (error) {
    toast.error(error.response.data.message)
  }

};
export const updateUser = async ({ data, id, navigate }) => {
  try {
     const res = await axiosInstance.patch(`/users/${id}`, data);
  navigate(`/`);
  return res.data; 
  } catch (error) {
    toast.error(error.response.data.message)
  }

};
export const usersById = async ({ id, reset }) => {
  try {
     const res = await axiosInstance(`/users/${id}`);
  reset(res.data.data.byId);
  return [];
  } catch (error) {
    toast.error(error.response.data.message)
  }
 
};