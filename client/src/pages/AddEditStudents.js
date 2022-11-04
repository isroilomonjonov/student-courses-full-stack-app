import Layout from "../components/Layout";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  createCourseById,
  getAllCourses,
  studentsById,
  submit,
} from "../api/students-api";
import * as yup from "yup";
const schema =yup.object().shape({
      firstName: yup.string().required("FirstName kriting"),
      lastName: yup.string().required("LastName kriting"),
      birthDay: yup
        .date()
        .required("birtDate kriting")
        .min("1950-01-01", "Date is too early"),
      course_id: yup.string(),
    })

const AddEditStudents = () => {  
  const { send: formSubmit } = useHttp(submit);
  const { send: getCourses, data: allCourses } = useHttp(getAllCourses);
  const { send: createByCourseId } = useHttp(createCourseById);
  const { send: studentById} = useHttp(studentsById);
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
    studentById({ id: params.id, reset });
    }
    if (query) {
      (async () => {
        await getCourses();
        await createByCourseId({ id: query, reset });
      })();
    }
  }, []);

  return (
    <Layout title={isUpdate ? "Update" : "Add new Student"}>
      <form
        className="form"
        onSubmit={handleSubmit((data) =>
          formSubmit({ data:data, isUpdate, id: params.id, query, navigate })
        )}
      >
            <label htmlFor="text"></label>
            <input
              className="input"
              id="text"
              type="text"
              placeholder="FirstName"
              {...register("firstName")}

            />
            {console.log(errors)}
            {errors.firstName && <p>{errors.firstName.message}</p>}
            <label htmlFor="lastName"></label>
            <input
              className="input"
              id="lastName"
              type="text"
              placeholder="LastName"
              {...register("lastName")}

            />
            {errors.lastName && <p>{errors.lastName.message}</p>}
            <label htmlFor="birthDay"></label>
            <input
              className="input"
              id="birthDay"
              type="date"
              placeholder="birthDay"
              {...register("birthDay")}

            />
            {errors.birthDay && <p>{errors.birthDay.message}</p>}
            <label htmlFor="func" className="form_label">
              Select Course
            </label>
            <select name="func" {...register(`course_id`)}>
              <option value=""></option>
              {allCourses &&
                allCourses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
            </select>
            {errors.func && (
              <p style={{ color: "red" }}> {errors.func.message}</p>
            )}
            <button className="btnLogin">
              {isUpdate ? "Update" : "Create"}
            </button>
      </form>
      <button
      type="primery"
        style={{
          padding: "10px 20px",
          backgroundColor: "blue",
          border: "none",
          color: "white",
        }}
        onClick={() => navigate(-1)}
      >
        ◀
      </button>
    </Layout>
  );
};
export default AddEditStudents;