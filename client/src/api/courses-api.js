import http from "../utils/axios-instance";
export const getCourses = async ({ page, size, search="",fields,sort }) => {
  const res = await http(
    `/courses?page=${page || 1}&size=${size||2}&search=${search||""}&fields=${fields}&sort=${sort}`
  );
  return {
    courses: res.data.data.allCourses.content,
    pages: res.data.data.allCourses.pagination.allPagesCount,
    count: res.data.data.allCourses.pagination.allItemsCount,
  };
};
export const deleter = async (id) => {
  const res = await http.delete(`/courses/${id}`);
  return res.data;
};
export const submit = async ({ data, isUpdate, id, navigate, size }) => {
  const res = await http({
    url: isUpdate
      ? `http://localhost:9090/api/v1/courses/${id}`
      : "http://localhost:9090/api/v1/courses",
    method: isUpdate ? "PATCH" : "POST",
    data: data,
  });
  navigate(`/courses?page=1&size=${size || 2}`);
  return res.data;
};
export const courseById = async ({ id, reset }) => {
  const res = await http(`/courses/${id}`);
  reset(res.data.data.byId);
  return [];
};