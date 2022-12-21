import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Verify = () => {
  const params = useParams();
  const [a, setA] = useState();
  const verify = async () => {
    try {
      const res = await axios(
        `https://student-course-t530.onrender.com/api/v1/users/verify/${params.id}`
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    if (params.id) {
      verify();
    }
  }, []);
  return (
    <>
      <h1>Hello</h1>
      <h1>{a}</h1>
      <Link
        className="btn-link"
        style={{ marginLeft: "100px", color: "red" }}
        to="/login"
      >
        Login
      </Link>
      <Link className="btn-link" style={{ color: "red" }} to="/register">
        Register
      </Link>
    </>
  );
};

export default Verify;
