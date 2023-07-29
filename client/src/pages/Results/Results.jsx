import React, { useEffect } from "react";
import styles from "./Results.module.css";
import { Link, useParams, useSearchParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import BasicTable from "../../components/Table/BasicTable";
import { getAllResults, getAllResultsByTestId } from "../../api/results-api";
import Layout from "../../components/Layout/Layout";
import Pagination from "../../components/UI/Pagination";
const Results = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const size = searchParams.get("size") || 15;
  const search = searchParams.get("search");

  const { send: getResults, data: value } = useHttp(getAllResults);
  const { send: getResultsByTestId, data: value2 } = useHttp(getAllResultsByTestId);
  useEffect(() => {
    if(params.id){
      getResultsByTestId({id:params.id})
    }else{
      getResults({ page, size, search });
    }
  }, [page, size, search]);
  const packageCols = [
    {
      id: "FIO",
      Header: "FIO",
      accessor: (r) => {
        return (
          <p>
            {r?.user?.firstName} {r?.user?.lastName}
          </p>
        );
      },
    },
    {
      id: "Test",
      Header: "Test nomi",
      accessor: (r) => {
        return <p>{r.test.name}</p>;
      },
    },
    {
      id: "Tog'ri",
      Header: "Tog'ri javoblar",
      accessor: "correctAnswers",
    },
    {
      id: "Notog'ri",
      Header: "Xato javoblar",
      accessor: "wrongAnswers",
    },
    {
      id: "Score",
      Header: "Ball",
      accessor: "score",
    },
  ];
  return (
    <Layout>
      <div className={styles.statistics}>
        <div className={styles.divSearchAndH2}>
          <h2>Natijalar</h2>
        </div>
        <div>
          {(value?.results?.length > 0||value2?.results?.length > 0 )&& (
            <BasicTable columns={packageCols} data={params.id?value2?.results:value?.results} />
          )}
          {(value) && (value.results) && (
            <Pagination
              page={page}
              size={size}
              data={params.id?value2:value}
              colorLink={page}
              path={"results"}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Results;
