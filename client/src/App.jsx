import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import AddEditCourse from "./pages/Courses/AddEditCourse";
import AddEditUser from "./pages/Users/AddEditUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Courses from "./pages/Courses/Courses";
import Teachers from "./pages/Teachers/Teachers";
import Students from "./pages/Students/Students";
import { useContext, useEffect } from "react";
import AppContext from "./context/AppContext";
import Users from "./pages/Users/Users";
import Payment from "./pages/Payment/Payment.jsx";
import CourseStudents from "./pages/Courses/courseStudents/CourseStudents";
import AddEditPayment from "./pages/Payment/AddEditPayment";
import Quiz from "./pages/Quiz/Quiz";
import AddEditQuiz from "./pages/Quiz/AddEditQuiz/AddEditQuiz";
import Results from "./pages/Results/Results";
function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const [searchParams] = useSearchParams();
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
        {ctx.isAuth &&
          (ctx.user.role === "ADMIN" || ctx.user.role === "SUPER_ADMIN") && (
            <Route path="/courses/:id" element={<AddEditCourse />} />
          )}
          {ctx.isAuth&& (
            <Route path="/tests/:id" element={<Quiz />} />
          )}
          {ctx.isAuth&& (
            <Route path="/results" element={<Results />} />
          )}
          {ctx.isAuth&& (
            <Route path="/results/test/:id" element={<Results />} />
          )}
          {ctx.isAuth&& (
            <Route path="/tests/:courseId/uoc/:id" element={<AddEditQuiz />} />
          )}


        {ctx.isAuth && (
          <Route path="/courses/:id/students" element={<CourseStudents />} />
        )}
        {ctx.isAuth &&
          (ctx.user.role === "ADMIN" || ctx.user.role === "SUPER_ADMIN") && (
            <Route path="/students/:id" element={<AddEditUser />} />
          )}
        {ctx.isAuth &&
          (ctx.user.role === "ADMIN" || ctx.user.role === "SUPER_ADMIN") && (
            <Route path="/teachers/:id" element={<AddEditUser />} />
          )}
        {ctx.isAuth &&
          (ctx.user.role === "ADMIN" || ctx.user.role === "SUPER_ADMIN") && (
            <Route path="/payments/:id" element={<AddEditPayment />} />
          )}
        {ctx.isAuth && <Route path="/" element={<Dashboard />} />}
        {ctx.isAuth && <Route path="/courses" element={<Courses />} />}
        {ctx.isAuth &&
          (ctx.user.role === "ADMIN" || ctx.user.role === "SUPER_ADMIN") && (
            <Route path="/teachers" element={<Teachers />} />
          )}
        {ctx.isAuth &&
          (ctx.user.role === "ADMIN" || ctx.user.role === "SUPER_ADMIN") && (
            <Route path="/students" element={<Students />} />
          )}
        {ctx.isAuth &&
          (ctx.user.role === "ADMIN" || ctx.user.role === "SUPER_ADMIN") && (
            <Route path="/payments" element={<Payment />} />
          )}
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
