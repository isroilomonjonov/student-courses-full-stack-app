import ProfileNot from "../../../assets/Icons/ProfilNot";
import StudentStatistics from "../../../assets/Icons/StudentStatistics";
import styles from "./PaymentStatistics.module.css";
import Dollar from "../../../assets/Icons/Dollar";
const PaymentStatistics = ({ value }) => {
  return (
    <div className={styles.statistics}>
      <div className={styles.containerFlex}>
        <div className={styles.container}>
          <div className={styles.svg}>
            <StudentStatistics />
          </div>
          <div className={styles.text}>
            <p className={styles.p}>Barcha To'lovlar Soni</p>
            <h2>{value?.count || 0} ta</h2>
          </div>
        </div>
        <div className={styles.container}>
          <div id="1" className={styles.svg}>
            <ProfileNot />
          </div>
          <div className={styles.text}>
            <p className={styles.p}>Ohirgi to'langan summa</p>
            <h2> {value?.price?.toLocaleString("Ru-Ru") || 0} sum</h2>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.svg}>
            <Dollar />
          </div>
          <div className={styles.text}>
            <p className={styles.p}>To'langan barcha summa</p>
            <h2> {value?.allPrice?.toLocaleString("Ru-Ru") || 0} sum</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatistics;
