import { useEffect, useState } from "react";
import styles from "./payment.module.css";
import useHttp from "../../hooks/use-http";
import Pagination from "../../components/UI/Pagination";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import BasicTable from "../../components/Table/BasicTable";
import Input from "../../components/Input/Input";
import { getAllPayments } from "./../../api/payment-api";
import { useForm } from "react-hook-form";
import PaymentStatistics from "../../components/UI/PaymentStatistics/PaymentStatistics";

const Payment = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const size = searchParams.get("size") || 15;
  const search = searchParams.get("search");

  const [searchVal, setSearchVal] = useState(null);
  const navigate = useNavigate();
  const { send: getAllPaymentData, data: value } = useHttp(getAllPayments);
  const {
    register,
    handleSubmit,
  } = useForm();
  useEffect(() => {
    getAllPaymentData({ page, size, search });
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

  const packageCols = [
    {
      id: "FIO",
      Header: "FIO",
      accessor: (s) => {
        return (
          <p>
            {s.student.firstName} {s.student.lastName}
          </p>
        );
      },
    },
    {
      id: "TelefonRaqam",
      Header: "Telefon Raqam",
      accessor: "student.phoneNumber",
    },
    {
      id: "KursNomi",
      Header: "Kurs nomi",
      accessor: "course.name",
    },
    {
      Header: "To'lov",
      accessor: (s) => {
        return <p>{s.price?.toLocaleString("Ru-Ru")} sum</p>;
      },
    },
    {
      id: "Amallar",
      Header: "Amallar",
      accessor: (payment) => (
        <div key={payment.id}>
          <Link to={`/payments/${payment.id}`}>📝</Link>
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <PaymentStatistics value={value} />
      <div className={styles.statistics}>
        <div className={styles.divSearchAndH2}>
          <h2>Barcha To'lovlar</h2>
          <form
            className={styles.formControl}
            onSubmit={handleSubmit((data) =>
              getAllPaymentData({
                page,
                size,
                search,
                gte: data.gteCreatedAt,
                lte: data.lteCreatedAt,
              })
            )}
          >
            <label htmlFor="">
              Boshlang'ich sana
              <Input
                type="date"
                register={register.bind(null, "gteCreatedAt")}
              />
            </label>
            <label htmlFor="">
              Tugash sana
              <Input
                type="date"
                register={register.bind(null, "lteCreatedAt")}
              />
            </label>
            <button style={{ marginTop: "2rem" }} className="button-23">
              Qidirish
            </button>
          </form>
        </div>
        <div>
          {value && <BasicTable columns={packageCols} data={value?.payments} />}
          {value && value.payments && (
            <Pagination
              page={page}
              size={size}
              data={value}
              colorLink={page}
              path={"payments"}
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
        <Link to="/payments/new">To'lov qo'shish</Link>
      </button>
    </Layout>
  );
};

export default Payment;
