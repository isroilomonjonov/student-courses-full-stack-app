import { useEffect } from "react";
import Layout from "../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { getStudents, deleter } from "../api/students-api";
import { BasicTable } from "../components/Table/BasicTable";
import Pagination from "../components/UI/Pagination";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
function Students() {
  const {
    send: getAllStudent,
    error: getStudentsError,
    loading: getStudentsLodaing,
    data: getStudentsData,
  } = useHttp(getStudents);
  const { send: deleteStudent } = useHttp(deleter);

  const [searchParams, setSearchParams] = useSearchParams();
  const courseId = searchParams.get("course_id");
  const page = searchParams.get("page") || 1;
  const size = searchParams.get("size") || 2;
  const search = searchParams.get("search");
  const navigate = useNavigate();
  const colorLink = page;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [value, setValue] = useState(null);
  useEffect(() => {
    getAllStudent({ page, size, courseId, search });
  }, [page, size, search, courseId]);
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(
        `.?search=${value === null ? "" : value}${
          courseId ? `&course_id=${courseId}` : ""
        }`
      );
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [value]);
  const deleteHandler = async (id) => {
    await deleteStudent(id);
    getAllStudent({ page: 1, size });
    navigate(`/students?page=1&size=${size || 2}`);
  };
  const studentsCols = [
    // {
    //   id: "avatar",
    //   Header: "AVATAR",
    //   accessor: (student) => (
    //     <div>
    //     { 
    // (async()=>{
    //   const res=await axios(`http://localhost:9090/api/v1/attachment/${student.avatar_id}`);
    //   console.log(res);
    //    setImg(res.data.data.byId)
    //   })()
    //   }
    //      <img src={`http://localhost:9090/uploads/${img?.filename}`} alt="img" />
    //              </div>
    //   ),
    // },
    { Header: "Ismi", accessor: "firstName" },
    { Header: "Familiyasi", accessor: "lastName" },
    { Header: "Tug'ilgan vaqti", accessor: "birthDay" },
    {
      id: "Amallar",
      Header: "Amallar",
      accessor: (student) => (
        <div>
          <Link to={`/students/${student.id}`}>📝</Link>
          <button
            style={{ padding: "5px", margin: "2px", fontSize: "20px" }}
            onClick={deleteHandler.bind(null, student.id)}
          >
            🗑
          </button>
        </div>
      ),
    },
  ];
  const changeHandler = (e) => {
    setValue(e.target.value);
  };
  return (
    <Layout title="Students">  <input
    className="search"

        type="text"
        value={value}
        placeholder="seach"
        onChange={changeHandler}
      />
      <br/>
      {!courseId && (
        <Link className="btn-link" to="/students/new">
        Talaba Yaratmoq
        </Link>
      )}
      {/* <form style={{margin: "20px"}} onSubmit={handleSubmit((data) =>navigate(`/students?search=${data.search}`))} >
        <input  type="text"  {...register("search", {
            required: { value: true},
          })}/>
          <button>Search</button>
        </form>   */}
    
      {courseId && (
        <Link className="btn-link" to={`/students/new?courseId=${courseId}`}>
         Kusr nomi bo'yicha Talaba qo'shish
        </Link>
      )}
      {getStudentsLodaing && "Loading"}
      {!getStudentsLodaing && getStudentsError && getStudentsError}

      {getStudentsData ? (
        <BasicTable columns={studentsCols} data={getStudentsData.students} />
      ) : (
        <p>Malumotlar yoq</p>
      )}

      {getStudentsData && (
        <Pagination
          page={page}
          size={size}
          data={getStudentsData}
          colorLink={colorLink}
          path={"students"}
          courseId={courseId}
        />
      )}

      <br />
      <button
          className="button-64"
        onClick={() => navigate(-1)}
      >
        ◀
      </button>
    </Layout>
  );
}

export default Students;
