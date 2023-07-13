import { getStudentsStatistics } from "../../../api/students-api";
import ProfileNot from "../../../assets/Icons/ProfilNot";
import StudentStatistics from "../../../assets/Icons/StudentStatistics";
import StudentsTick from "../../../assets/Icons/StudentsTick";
import styles from "./StudentStatistics.module.css";
import useHttp from "./../../../hooks/use-http";
import { useEffect } from "react";
const StudentStatisticsCom = (params) => {
  const {
    send: getAllStudentsStatistics,
    data: value,
  } = useHttp(getStudentsStatistics);
  useEffect(() => {
    getAllStudentsStatistics();
  }, [params.value]);
  return (
    <div className={styles.statistics}>
      <div className={styles.containerFlex}>
        <div className={styles.container}>
          <div className={styles.svg}>
            <StudentStatistics />
          </div>
          <div className={styles.text}>
            <p className={styles.p}>Barcha talabalar</p>
            <h2>{value?.active + value?.inActive || 0} ta</h2>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.svg}>
            <StudentsTick />
          </div>
          <div className={styles.text}>
            <p className={styles.p}>Faol talabalar</p>
            <h2>{value?.active || 0} ta</h2>
          </div>
        </div>

        <div className={styles.container}>
          <div id="1" className={styles.svg}>
            <ProfileNot />
          </div>
          <div className={styles.text}>
            <p className={styles.p}>Faol bo'lmagan talabalar</p>
            <h2>{value?.inActive || 0} ta</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentStatisticsCom;
