import Layout from "../../components/Layout/Layout";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { submit, usersById } from "../../api/users-api";
import AppContext from "../../context/AppContext";

const AddEditCourse = () => {
  const params = useParams();
  const path=window.location.pathname
  const navigate = useNavigate();
  const isUpdate = params.id !== "new";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { send: getUserById } = useHttp(usersById);
  const { send: formSubmit } = useHttp(submit);
  useEffect(() => {
    if (isUpdate) {
      getUserById({ id: params.id, reset });
    }
  }, [path]);
  const ctx=useContext(AppContext);

  return (
    <Layout>
      <h1 style={{ textAlign: "center" }}>
       {isUpdate? "Foydalanuvchi Malumotlarini Yangilash":"Foydalanuvchi qo'shish"}
      </h1>

      <form
        onSubmit={handleSubmit((data) =>
          formSubmit({ data, id: params.id, navigate,isUpdate,creatorId:ctx.user.id,path })
        )}
        className="form2"
      >
        <label htmlFor="text"></label>
        <input
          id="text"
          className="input"
          type="text"
          placeholder="Ismi"
          {...register("firstName", {
            required: { value: true, message: "Ismingizni kiriting" },
          })}
        />
        {errors.firstName && <p>{errors.firstName.message}</p>}
        <label htmlFor="text"></label>
        <input
          id="text"
          className="input"
          type="text"
          placeholder="Familiya"
          {...register("lastName", {
            required: { value: true, message: "Familiyangizni kiriting" },
          })}
        />
        {errors.lastName && <p>{errors.lastName.message}</p>}
        <label htmlFor="text"></label>
        <input
          id="text"
          className="input"
          type="text"
          placeholder="Login"
          {...register("username", {
            required: { value: true, message: "Login kiriting" },
            validate: (value) =>
              value === value.toLowerCase() ||
              "Faqat Kichik Harf Kiritish Mumkin",
          })}
        />
        {errors.username && <p>{errors.username.message}</p>}
        <label htmlFor="password"></label>
        <input
          id="password"
          className="input"
          type="password"
          placeholder="Parol"
          {...register("password", {
            required: { value: true, message: "Parol kiriting" },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <label htmlFor="email"></label>
        <input
          id="email"
          className="input"
          type="email"
          placeholder="email"
          {...register("email", {
            required: { value: true, message: "Email kiriting" },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <label htmlFor="phoneNumber"></label>
        <input
          id="phoneNumber"
          className="input"
          type="number"
          placeholder="Telefon raqam"
          {...register("phoneNumber", {
            required: { value: true, message: "Telefon raqam kiriting" },
          })}
        />
        {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}

        <button className="button-23">{isUpdate?"Yangilash":"Yaratish"}</button>
      </form>
    </Layout>
  );
};

export default AddEditCourse;
