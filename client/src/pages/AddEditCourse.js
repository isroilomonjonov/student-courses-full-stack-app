import Layout from "../components/Layout";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { submit, courseById } from "../api/courses-api";
import useHttp from "../hooks/use-http";
import { useSearchParams } from "react-router-dom";

const AddEditCourse = () => {
  const navigate = useNavigate();
  const params = useParams();
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
    <Layout title={isUpdate ? "Update Course" : "Add new course"}>
      <form
        className="form"
        onSubmit={handleSubmit((data) =>
          formSubmit({ data: data, isUpdate, id: params.id, navigate, size })
        )}
      >
        <label htmlFor="text"></label>
        <input
          className="input"
          id="text"
          type="text"
          placeholder="Name"
          {...register("name", {
            required: { value: true, message: "Name kiriting" },
          })}
        />
        {errors.name && <p>{errors.name.message}</p>}
        <label htmlFor="description"></label>
        <input
          className="input"
          id="description"
          type="text"
          placeholder="Description"
          {...register("description", {
            required: { value: true, message: "Description kiriting" },
          })}
        />
        {errors.description && <p>{errors.description.message}</p>}
        <button className="button-23">{isUpdate ? "Update" : "Create"}</button>
      </form>
      <button
         className="button-64"
        onClick={() => navigate(-1)}
      >
        ◀
      </button>
    </Layout>
  );
};

export default AddEditCourse;
