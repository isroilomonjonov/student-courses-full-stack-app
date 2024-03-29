import { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./Courses.module.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Input from "../../components/Input/Input";
import Pagination from "../../components/UI/Pagination";
import SearchIcon from "../../assets/Icons/SearchIcon";
import StudentStatisticsCom from "../../components/UI/StudentStatistics/StudentStatisticsCom";
import useHttp from "../../hooks/use-http";
import { changeStatus, getAllCourses } from "../../api/courses-api";
import AppContext from "../../context/AppContext";
const Courses = () => {
  const [searchParams] = useSearchParams();
  const ctx=useContext(AppContext);
  const { send: getCourses, data: value } = useHttp(getAllCourses);
  const { send: changeStatusOff } = useHttp(changeStatus);
  const page = searchParams.get("page") || 1;
  const size = searchParams.get("size") || 6;
  const search = searchParams.get("search");
  const sort = searchParams.get("sort") || "";
  const [searchVal, setSearchVal] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    getCourses({ page, size, search, sort });
  }, [page, size, search, sort]);
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
  const changeHandler = (e) => {
    setSearchVal(e.target.value);
  };
  {console.log(value)}
  return (
    <Layout>
      {(ctx.user.role!=="STUDENT"&&ctx.user.role!=="TEACHER")&&<StudentStatisticsCom />}
      <div className={styles.statistics}>
        <div className={styles.divH3AndH2}>
          <h2>Kurslar</h2>
          <h3>
            {new Date().toLocaleString("en-en", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h3>
        </div>
        <div className={styles.flex}>
          <div className={styles.flex2}>
            <div className={styles.flexcolumn}>
              <h1 style={{ fontSize: "2.8rem", fontWeight: "500" }}>
                {value?.active || 0}
              </h1>
              <p className={styles.p}>Faol Kurslar</p>
            </div>
            <div className={styles.flexcolumn}>
              <h1 style={{ fontSize: "2.8rem", fontWeight: "500" }}>
                {value?.inActive || 0}
              </h1>
              <p className={styles.p}>Tugatilgan Kurslar</p>
            </div>
            <div className={styles.flexcolumn}>
              <h1 style={{ fontSize: "2.8rem", fontWeight: "500" }}>
                {value?.active + value?.inActive || 0}
              </h1>
              <p className={styles.p}>Umumiy Kurslar</p>
            </div>
          </div>
          <div className={styles.formControl}>
            <Input
              onChange={changeHandler}
              style={{ paddingLeft: "4rem" }}
              placeholder="Qidiruv"
            />
            <div className={styles.searchSvg}>
              <SearchIcon classname={styles.searchSvg} />
            </div>
          </div>
        </div>
        <div className={styles.courses}>
          {value?.courses?.map((course) => (
            <Link
              to={`/courses/${course.id}/students`}
              key={course.id}
              className={`${styles.group} ${
                !course.status ? `${styles.groupInActive}` : ""
              }`}
            >
              <div>
                <p className={styles.p}>
                  {new Date(course.createdAt).toLocaleDateString("ru-Ru")}
                </p>
                <p className={styles.p}>
                  {!course.status ? "Kurs Aktiv Emas" : ""}
                </p>
                <h1>{course.name}</h1>
              </div>

              {/* <p className={styles.p}>
                  O'quvchilar soni: {course.Enrollments.length}
                </p>
                <input
                  type="range"
                  defaultValue={
                    (course.Enrollments.length / value?.allStudentsCount) * 100
                  }
                  min="0"
                  disabled="true"
                  max="100"
                /> */}
              <div>
                <button disabled={!course.status} className="appendBTN">
                  <Link
                    to={`/courses/${course.id}`}
                    
                  >
                    O'zgartirish
                  </Link>
                </button>
                <button
                  disabled={!course.status}
                  className="deleteBTN"
                  onClick={() =>
                    changeStatusOff({
                      data: false,
                      id: course.id,
                      navigate: navigate,
                    })
                  }
                >
                  Kursni Yakunlash
                </button>
              </div>
              {/* <p className={styles.p} style={{ color: "black" }}>
                  Kurs Egasi:{" "}
                  <b>
                    {course?.user?.firstName} {course?.user?.lastName}
                  </b>
                </p> */}
            </Link>
          ))}
        </div>
        {value && value.courses && (
          <Pagination
            page={page}
            size={size}
            data={value}
            colorLink={page}
            path={"courses"}
            sort={sort}
          />
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
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to="/courses/new"
        >
          Kurs qo'shish
        </Link>
      </button>
    </Layout>
  );
};

export default Courses;
