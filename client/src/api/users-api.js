import axiosInstance from "../utils/axios-instance";
export const getUsers = async ({ page, size, search, active }) => {
  const path = `?size=${size}&page=${page}${search ? `&search=${search}` : ""}${
    active && `&active=${active}`
  }`;
  const res = await axiosInstance(`users${path}`);
  return {
    users: res.data.data.allUser.rows,
    pages: res.data.data.allUser.totalPages,
    count: res.data.data.allUser.count,
  };
};
export const deleter = async (id) => {
  const res = await axiosInstance.delete(`/users/${id}`);
  return res.data;
};
export const updateUser = async ({ data, id, navigate }) => {
  const res = await axiosInstance.patch(`/users/${id}`, data);
  navigate(`/`);
  return res.data;
};
export const usersById = async ({ id, reset }) => {
  const res = await axiosInstance(`/users/${id}`);
  reset(res.data.data.byId);
  return [];
};