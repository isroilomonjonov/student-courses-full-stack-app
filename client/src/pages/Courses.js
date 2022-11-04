import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { getCourses, deleter } from "../api/courses-api";
import { BasicTable } from "../components/BasicTable";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/UI/Pagination";
function Courses() {
  const { send, error, loading, data } = useHttp(getCourses);
  const { send: deleteCourse } = useHttp(deleter);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = searchParams.get("page") || 1;
  const size = searchParams.get("size") || 2;
  const search = searchParams.get("search");
  const sort = searchParams.get("sort")||"";
  const fields = searchParams.get("fields")||"name,description,id";
  const colorLink = page;
  const [value, setValue] = useState(null);
  const [name, setName] = useState("-");
  const [description, setDescription] = useState("-");
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`.?page=${page}&size=${size}&fields=${fields||""}&search=${value === null ? "" : value}`);
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [value]);
  useEffect(() => { 
    if(fields?.slice(0,1)===","){
     navigate(`.?fields=${fields.slice(1)}`)
    }
    send({ page, size, search,fields,sort });
  }, [page, size, search,fields,sort]);

  const fieldSetter=(page,size,search,fields,sort,fieldname )=>{
    !fields?.includes(`${fieldname}`)?navigate(`.?page=${page}&size=${size}&search=${search||""}&fields=${fields?fields+`,${fieldname}`:`${fieldname}`}`):navigate(`.?page=${page}&size=${size}&search=${search||""}&sort=${sort}&fields=${fields.replace(`${fieldname}`,"")}`)
  }
 const sortSetter=(set,setter,ordername) => {
   if(set==="-"){
    setter("+")
   }else{
    setter("-")
   }
   navigate(`.?page=${page}&size=${size}&search=${search||""}&fields=${fields||""}&sort=${set==="-"?set:""}${ordername}`)
 }

  const deleteHandler = async (id) => {
    await deleteCourse(id);
    await send({ page: 1, size });
      navigate(`/courses?page=1&size=${size || 2}`);
  };
  const courseCols = [
    {
      Header: "Name",
      accessor: (item) => (
        <Link to={`/students?courseId=${item.id}`}>{item.name}</Link>
      ),
    },
    { Header: "Description", accessor: "description" },
    {
      Header: "Actions",
      accessor: (course) => {
        return (
          <div>
            <Link
              to={`/courses/${course.id}`}
              style={{ width: "50px", height: "50px" }}
            >
              📝
            </Link>
            <button
              style={{ padding: "5px", margin: "2px", fontSize: "20px" }}
              onClick={deleteHandler.bind(null, course.id)}
            >
              🗑
            </button>
          </div>
        );
      },
    },
  ];
  const changeHandler = (e) => {
    setValue(e.target.value);
  };
  return (
    <Layout title="Courses">
      <Link className="btn-link" to="/courses/new">
        Add course
      </Link>
      <input
        type="text"
        value={value}
        placeholder="seach"
        onChange={changeHandler}
      />
<button style={{color: fields?.includes("name")?"red":""}} onClick={()=>fieldSetter(page,size,search,fields,sort,"name")}>Name</button>
<button style={{padding:"5px",color:sort===name||sort===`-${name}`?"red":""}} onClick={()=>sortSetter(name,setName,"name")}>{name==="-"?"desc":"asc"}</button>
<button  style={{color: fields?.includes("description")?"red":""}} onClick={()=>fieldSetter(page,size,search,fields,sort,"description")}>Description</button>
<button style={{padding:"5px",color:sort===name||sort===`-${name}`?"red":""}}  onClick={()=>sortSetter(description,setDescription,"description")}>{description==="-"?"desc":"asc"}</button>
      {loading && "Loading..."}
      {!loading && error && error}
      {data && data.courses ? (
        <BasicTable columns={courseCols} data={data.courses} />
      ) : (
        <p>Malumotlar yoq</p>
      )}
      {data && (
        <Pagination
          page={page}
          size={size}
          data={data}
          colorLink={colorLink}
          path={"courses"}
          fields={fields}
          sort={sort}
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
export default Courses;
