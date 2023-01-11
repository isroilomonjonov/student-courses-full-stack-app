import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { getCourses, deleter } from "../api/courses-api";
import  BasicTable  from "../components//Table/BasicTable";
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
      Header: "Nomi",
      accessor: (item) => (
        <Link to={`/students?course_id=${item.id}`}>{item.name}</Link>
      ),
    },
    { Header: "Tavsifi", accessor: "description" },
    {
      Header: "Amallar",
      accessor: (course) => {
        return (
          <div>
            <button  
              style={{ padding: "5px", margin: "2px", fontSize: "20px" }}
            
            >
               <Link
              to={`/courses/${course.id}`}
              style={{ width: "50px", height: "50px" }}
            >
              O'zgartirish
            </Link>
            </button>
           
            <button
              style={{ padding: "5px", margin: "2px", fontSize: "20px" }}
              onClick={deleteHandler.bind(null, course.id)}
            >
              O'chirish
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
    <Layout title="Courses">  <input
    className="search"
        type="text"
        value={value}
        placeholder="seach"
        onChange={changeHandler}
      />
      <br/>
      <Link className="btn-link" to="/courses/new">
       Kurs Yaratmoq
      </Link>
    
      <br/>
<button className="button-23"style={{color: fields?.includes("name")?"red":""}} onClick={()=>fieldSetter(page,size,search,fields,sort,"name")}>Nomi</button>
<button className="button-23" style={{color:sort===name||sort===`-${name}`?"red":""}} onClick={()=>sortSetter(name,setName,"name")}>{name==="-"?"desc":"asc"}</button>
<button className="button-23" style={{color: fields?.includes("description")?"red":""}} onClick={()=>fieldSetter(page,size,search,fields,sort,"description")}>Tavsif</button>
<button className="button-23" style={{color:sort===name||sort===`-${name}`?"red":""}}  onClick={()=>sortSetter(description,setDescription,"description")}>{description==="-"?"desc":"asc"}</button>
      {loading && "Loading..."}
      {!loading && error && error}
      {data && data.courses ? (
        <BasicTable columns={courseCols} data={data.courses} />
      ) : (
        <p>Malumotlar yoq</p>
      )}
      {data &&data.courses&& (
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
       className="button-64"
        onClick={() => navigate(-1)}
      >
        ◀
      </button>
    </Layout>
  );
}
export default Courses;
