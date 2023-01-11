import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";
import http from "../utils/axios-instance";
import AppContext from "../context/AppContext";

const Auth = (props) => {
  const navigate = useNavigate();
  const ctx= useContext(AppContext);

  const [loader,setLoader] = useState(false)
  const regex1 =/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
        /* REGISTER FOR EMAIL */
  const registerHandler = async (data) => {
    try {
      setLoader(true)
      const res = await http({
        url:"/auth/register",
        data,
        method: "POST"
      });
      localStorage.setItem("token", res.data.data.user.token);
      localStorage.setItem("user",JSON.stringify(res.data.data.user));
      ctx.setAppData({
				user: JSON.parse(localStorage.getItem("user")),
				token: localStorage.getItem("token"),
				isAuth: true,
			});
      navigate("/");

    } catch (error) {
      toast.error(error.response.data.message);
    }
    finally{
      setLoader(true)
    }
  };
  //REGISTER BY PHONE NUMBER
  // const registerHandler = async (data) => {
  //   try {
  //     const res = await axios.post(
  //       "http://localhost:9090/api/v1/auth/registerbyphone",
  //       data
  //     );
  //     toast.success(res.data.message)
  //     setA(res.data.message);
  //   } catch (error) {
  //     toast.error(error.response.data.message);
  //   }
  // };
  // const loginHandler = async (data) => {
  //   try {
  //     const res = await axios(
  //       `http://localhost:9090/api/v1/users/verifyphonenumber/${data.id}`
  //     );
  //     setA(res.data.message)
  //     toast.success(res.data.message);
  //     navigate("/login")
  //   } catch (error) {
  //     toast.error(error.response.data.message);
  //   }
  // };
  return (
    <div className="loginPage">
      {/* {a ? (
        <> */}
        {/* REGISTER FOR EMAIL */}
        {/* <h1 color={{color:"white"}}>{a}</h1>
        <a style={{color: 'white'}} href="https://mail.google.com/">Gmail</a> */}
        {/* REGISTER BY PHONE NUMBER */}
         {/* <form onSubmit={handleSubmit(loginHandler)}>
          <h1>SMS Habardagi Kodni Kiriting</h1>
          <input type="number"  {...register("id", {
            required: { value: true, message: "Veriicatsiya kodini tekshiring kiriting" },
            maxLength: 4
          })}/>
          <button>Tekshirsh</button>
         </form> */}
        {/* </> */}
      {/* ) : ( */}
        <form onSubmit={handleSubmit(registerHandler)} className="form">
          <h1 className="welcome">Welcome!</h1>
          <label for="text"></label>
          <input
            id="text"
            className="input"
            type="text"
            placeholder="Ismingiz"
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
            placeholder="Familiyangiz"
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
            placeholder="Login"
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
            placeholder="Parol"
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
            placeholder="Email"
            {...register("email", {
              required: { value: true, message: "Email kiriting" },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
          <label for="phoneNumber"></label>
          <input
            id="phoneNumber"
            className="input"
            type="string"
            placeholder="Telefon raqamingiz"
            {...register("phoneNumber", {
              required: { value: true, message: "PhoneNumber kiriting" },
            })}
            
          />
          {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
          <button className="button-9">
          {loader&& <PulseLoader
        color={"blue"}
        loading={loader}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />}
           {!loader&&"Create Accaunt"}
            </button>
          <button
          className="button-9"
            type="button"
            onClick={() => {
              navigate("/login");
            }}
          >
            I Have Accaunt
          </button>
        </form>
      {/* )}  */}
    </div>
  );
};

export default Auth;
