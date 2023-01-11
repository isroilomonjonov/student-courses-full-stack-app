import React, { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";
import styles from "./Layout.module.css";   
function Layout(props) {
  const [arrowChange, setArrowChange] = useState(true);

  const sidebarActiveHandle = () => {
    setArrowChange(!arrowChange);
  };
  return (
    <div className={styles.layout}>
      <Sidebar
        sidebarActiveHandle={sidebarActiveHandle}
        hasActive={arrowChange}
      />
      <div
        className={`${styles.container} ${
          !arrowChange ? styles.containerFull : ""
        } ${!arrowChange ? styles.hiddenContainer : styles.containerTablet}`}
      >
        <Navbar
        info={props.info}
          sidebarActiveHandle={sidebarActiveHandle}
          setSearch={props.setSearch}
        />
        <div className={styles.layoutBox}>
          <div className={styles.pathRoad}>
            <h1 className={`h2 ${styles.pageName}`}>{props.pageName}</h1>
          </div>
          <div className={styles.contents}>{props.children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
