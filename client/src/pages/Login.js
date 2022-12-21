import React, {useContext} from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import AppContext  from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Login = () => {
  const {setUser,user,setIsAuth}= useContext(AppContext);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const loginHandler = async (data) => {
    try {
      const res = await axios.post(
        "https://student-course-t530.onrender.com/api/v1/auth/login",
        data
      );
      if (!res.data.data.user.isVerified) {
        toast.error("Verificatsiyadan O'ting");
        return
      }
      localStorage.setItem("token", res.data.data.user.token);
      localStorage.setItem("user",JSON.stringify(res.data.data.user));
      setIsAuth(true)
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="loginPage">
      <div>{user}</div>
      <form onSubmit={handleSubmit(loginHandler)} className="form">
        <h1 className="welcome">Welcome!</h1>
        <label htmlFor="text"></label>
        <input
          className="input"
          id="text"
          type="text"
          placeholder="Login"
          {...register("username", {
            required: { value: true, message: "Username kiriting" },
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
            required: { value: true, message: "Password kiriting" },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <button className="button-9">JOIN</button>
        <button
          type="button"
          onClick={() => {
            navigate("/register");
          }}
          className="button-9"
        >
          Create Accaunt
        </button>
      </form>
    </div>
  );
};

export default Login;
