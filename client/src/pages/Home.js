import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AppContext from "../context/AppContext";

const Home = () => {
  const navigate = useNavigate();
    const {user,setUser,setIsAuth,isAuth} = useContext(AppContext);
  const removed = () => {
    localStorage.clear()
    setUser([]);
    setIsAuth(false);
    navigate("/login");
  };
  return (
    isAuth && (
      <div>
        <Navbar title="Home" />
        <h1>Hello {user?.username}</h1>
        <div className="links">
        <Link className="btn-link" to="/courses">
          Kurslar
        </Link>
        <Link className="btn-link" to="/students">
          Talabalar
        </Link>
        {user?.role === "SuperAdmin" && (
          <Link className="btn-link" to="/users">
            Foydalanuvchilar
          </Link>
        )}
        <Link className="btn-link" to={`/users/${user?.id}`}>
          Foydalanuvchi Malumotlarni Yangilamoq
        </Link>
        <button className="button-70"onClick={removed}>Log Out</button></div>
      </div>
    )
  );
};
export default Home;
