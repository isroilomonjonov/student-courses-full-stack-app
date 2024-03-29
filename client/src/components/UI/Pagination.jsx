import { Link, useNavigate } from "react-router-dom";

const Pagination = ({ page, size, data, colorLink, path, courseId ,fields,search,sort}) => {

  const navigate = useNavigate();
  const fn = (page) => {
    let links = [];
    for (let index = 0; index < page; index++) {
      links.push(
        <Link
          key={index+1}
          className="btn-link"
          style={{
            color: +colorLink === index + 1 ? "red" : "",
            pointerEvents: +colorLink === index + 1 ? "none" : "",
          }}
          to={`.?size=${size || 2}&page=${index + 1}${
            courseId ? (courseId = `&${courseId}`) : ""
          }&fields=${fields||""}&search=${search||""}`}
        >
          {index + 1}
        </Link>
      );
    }
    return links;
  };
  return (
    <>
     
      {data[path]?.length > 0 && [
        <button
        key={data[path]}
        className="button-23"
          disabled={+page === 1 ? true : false}
          onClick={() =>
            navigate(
              `.?size=${size}&page=${Math.abs(page - 1)}&${
                courseId ? `courseId=${courseId}` : ""
              }&fields=${fields||""}&search=${search||""}&sort=${sort||""}`
            )
          }
        >
          Prev
        </button>,
        fn(data.pages),
        <button
        className="button-23"
          disabled={+page === +data.pages ? true : false}
          onClick={() =>
            navigate(
              `.?size=${size}&page=${+page + 1}&${
                courseId ? `courseId=${courseId}` : ""
              }&fields=${fields||""}&search=${search||""}&sort=${sort||""}`
            )
          }
        >
          Next
        </button>,
      ]}
    </>
  );
};

export default Pagination;
