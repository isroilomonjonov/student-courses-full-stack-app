import Navbar from "./Navbar";

const Layout = (params) => {
  return (
    <>
      <Navbar title={params.title} />
      {params.children}
    </>
  );
};

export default Layout;
