import { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import styles from "./CoursesStudent.module.css";
import Modal from "react-modal";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getStudentsForCourse } from "../../../api/students-api";
import useHttp from "../../../hooks/use-http";
import StudentStatisticsCom from "../../../components/UI/StudentStatistics/StudentStatisticsCom";
import BasicTable from "../../../components/Table/BasicTable";
import {
  deleteHandlar,
  getStudentsByCourseId,
  submit,
} from "../../../api/entrollements-api";
import { useForm } from "react-hook-form";
import Input from "../../../components/Input/Input";
import SearchIcon from "../../../assets/Icons/SearchIcon";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement();

const CourseStudents = () => {
  const { register, handleSubmit, reset } = useForm();
  const params = useParams();
  const [open, setOpen] = useState();
  const { send: getAllStudentsByCourseId, data: value } = useHttp(
    getStudentsByCourseId
  );
  const { send: formSubmit } = useHttp(submit);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState(null);
  const search = searchParams.get("search");
  const { send: getAllStudentsForCourse, data: data } =
    useHttp(getStudentsForCourse);
  const { send: deleteEntrollement } = useHttp(deleteHandlar);
  useEffect(() => {
    getAllStudentsByCourseId(params.id);
  }, [params.id, open]);
  useEffect(() => {
    getAllStudentsForCourse({ id: params.id, search });
  }, [search]);
  useEffect(() => {
    reset();
    setSearchVal(null);
    getAllStudentsForCourse({ id: params.id, search });
  }, [open]);
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`.?search=${searchVal === null ? "" : searchVal}`);
    }, 0.5);
    return () => {
      clearTimeout(timer);
    };
  }, [searchVal]);
  const changeHandler = (e) => {
    setSearchVal(e.target.value);
  };
  const deleteHand = ({ id, courseId }) => {
    console.log(id, courseId);
    deleteEntrollement({
      id,
      courseId,
      getStudents: () => getAllStudentsByCourseId(params.id),
      getForCourse: () => getAllStudentsForCourse({ id: params.id, search }),
    });
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
      id: "Amallar",
      Header: "Amallar",
      accessor: (student) => (
        <div>
          <button
            onClick={() => deleteHand({ id: student.id, courseId: params.id })}
            style={{
              padding: ".5rem 1rem",
              cursor: "pointer",
              backgroundColor: "red",
              color: "white",
            }}
          >
            Kursdan Chiqarib Tashlash
          </button>
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <StudentStatisticsCom value={value} />
      <div className={styles.statistics}>
        <div className={styles.divSearchAndH2}>
          <h2>{value?.course?.name} kursi talabalari</h2>
        </div>
        <div>
          {console.log(value)}
          {value?.students?.length > 0 && (
            <BasicTable columns={packageCols} data={value?.students} />
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
          cursor: "pointer",
        }}
        onClick={() => setOpen(true)}
      >
        {value?.course?.name} kursiga talaba qo'shish
      </button>
      <Modal
        isOpen={open}
        ariaHideApp={false}
        onRequestClose={() => setOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className={styles.formControl}>
          <Input
            onChange={changeHandler}
            style={{ paddingLeft: "4rem", width: "100%" }}
            placeholder="Qidiruv"
          />
          <div className={styles.searchSvg}>
            <SearchIcon classname={styles.searchSvg} />
          </div>
        </div>
        <form
          className={`${styles.form}`}
          onSubmit={handleSubmit((data) =>
            formSubmit({
              data: data.students,
              id: params.id,
              close: () => setOpen(false),
            })
          )}
        >
          <div className={styles.formDiv}>
            {data?.students?.map((e) => (
              <label key={e.id} className={`${styles.label}`} for={e.id}>
                <input
                  type="checkbox"
                  id={e.id}
                  name="fav_language"
                  value={e.id}
                  {...register(`students`)}
                />
                {e.firstName} {e.lastName} {e.phoneNumber}{" "}
              </label>
            ))}
          </div>

          <button className="button-23">Qoshish</button>
        </form>
      </Modal>
    </Layout>
  );
};

export default CourseStudents;
