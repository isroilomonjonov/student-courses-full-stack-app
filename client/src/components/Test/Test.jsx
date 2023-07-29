import React, { useContext, useEffect } from "react";
import styles from "./Test.module.css";
import { changeStatusHandler, getTests } from "../../api/tests-api";
import useHttp from "../../hooks/use-http";
import BasicTable from "../Table/BasicTable";
import Switch from "../Switch/Switch";
import { Link, useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";
const Test = () => {
  const params = useParams();
  const ctx = useContext(AppContext);
  const { send: getAllTests, data: value } = useHttp(getTests);
  const { send: changeStatus } = useHttp(changeStatusHandler);
  useEffect(() => {
    getAllTests({ id: params.id });
  }, []);
  const changeStatusStudent2 = async ({ status, id }) => {
    await changeStatus({ status, id: id });
    getAllTests({ id: params.id });
  };
  const packageCols = [
    {
      id: "Nomi",
      Header: "Test nomi",
      accessor: "name",
    },
    {
      id: "Amallar",
      Header: "Amallar",
      accessor: (test) => {
        const status = test.status === true ? false : true;
        return (
          <div className="flex">
            {ctx.user.role === "STUDENT" && (
              <button className="appendBTN">
                <Link to={`/tests/${test.id}`}>Ochish</Link>
              </button>
            )}
            {ctx.user.role === "TEACHER" && (
              <button className="appendBTN">
                <Link to={`/tests/${params.id}/uoc/${test.id}`}>
                  O'zgartirish
                </Link>
              </button>
            )}
            {(ctx.user.role === "TEACHER" ||
              ctx.user.role === "ADMIN" ||
              ctx.user.role === "SUPER_ADMIN") && (
              <button className="appendBTN">
                <Link to={`/results/test/${test.id}`}>Natijalar</Link>
              </button>
            )}
            {ctx.user.role === "TEACHER" && (
              <Switch
                onSwitch={() => changeStatusStudent2({ status, id: test.id })}
                enabled={test.status === true}
                style={{}}
              />
            )}
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <div className={styles.statistics}>
        <div className={styles.divSearchAndH2}>
          <h2>Testlar</h2>
        </div>
        <div>
          {value?.tests?.length > 0 && (
            <BasicTable columns={packageCols} data={value?.tests} />
          )}
        </div>
      </div>
      {ctx.user.role === "TEACHER" && (
        <button
          style={{
            padding: "1.5rem",
            backgroundColor: "lightblue",
            border: "none",
            borderRadius: ".5rem",
            color: "white",
            margin: "1rem",
            cursor: "pointer",
          }}
        >
          <Link to={`/tests/${params.id}/uoc/new`}>Test qo'shish</Link>
        </button>
      )}
    </div>
  );
};

export default Test;
