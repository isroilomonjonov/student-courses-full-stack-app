import Layout from "../../components/Layout/Layout";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  createCourseById,
  getAllCourses,
  studentsById,
  submit,
} from "../../api/students-api";
import * as yup from "yup";
const schema = yup.object().shape({
  firstName: yup.string().required("FirstName kriting"),
  lastName: yup.string().required("LastName kriting"),
  birthDay: yup
    .date()
    .required("birtDate kriting")
    .min("1950-01-01", "Date is too early"),
  courseId: yup.string(),
  payment: yup.string(),
  phoneNumber: yup.string(),
});

const AddEditStudents = () => {
  const { send: formSubmit } = useHttp(submit);
  const { send: getCourses, data: allCourses } = useHttp(getAllCourses);
  const { send: createByCourseId } = useHttp(createCourseById);
  const { send: studentById } = useHttp(studentsById);
  let [searchParams] = useSearchParams();
  const query = searchParams.get("courseId");
  const navigate = useNavigate();
  const params = useParams();
  const isUpdate = params.id !== "new";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    getCourses();
    if (isUpdate) {
      (async () => {
        await getCourses();
        await   studentById({ id: params.id, reset });
      })();
    
    }
    if (query) {
      (async () => {
        await getCourses();
        await createByCourseId({ id: query, reset });
      })();
    }
  }, []);

  return (
    <Layout>
      <h1 style={{ textAlign: "center" }}>
        {isUpdate ? "O'quvchi Malumotlarini Yangilash" : "O'quvchi Yaratmoq"}
      </h1>

      <form
        className="form2"
        onSubmit={handleSubmit((data) =>
          formSubmit({ data: data, isUpdate, id: params.id, query, navigate })
        )}
      >
        <label htmlFor="text"></label>
        <input
          className="input"
          id="text"
          type="text"
          placeholder="Ism"
          {...register("firstName")}
        />
        {console.log(errors)}
        {errors.firstName && <p>{errors.firstName.message}</p>}
        <label htmlFor="lastName"></label>
        <input
          className="input"
          id="lastName"
          type="text"
          style={{ marginBottom: 10 }}
          placeholder="Familiya"
          {...register("lastName")}
        />
        {errors.lastName && <p>{errors.lastName.message}</p>}{" "}
        <input
          className="input"
          id="phoneNumber"
          type="text"
          style={{ marginBottom: 10 }}
          placeholder="Telefon Raqam"
          {...register("phoneNumber")}
        />
        {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}{" "}
        <label htmlFor="payment"></label>
        <input
          className="input"
          id="payment"
          type="text"
          style={{ marginBottom: 10 }}
          placeholder="To'lov"
          {...register("payment")}
        />
        {errors.payment && <p>{errors.payment.message}</p>}
        <label htmlFor="birthDay">
          <h3>Tug'ilgan Yili</h3>
        </label>
        <input
          className="input"
          id="birthDay"
          type="date"
          placeholder="Tug'ilgan Yili"
          style={{ margin: 0 }}
          {...register("birthDay")}
        />
        {errors.birthDay && <p>{errors.birthDay.message}</p>}
        <label htmlFor="func" className="form_label">
          <h3>Kursni Tanlang</h3>
        </label>
        <select name="func" {...register(`courseId`)}>
          <option value=""></option>
          {allCourses &&
            allCourses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
        </select>
        {errors.func && <p style={{ color: "red" }}> {errors.func.message}</p>}
        <button className="button-23">
          {" "}
          {isUpdate ? "O'quvchi Malumotlarini Yangilash" : "O'quvchi Yaratmoq"}
        </button>
      </form>
      <button type="primery" className="button-64" onClick={() => navigate(-1)}>
        ◀
      </button>
    </Layout>
  );
};
export default AddEditStudents;
