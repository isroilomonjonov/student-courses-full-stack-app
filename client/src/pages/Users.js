import { useEffect } from "react";
import Layout from "../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { getUsers, deleter } from "../api/users-api";
import { BasicTable } from "../components/Table/BasicTable";
import Pagination from "../components/UI/Pagination";
import { useState } from "react";
function Users() {
  const { send: getAllUser, data: getUsersData } = useHttp(getUsers);
  const { send: deleteUser } = useHttp(deleter);
  const [value, setValue] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const search = searchParams.get("search");
  const active = searchParams.get("active") || "";
  const size = searchParams.get("size") || 2;
  const navigate = useNavigate();
  const colorLink = page;
  useEffect(() => {
    getAllUser({ page, size, search, active });
  }, [page, size, search, active]);
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/users?search=${value ? value : ""}&active=${active || ""}`);
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  const changeHandler = (e) => {
    setValue(e.target.value);
  };
  const deleteHandler = async (id) => {
    await deleteUser(id);
    getAllUser({ page: 1, size });
    navigate(`/users?page=1&size=${size || 2}`);
  };
  const usersCols = [
    { Header: "First Name", accessor: "firstName" },
    { Header: "Last Name", accessor: "lastName" },
    { Header: "User Name", accessor: "username" },
    { Header: "Email", accessor: "email" },
    { Header: "Role", accessor: "role" },
    {
      id: "actions",
      Header: "Actions",
      accessor: (User) => (
        <div>
          <button
            style={{ padding: "5px", margin: "2px", fontSize: "20px" }}
            onClick={deleteHandler.bind(null, User.id)}
          >
            🗑
          </button>
        </div>
      ),
    },
  ];

  return (
    <Layout title="Users">
      <input
        type="text"
        value={value}
        placeholder="search"
        onChange={changeHandler}
      />
      <Link
        style={{ color: active !== "true" && active !== "false" ? "red" : "" }}
        className="btn-link"
        to={"/users"}
      >
        All
      </Link>
      <Link
        style={{ color: active === "true" ? "red" : "" }}
        className="btn-link"
        to={"/users?active=true"}
      >
        Active
      </Link>
      <Link
        style={{ color: active === "false" ? "red" : "" }}
        className="btn-link"
        to={"/users?active=false"}
      >
        Not Active
      </Link>
      {getUsersData && getUsersData.users ? (
        <BasicTable columns={usersCols} data={getUsersData.users} />
      ) : (
        <p>Malumotlar yoq</p>
      )}

      {getUsersData && getUsersData.users && (
        <Pagination
          page={page}
          size={size}
          data={getUsersData}
          colorLink={colorLink}
          path={"users"}
        />
      )}

      <br />
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "blue",
          border: "none",
          color: "white",
        }}
        onClick={() => navigate(-1)}
      >
        ◀
      </button>
    </Layout>
  );
}

export default Users;
