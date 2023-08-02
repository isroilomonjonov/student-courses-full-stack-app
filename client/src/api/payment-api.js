import { toast } from "react-toastify";
import axiosInstance from "../utils/axios-instance";
export const getAllPayments = async ({ size, page, search, gte, lte,paymentDate }) => {
  try {
    const path = `?size=${size}&page=${page}&port=${paymentDate}${
      search ? `&search=${search}` : ""
    }${gte ? `&createdAt[gte]=${gte}` : ""}${
      lte ? `&createdAt[lte]=${lte}` : ""
    }`;
    const res = await axiosInstance(`payments${path}`);
    return {
      payments: res.data.data.allPayments.content,
      pages: res.data.data.allPayments.pagination.allPagesCount,
      count: res.data.data.allPayments.pagination.allItemsCount,
      price: res.data.data.price,
      allPrice: res.data.data.allPrice,
      priceNow: res.data.data.accNow,
      nonPaymentUser:res.data.data.nonPayment.rows
    };
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const getAllStudents = async () => {
  try {
    const res = await axiosInstance(`/users/all`);
    return res.data.data.allStudents;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const paymentById = async ({ id, reset }) => {
  try {
    const res = await axiosInstance(`/payments/${id}`);
    reset(res.data.data.byId);
    return res.data.data.byId;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const submit = async ({ data, id, navigate, isUpdate, userId }) => {
  try {
    const res = await axiosInstance({
      url: isUpdate ? `/payments/${id}` : "/payments",
      method: isUpdate ? "PATCH" : "POST",
      data: { ...data, creatorId: userId },
    });
    navigate("/payments");
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const deleteHandlar = async ({
  id,
  courseId,
  getStudents,
  getForCourse,
}) => {
  try {
    const res = await axiosInstance({
      url: `/entrollement/${id}`,
      method: "DELETE",
      data: { courseId },
    });
    getStudents();
    getForCourse();
    return res.data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
};
