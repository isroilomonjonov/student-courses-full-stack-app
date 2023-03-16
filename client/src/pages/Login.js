import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";
import http from "../utils/axios-instance";
const Login = () => {
  const ctx = useContext(AppContext);
  console.log(ctx);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const loginHandler = async (data) => {
    try {
      setLoader(true);
      const res = await http({
        url: "/auth/login",
        data,
        method: "POST",
      });
      localStorage.setItem("token", res.data.data.user.token);
      localStorage.setItem("user", JSON.stringify(res.data.data.user));
      ctx.setAppData({
        user: JSON.parse(localStorage.getItem("user")),
        token: localStorage.getItem("token"),
        isAuth: true,
      });
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="loginPage">
      {/* <div>{user}</div> */}
      <form onSubmit={handleSubmit(loginHandler)} className="form">
        <h1 className="welcome">Welcome!</h1>
        <label htmlFor="text"></label>
        <input
          className="input"
          id="text"
          type="text"
          placeholder="Login"
          {...register("username", {
            required: { value: true, message: "Login kiriting" },
          })}
        />
        {errors.username && (
          <p style={{ fontSize: "1.5rem", color: "red", paddingTop: "5px" }}>
            {errors.username.message}
          </p>
        )}
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
        {errors.password && (
          <p style={{ fontSize: "1.5rem", color: "red", paddingTop: "5px" }}>
            {errors.password.message}
          </p>
        )}
        <button className="button-9">
          {loader && (
            <PulseLoader
              color={"blue"}
              loading={loader}
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}
          {!loader && "Kirish"}
        </button>
        <button
          type="button"
          onClick={() => {
            navigate("/register");
          }}
          className="button-9"
        >
          Ro'yxatdan O'tmoq
        </button>
      </form>
    </div>
  );
};

export default Login;
