import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import AddEditCourse from "./pages/Courses/AddEditCourse";
import AddEditStudents from "./pages/Students/AddEditStudents";
import AddEditUser from "./pages/Users/AddEditUser";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Courses from "./pages/Courses/Courses";
import Students from "./pages/Students/Students";
import { useContext, useEffect, useState } from "react";
import AppContext from "./context/AppContext";
import Users from "./pages/Users/Users";
import Payment from "./pages/Payment/Payment.jsx";
import CourseStudents from "./pages/Courses/courseStudents/CourseStudents";
import AddEditPayment from "./pages/Payment/AddEditPayment";
function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const ctx = useContext(AppContext);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    ctx.setAppData({
      user: JSON.parse(user),
      token,
      isAuth: token?.trim().length > 0,
    });
  }, [token]);
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/register" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        {ctx.isAuth && (
          <Route path="/courses/:id" element={<AddEditCourse />} />
        )}
        {ctx.isAuth && (
          <Route path="/courses/:id/students" element={<CourseStudents />} />
        )}
        {ctx.isAuth && (
          <Route path="/students/:id" element={<AddEditStudents />} />
        )}
        {ctx.isAuth && (
          <Route path="/payments/:id" element={<AddEditPayment />} />
        )}
        {ctx.isAuth && <Route path="/" element={<Dashboard />} />}
        {ctx.isAuth && <Route path="/courses" element={<Courses />} />}
        {ctx.isAuth && <Route path="/students" element={<Students />} />}
        {ctx.isAuth && <Route path="/payments" element={<Payment />} />}
        {ctx.isAuth & (ctx?.user?.role === "SUPER_ADMIN") && (
          <Route path="/users" element={<Users />} />
        )}
        {ctx.isAuth && <Route path="/settings/:id" element={<AddEditUser />} />}
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </>
  );
}

export default App;
