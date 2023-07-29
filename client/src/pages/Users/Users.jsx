import {useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./Users.module.css";
import Input from "../../components/Input/Input";
import SearchIcon from "../../assets/Icons/SearchIcon";
import BasicTable from "../../components/Table/BasicTable";
import { useNavigate, useSearchParams } from "react-router-dom";
import Switch from "../../components/Switch/Switch";
import StudentStatisticsCom from "../../components/UI/StudentStatistics/StudentStatisticsCom";

import useHttp from "../../hooks/use-http";
import Pagination from "../../components/UI/Pagination";
import { changeStatusHandler, getUsers } from "../../api/users-api";
import { phoneNumber } from "../../utils/phoneNumber";

const Users = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const size = searchParams.get("size") || 15;
  const courseId = searchParams.get("courseId");
  const search = searchParams.get("search");

  const [searchVal, setSearchVal] = useState(null);
  const navigate = useNavigate();
  const {
    send: getAllUsers,
    data: value,
  } = useHttp(getUsers);
  const { send: changeStatusUser } = useHttp(changeStatusHandler);
  useEffect(() => {
    getAllUsers({ page, size, search});
  }, [page, size, search, courseId]);
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
    await changeStatusUser({ data: status, id: id });
    getAllUsers({ page, size, search, courseId });
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
      Header: "Login",
      accessor: "username"
    },
    {
      id: "TelefonRaqam",
      Header: "Telefon Raqam",
      accessor: (s)=>{
        return phoneNumber(s.phoneNumber)
      },
    },
    {
      Header: "Email",
      accessor: "email"
    },
    {
      Header: "Role",
      accessor: "role"
    },
    {
      id: "userStatus",
      Header: "Status",
      accessor: (user) => {
        const status = user.isVerified === true ? false : true;
        return (
          <Switch
            onSwitch={() => changeStatusStudent2({ status, id: user.id })}
            enabled={user.isVerified === true}
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
            Barcha Foydalanuvchilar
          </h2>
          <div className={styles.formControl}>
            <Input  onChange={changeHandler} style={{ paddingLeft: "4rem" }} placeholder="Qidiruv" />
            <div className={styles.searchSvg}>
              <SearchIcon classname={styles.searchSvg} />
            </div>
          </div>
        </div>
        <div>
          {value && <BasicTable columns={packageCols} data={value?.users} />}
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
    </Layout>
  );
};

export default Users;
