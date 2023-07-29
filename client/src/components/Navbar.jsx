import { Link } from "react-router-dom";
import logo from "./course-logo.png";
const Navbar = (params) => {
  return (
    <div className="navbar">
      {" "}
      <Link className="links" to="/">
        <img onClick={() => {}} src={logo} alt="logo" />
      </Link>{" "}
      <h1>{params.title}</h1>
    </div>
  );
};
export default Navbar;
