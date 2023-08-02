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
import { phoneNumber } from "../../utils/phoneNumber";

const Payment = () => {
  const [paymentDate, setPaymentDate] = useState("all");
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const size = searchParams.get("size") || 15;
  const search = searchParams.get("search");

  const [searchVal, setSearchVal] = useState(null);
  const navigate = useNavigate();
  const { send: getAllPaymentData, data: value } = useHttp(getAllPayments);
  const { register, handleSubmit } = useForm();
  useEffect(() => {
    getAllPaymentData({ page, size, search, paymentDate });
  }, [page, size, search, paymentDate]);
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
          <>
          {paymentDate!=="monthNon"?  <p>
              {s.user.firstName} {s.user.lastName}
            </p>:<p>{s.firstName} {s.lastName}</p>}
          </>
        );
      },
    },
    {
      id: "TelefonRaqam",
      Header: "Telefon Raqam",
      accessor: (s) => {
        return <>
        {paymentDate!=="monthNon"? phoneNumber(s.user.phoneNumber):phoneNumber(s.phoneNumber)}
        </>
      },
    },
    ...(paymentDate !== "monthNon"
      ? [
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
            id: "CreatedAt",
            Header: "Yaratilgan vaqti",
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
            accessor: (payment) => (
              <div key={payment.id}>
                <Link to={`/payments/${payment.id}`}>📝</Link>
              </div>
            ),
          },
        ]
      : []),
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
        <div className={`${styles.div}`}>
          <p className={`${styles.containerP}`}>
            <span
              onClick={() => setPaymentDate("all")}
              className={`${styles.span} ${
                paymentDate === "all" ? styles.spanActive : ""
              }`}
            >
              Barcha ma'lumotlar
            </span>
            {"  "}

            <span
              onClick={() => setPaymentDate("month")}
              className={`${styles.span} ${
                paymentDate === "month" ? styles.spanActive : ""
              }`}
            >
              Bu oy ma'lumotlari
            </span>
            {"  "}
            <span
              onClick={() => setPaymentDate("monthNon")}
              className={`${styles.span} ${
                paymentDate === "monthNon" ? styles.spanActive : ""
              }`}
            >
              Bu oy to'lamaganlar
            </span>
          </p>
        </div>
        {paymentDate !== "monthNon" ? (
          <div>
            {value && (
              <BasicTable columns={packageCols} data={value?.payments} />
            )}
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
        ) : (
          <>
            {console.log(value.nonPaymentUser)}
            {value && (
              <BasicTable columns={packageCols} data={value?.nonPaymentUser} />
            )}
          </>
        )}
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
