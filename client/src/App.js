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
        <Route path="/courses/:id" element={<AddEditCourse />} />
        <Route path="/students/:id" element={<AddEditStudents/>} />

        <Route path="/" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/students" element={<Students />} />
        <Route path="/settings/:id" element={<AddEditUser/>} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </>
  );
}

export default App;
