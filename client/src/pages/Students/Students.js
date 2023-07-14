import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./Students.module.css";
import Input from "../../components/Input/Input";
import SearchIcon from "../../assets/Icons/SearchIcon";
import BasicTable from "../../components/Table/BasicTable";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Switch from "../../components/Switch/Switch";
import StudentStatisticsCom from "../../components/UI/StudentStatistics/StudentStatisticsCom";
import {
  changeStatusHandler,
  getStudents,
} from "../../api/students-api";
import useHttp from "../../hooks/use-http";
import Pagination from "../../components/UI/Pagination";
const Students = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const size = searchParams.get("size") || 15;
  const search = searchParams.get("search");
  const [searchVal, setSearchVal] = useState(null);
  const navigate = useNavigate();
  const {
    send: getAllStudents,
    data: value,
  } = useHttp(getStudents);
  const { send: changeStatusStudent } = useHttp(changeStatusHandler);
  useEffect(() => {
    getAllStudents({ page, size, search });
  }, [page, size, search]);
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(
        `.?page=${page}&size=${size}&search=${
          searchVal === null ? "" : searchVal
        }`
      );
    }, 0.5);
    return () => {
      clearTimeout(timer);
    };
  }, [searchVal]);
  const changeStatusStudent2 = async ({ status, id }) => {
    await changeStatusStudent({ data: status, id: id });
    getAllStudents({ page, size, search });
  };
  const changeHandler = (e) => {
    setSearchVal(e.target.value);
  };
  const packageCols = [
    {
      id: "FIO",
      Header: "FIO",
      accessor: (s) => {
        return (
          <p>
            {s.firstName} {s.lastName}
          </p>
        );
      },
    },
    {
      id: "TelefonRaqam",
      Header: "Telefon Raqam",
      accessor: "phoneNumber",
    },
    {
      id: "CreatedAt",
      Header: "CreatedAt",
      accessor: (s) => {
        return (
          <p>
            {new Date(s.createdAt).toLocaleString("uz-Uz", {
              hour: "2-digit",
              minute: "2-digit",
              day: "2-digit",
              year: "numeric",
              month: "2-digit",
            })}
          </p>
        );
      },
    },
    {
      id: "Amallar",
      Header: "Amallar",
      accessor: (student) => (
        <div>
          <Link to={`/students/${student.id}`}>📝</Link>
        </div>
      ),
    },
    {
      id: "userStatus",
      Header: "Status",
      accessor: (user) => {
        const status = user.status === true ? false : true;
        return (
          <Switch
            onSwitch={() => changeStatusStudent2({ status, id: user.id })}
            enabled={user.status === true}
            style={{ margin: "0 auto" }}
          />
        );
      },
    },
  ];
  return (
    <Layout>
      <StudentStatisticsCom value={value} />
      <div className={styles.statistics}>
        <div className={styles.divSearchAndH2}>
          <h2>
            Barcha Talabalar
          </h2>
          <div className={styles.formControl}>
            <Input  onChange={changeHandler} style={{ paddingLeft: "4rem" }} placeholder="Qidiruv" />
            <div className={styles.searchSvg}>
              <SearchIcon classname={styles.searchSvg} />
            </div>
          </div>
        </div>
        <div>
          {value && <BasicTable columns={packageCols} data={value?.students} />}
          {value && value.students && (
            <Pagination
              page={page}
              size={size}
              data={value}
              colorLink={page}
              path={"students"}
            />
          )}
        </div>
      </div>
      <button
        style={{
          padding: "1.5rem",
          backgroundColor: "lightblue",
          border: "none",
          borderRadius: ".5rem",
          color: "white",
          margin: "1rem",
        }}
      >
        <Link to="/students/new">O'quvchi qo'shish</Link>
      </button>
    </Layout>
  );
};

export default Students;
