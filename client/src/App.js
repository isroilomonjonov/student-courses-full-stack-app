import { Navigate, Route, Routes, useNavigate, useSearchParams } from "react-router-dom";
import AddEditCourse from "./pages/AddEditCourse";
import AddEditStudents from "./pages/AddEditStudents";
import AddEditUsers from "./pages/AddEditUser";
import Courses from "./pages/Courses";
import Students from "./pages/Students";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import AppContext from "./context/AppContext";
import Verify from "./pages/Verify";
import Users from "./pages/Users";
function App() {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userL = localStorage.getItem("user");
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    setUser(JSON.parse(userL))
    setIsAuth(token?true:false);
  }, [token, id]);
  return (
    <>
    <AppContext.Provider value={{user,setUser,isAuth,setIsAuth}}>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Auth/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/students" element={<Students />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<AddEditCourse />} />
          <Route path="/students/:id" element={<AddEditStudents />} />
          <Route path="/users/:id" element={<AddEditUsers />} />
          <Route path="/verify/:id" element={<Verify />} />
          {user?.role === "SuperAdmin" && (
            <Route path="/users" element={<Users />} />
          )}
        <Route path="*" element={<Navigate to={"/"} />} />

        </Routes>
      </AppContext.Provider>
    </>
  );
}

export default App;
