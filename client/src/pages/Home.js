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
  const token = localStorage.getItem("token");
  return (
    isAuth && (
      <div className="links">
        <Navbar title="Home" />
        <h1>Hello {user?.username}</h1>
        <Link className="btn-link" to="/courses">
          Courses
        </Link>
        <Link className="btn-link" to="/students">
          Students
        </Link>
        {user?.role === "SuperAdmin" && (
          <Link className="btn-link" to="/users">
            Users
          </Link>
        )}
        <Link className="btn-link" to={`/users/${user?.id}`}>
          Update Accaunt
        </Link>
        <button onClick={removed}>Log Out</button>
      </div>
    )
  );
};
export default Home;
