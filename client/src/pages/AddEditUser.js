import Layout from "../components/Layout";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { updateUser, usersById } from "../api/users-api";

const AddEditCourse = () => {
  const params = useParams();
  const regex=/(?:\+\([9]{2}[8]\)[0-9]{2}\ [0-9]{3}\-[0-9]{2}\-[0-9]{2})/g;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { send: getUserById } = useHttp(usersById);
  const { send: formSubmit } = useHttp(updateUser);
  useEffect(() => {
    getUserById({ id: params.id, reset });
  }, []);

  return (
    <Layout title={"Update User"}>
      <form
        onSubmit={handleSubmit((data) =>
          formSubmit({ data, id: params.id, navigate })
        )}
        className="form"
      >
        <label for="text"></label>
        <input
          id="text"
          className="input"
          type="text"
          placeholder="firstName"
          {...register("firstName", {
            required: { value: true, message: "FirstName kiriting" },
          })}
        />
        {errors.firstName && <p>{errors.firstName.message}</p>}
        <label for="text"></label>
        <input
          id="text"
          className="input"
          type="text"
          placeholder="lastName"
          {...register("lastName", {
            required: { value: true, message: "LastName kiriting" },
          })}
        />
        {errors.lastName && <p>{errors.lastName.message}</p>}
        <label for="text"></label>
        <input
          id="text"
          className="input"
          type="text"
          placeholder="username"
          {...register("username", {
            required: { value: true, message: "Username kiriting" },
            validate:value=>value===value.toLowerCase()||"Faqat Kichik Harf Kiritish Mumkin"
          })}
        />
        {errors.username && <p>{errors.username.message}</p>}
        <label for="password"></label>
        <input
          id="password"
          className="input"
          type="password"
          placeholder="password"
          {...register("password", {
            required: { value: true, message: "Password kiriting" },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <label for="email"></label>
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
        <label for="phoneNumber"></label>
        <input
          id="phoneNumber"
          className="input"
          type="number"
          placeholder="PhoneNumber"
          {...register("phoneNumber", {
            required: { value: true, message: "PhoneNumber kiriting" }
          })}
        />
        {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}

        <button className="btnLogin">Update Accaunt</button>
      </form>
      <button
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

export default AddEditCourse;
