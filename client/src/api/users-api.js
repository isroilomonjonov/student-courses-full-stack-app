import { toast } from "react-toastify";
import axiosInstance from "../utils/axios-instance";
export const getUsers = async ({ page, size, search, active }) => {
  try {
    const path = `?size=${size}&page=${page}${search ? `&search=${search}` : ""}
     `;
    //  ${active && `&isVerified=${active}`}
    const res = await axiosInstance(`users${path}`);
    return {
      users: res.data.data.allUser.content,
      pages: res.data.data.allUser.pagination.allPagesCount,
      count: res.data.data.allUser.pagination.allItemsCount,
    };
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const changeStatusHandler = async ({ data, id }) => {
  try {
    const res = await axiosInstance({
      url: `/users/${id}`,
      method: "PUT",
      data: { isVerified: data },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const deleter = async (id) => {
  try {
    const res = await axiosInstance.delete(`/users/${id}`);
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const submit = async ({
  data,
  isUpdate,
  id,
  navigate,
  creatorId,
  path
}) => {
  try {
    let role=path.includes("students")?"STUDENT":"ADMIN"
    role=path.includes("teachers")?"TEACHER":role
    const res = await axiosInstance({
      url: isUpdate ? `/users/${id}` : "/users",
      method: isUpdate ? "PATCH" : "POST",
      data: { ...data, creatorId: creatorId,role:role },
    });
    navigate(`/${path.split('/')[0]}`);
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const usersById = async ({ id, reset }) => {
  try {
    const res = await axiosInstance(`/users/${id}`);
    reset(res.data.data.byId);
    return [];
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
