import Layout from "../../components/Layout/Layout";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { submit, courseById } from "../../api/courses-api";
import useHttp from "../../hooks/use-http";
import { useSearchParams } from "react-router-dom";
import AppContext from "../../context/AppContext";

const AddEditCourse = () => {
  const navigate = useNavigate();
  const params = useParams();
  const ctx=useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const size = searchParams.get("size");
  const isUpdate = params.id !== "new";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { send: getCourseById } = useHttp(courseById);
  const { send: formSubmit } = useHttp(submit);
  useEffect(() => {
    if (isUpdate) {
      getCourseById({ id: params.id, reset });
    }
  }, []);
  return (
    <Layout>
      <h1 style={{textAlign: "center"}}>{isUpdate ? "Kursni Yangilash" : "Kurs Yaratmoq"}</h1>
      <form
        className="form2"
        onSubmit={handleSubmit((data) =>
          formSubmit({ data: data, isUpdate, id: params.id, navigate, size,userId:ctx.user.id })
        )}
      >
        <label htmlFor="text"></label>
        <input
          className="input"
          id="text"
          type="text"
          placeholder="Kurs Nomi"
          {...register("name", {
            required: { value: true, message: "Kurs Nomini Kiriting" },
          })}
        />
        {errors.name && <p style={{fontSize:"1.5rem",color:"red"}}>{errors.name.message}</p>}
        <label htmlFor="description"></label>
        <input
          className="input"
          id="description"
          type="text"
          placeholder="Kurs Tavsifi"
          {...register("description", {
            required: { value: true, message: "Kurs Tavsifini Kiriting" },
          })}
        />
        {errors.description && <p style={{fontSize:"1.5rem",color:"red"}}>{errors.description.message}</p>}
        <button className="button-23">{isUpdate ? "Update" : "Create"}</button>
      </form>
    </Layout>
  );
};

export default AddEditCourse;
