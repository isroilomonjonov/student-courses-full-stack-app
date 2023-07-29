import AppContext from "../../../context/AppContext";
import React, { useContext, useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

//icons
import Key from "../../../assets/Icons/Key";
import Square from "../../../assets/Icons/Square";
import User from "../../../assets/Icons/User";
import Money from "../../../assets/Icons/Money";
import Settings from "../../../assets/Icons/Settings";
import Message from "../../../assets/Icons/Message";
import Dashboard from "../../../assets/Icons/Dashboard";
import UserImage from "../user.png";

function Sidebar(props) {
  const open = props.hasActive;
  const [dateState, setDateState] = useState(new Date());
  const location = useLocation();
  const url = location.pathname;
  const ctx = useContext(AppContext);
  const navigate = useNavigate();
  setInterval(() => setDateState(new Date()), 60);

  const logoutHandle = () => {
    localStorage.clear();
    ctx.onReset();
    navigate("/");
  };
  return (
    <>
      <div className={`${styles.sidebar} ${!open ? styles.exit : ""}`}>
        <div className={styles.headerLink}>
          <Link to={"/"} className={styles.headerA}>
            <Dashboard />{" "}
            <h1 className={`h1 ${styles.sidebarTitle}`}>
              {open ? "Dashboard" : ""}
            </h1>
          </Link>
        </div>

        <div className={`${styles.mainMenu} ${styles.linksContainer}`}>
          <Link
            to={"/"}
            className={`${styles.sidebarLink} ${
              open ? styles.sidebarLinkOpen : styles.sidebarLinkClouse
            } ${url === "/" ? styles.sidebarActive : ""}`}
          >
            <Key
              classname={`${styles.sidebarLinkSvg} ${
                url === "/" ? styles.sidebarLinkActive : ""
              }`}
            />
            <p className={`h6 ${!open ? styles.linkP_hidden : styles.linkP} `}>
              Dashboard
            </p>
          </Link>

          <Link
            to="/courses"
            className={`${styles.sidebarLink} ${
              open ? styles.sidebarLinkOpen : styles.sidebarLinkClouse
            } ${url === "/courses" ? styles.sidebarActive : ""}`}
          >
            <Square
              classname={`${styles.sidebarLinkSvg} ${
                url === "/courses" ? styles.sidebarLinkActive : ""
              }`}
            />
            <p className={`h6 ${!open ? styles.linkP_hidden : styles.linkP}`}>
              Kurslar
            </p>
          </Link>
         {(ctx.user.role==="ADMIN"||ctx.user.role==="SUPER_ADMIN")&& <Link
            to={"/teachers"}
            className={`${styles.sidebarLink} ${
              open ? styles.sidebarLinkOpen : styles.sidebarLinkClouse
            } ${url === "/teachers" ? styles.sidebarActive : ""}`}
          >
            <User
              classname={`${styles.sidebarLinkSvg} ${
                url === "/teachers" ? styles.sidebarLinkActive : ""
              }`}
            />
            <p className={`h6 ${!open ? styles.linkP_hidden : styles.linkP}`}>
              O'qituvchilar
            </p>
          </Link>}
        {(ctx.user.role==="ADMIN"||ctx.user.role==="SUPER_ADMIN")&&   <Link
            to={"/students"}
            className={`${styles.sidebarLink} ${
              open ? styles.sidebarLinkOpen : styles.sidebarLinkClouse
            } ${url === "/students" ? styles.sidebarActive : ""}`}
          >
            <User
              classname={`${styles.sidebarLinkSvg} ${
                url === "/students" ? styles.sidebarLinkActive : ""
              }`}
            />
            <p className={`h6 ${!open ? styles.linkP_hidden : styles.linkP}`}>
              Talabalar
            </p>
          </Link>}
          {(ctx.user.role==="ADMIN"||ctx.user.role==="SUPER_ADMIN")&&   <Link
            to={"/results"}
            className={`${styles.sidebarLink} ${
              open ? styles.sidebarLinkOpen : styles.sidebarLinkClouse
            } ${url === "/results" ? styles.sidebarActive : ""}`}
          >
            <User
              classname={`${styles.sidebarLinkSvg} ${
                url === "/results" ? styles.sidebarLinkActive : ""
              }`}
            />
            <p className={`h6 ${!open ? styles.linkP_hidden : styles.linkP}`}>
              Natijalar
            </p>
          </Link>}
         {(ctx.user.role==="ADMIN"||ctx.user.role==="SUPER_ADMIN")&&  <Link
            to={"/payments"}
            className={`${styles.sidebarLink} ${
              open ? styles.sidebarLinkOpen : styles.sidebarLinkClouse
            } ${url === "/payments" ? styles.sidebarActive : ""}`}
          >
            <Money
              classname={`${styles.sidebarLinkSvg} ${
                url === "/payments" ? styles.sidebarLinkActive : ""
              }`}
            />
            <p className={`h6 ${!open ? styles.linkP_hidden : styles.linkP}`}>
              To'lovlar
            </p>
          </Link>}
          <>
            {ctx.user.role === "SUPER_ADMIN" && (
              <Link
                to={"/users"}
                className={`${styles.sidebarLink} ${
                  open ? styles.sidebarLinkOpen : styles.sidebarLinkClouse
                } ${url === "/users" ? styles.sidebarActive : ""}`}
              >
                <User
                  classname={`${styles.sidebarLinkSvg} ${
                    url === "/users" ? styles.sidebarLinkActive : ""
                  }`}
                />
                <p
                  className={`h6 ${!open ? styles.linkP_hidden : styles.linkP}`}
                >
                  Foydalanuvchilar
                </p>
              </Link>
            )}

            <Link
              to={`/settings/${ctx.user.id}`}
              className={`${styles.sidebarLink} ${
                open ? styles.sidebarLinkOpen : styles.sidebarLinkClouse
              } ${
                url === `/settings/${ctx.user.id}` ? styles.sidebarActive : ""
              }`}
            >
              <Settings
                classname={`${styles.sidebarLinkSvg} ${
                  url === `/settings/${ctx.user.id}`
                    ? styles.sidebarLinkActive
                    : ""
                }`}
              />
              <p className={`h6 ${!open ? styles.linkP_hidden : styles.linkP}`}>
                Sozlamalar
              </p>
            </Link>
          </>
        </div>
       {(ctx.user.role!=="ADMIN"&&ctx.user.role!=="SUPER_ADMIN")&& <div className={styles.time}>
          <p>
            {dateState.getHours() > 9
              ? dateState.getHours()
              : `0${dateState.getHours()}`}
            :
            {dateState.getMinutes() > 9
              ? dateState.getMinutes()
              : `0${dateState.getMinutes()}`}
            :
            {dateState.getSeconds() > 9
              ? dateState.getSeconds()
              : `0${dateState.getSeconds()}`}
          </p>
        </div>}
        <div
          onClick={() => navigate("/settings")}
          style={{}}
          className={styles.info}
        >
          <img width="67" height="62" src={UserImage} alt="UserImage" />
          <div>
            <p className={styles.firstname}>{ctx.user.firstName}</p>
            <p className={styles.job}>{ctx.user.lastName}</p>
          </div>
        </div>
        <button className="button-70" onClick={logoutHandle}>
          Log Out
        </button>
      </div>

      <div
        className={`${open ? styles.displayNone : styles.sidebarModal}`}
        onClick={props.sidebarActiveHandle}
      ></div>
    </>
  );
}

export default Sidebar;
