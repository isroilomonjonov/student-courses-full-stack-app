import Layout from "../../components/Layout/Layout";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AppContext from "../../context/AppContext";
import { getAllStudents, paymentById, submit } from "../../api/payment-api";
import { getAllCourses } from "../../api/students-api";
const schema = yup.object().shape({
  studentId: yup.string().required("Talabani tanlang!"),
  courseId: yup.string().required("Kursni tanlang!"),
  price: yup.string().required("To'lov narxini kiriting"),
});
const AddEditPayment = () => {
  const { send: formSubmit } = useHttp(submit);
  const { send: getCourses, data: allCourses } = useHttp(getAllCourses);
  const { send: getStudents, data: allStudents } = useHttp(getAllStudents);
  const { send: paymentId } = useHttp(paymentById);
  const navigate = useNavigate();
  const params = useParams();
  const isUpdate = params.id !== "new";
  console.log(params.id);
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
    getStudents();
    if (isUpdate) {
      (async () => {
        await getCourses();
        await getStudents();
        await paymentId({ id: params.id, reset });
      })();
    }
  }, []);
  const ctx = useContext(AppContext);
  return (
    <Layout>
      <h1 style={{ textAlign: "center" }}>
        {isUpdate ? "To'lov Malumotlarini Yangilash" : "To'lov Yaratmoq"}
      </h1>

      <form
        className="form2"
        onSubmit={handleSubmit((data) =>
          formSubmit({
            data: data,
            id: params.id,
            userId:ctx.user.id,
            navigate,
            isUpdate
          })
        )}
      >
        <label htmlFor="payment"></label>
        <input
          className="input"
          id="payment"
          type="text"
          style={{ marginBottom: 10 }}
          placeholder="To'lov narxi"
          {...register("price")}
        />
        {errors.price && <p>{errors.price.message}</p>}
        <label htmlFor="func" className="form_label">
          <h3>Kursni Tanlang</h3>
        </label>
        <select
          className="input"
          style={{ marginTop: 0 }}
          name="func"
          {...register(`courseId`)}
        >
          <option value=""></option>
          {allCourses &&
            allCourses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
        </select>
        {errors.courseId && (
          <p style={{ color: "red", fontSize: "16px" }}>
            {errors.courseId.message}
          </p>
        )}
        <label htmlFor="func" className="form_label" style={{ marginTop: 10 }}>
          <h3>Talabani Tanlang</h3>
        </label>
        <select
          className="input"
          style={{ marginTop: 0 }}
          name="func"
          {...register(`studentId`)}
        >
          <option value=""></option>
          {allStudents &&
            allStudents.map((s) => (
              <option key={s.id} value={s.id}>
                {s.firstName} {s.lastName}
              </option>
            ))}
        </select>
        {errors.studentId && (
          <p style={{ color: "red", fontSize: "16px" }}>
            {errors.studentId.message}
          </p>
        )}

        <button style={{ marginTop: "1rem" }} className="button-23">
          {isUpdate ? "To'lov Malumotlarini Yangilash" : "To'lov Yaratmoq"}
        </button>
      </form>
    </Layout>
  );
};
export default AddEditPayment;
