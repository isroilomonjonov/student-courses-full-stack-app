import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Auth = (props) => {
  const navigate = useNavigate();
  const regex1 =/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [a, setA] = useState();
        /* REGISTER FOR EMAIL */
  const registerHandler = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:9090/api/v1/auth/register",
        data
      );
      toast.success(res.data.message)
      setA(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
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
      {a ? (
        <>
        {/* REGISTER FOR EMAIL */}
        <h1 color={{color:"white"}}>{a}</h1>
        <a style={{color: 'white'}} href="https://mail.google.com/">Gmail</a>
        {/* REGISTER BY PHONE NUMBER */}
         {/* <form onSubmit={handleSubmit(loginHandler)}>
          <h1>SMS Habardagi Kodni Kiriting</h1>
          <input type="number"  {...register("id", {
            required: { value: true, message: "Veriicatsiya kodini tekshiring kiriting" },
            maxLength: 4
          })}/>
          <button>Tekshirsh</button>
         </form> */}
        </>
      ) : (
        <form onSubmit={handleSubmit(registerHandler)} className="form">
          <h1 className="welcome">Welcome!</h1>
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
              required: { value: true, message: "PhoneNumber kiriting" },
            //  validate:value=>regex1.match(value) 
            })}
            
          />
          {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
          <button className="btnLogin">Create Accaunt</button>
          <button
            type="button"
            onClick={() => {
              navigate("/login");
            }}
            className="btnLogin"
          >
            I Have Accaunt
          </button>
        </form>
      )} 
    </div>
  );
};

export default Auth;
