import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowForBtn from "../../../assets/Icons/ArrowForBtn";
import styles from "./Navbar.module.css";
import Input from "../../Input/Input";
import SearchIcon from "../../../assets/Icons/SearchIcon";
import Moon from "../../../assets/Icons/Moon";
import Add from "../../../assets/Icons/Add";
import Bell from "../../../assets/Icons/Bell";
import AppContext from "../../../context/AppContext";

function Navbar(props) {
  const [show, setShow] = useState(false);
  const [black, setBlack] = useState(false);
  const [arrowChange, setArrowChange] = useState(true);
  const activeAndNotActiveHandler = () => {
    props.sidebarActiveHandle();
    setArrowChange(!arrowChange);
  };
  const ctx = useContext(AppContext);

  return (
    <div className={styles.navbar}>
      <div
        onClick={activeAndNotActiveHandler}
        className={`${styles.arrowForBtn} ${
          !arrowChange ? styles.arrowRight : ""
        }`}
      >
        <ArrowForBtn />
      </div>
      <h1 className={styles.username}>Salom {ctx.user.firstName} 👋🏼,</h1>
    </div>
  );
}

export default Navbar;
