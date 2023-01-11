import Layout from "../../components/Layout/Layout";
import styles from "./Dashboard.module.css"
import {useEffect } from "react";
import { ChartPie } from "../../components/Chart/ChartPie";
import useHttp from "../../hooks/use-http"
import { getStudentsStatistics } from "../../api/students-api";
import {  getAllCoursesStatistics } from "../../api/courses-api";
const Dashboard = () => {
    const {
        send: getAllStudentsStatistics, 
        data: value,
      } = useHttp(getStudentsStatistics);
      const {
        send: getCoursesStatistics, 
        data: valueCourses,
      } = useHttp(getAllCoursesStatistics);
      useEffect(()=>{
        getAllStudentsStatistics()
        getCoursesStatistics()
      },[])
      console.log(value);

    return ( 
        <Layout>
            <div className={styles.container}>
                <div style={{height:'40rem',width:'30%'}}>
                  <h2 style={{textAlign:'center'}}>O'quvchilar Statistikasi</h2>  
                {value&&<ChartPie data={{value:Object.values(value),label:["Faol O'quvchilar","Faol Bo'lmagan O'quvchilar","Hamma O'quvchilar"]}} style={{width:"50rem"}}/>}
                </div>
                <div style={{height:'40rem',width:'30%'}}>
                  <h2 style={{textAlign:'center'}}>Kurslar Statistikasi</h2>  
                {valueCourses&&<ChartPie data={{value:Object.values(valueCourses),label:["Faol Kurslar","Tugatilgan Kurslar","Hamma Kurslar"]}} style={{width:"50rem"}}/>}
                </div>
            </div>
        </Layout>
     );
}
 
export default Dashboard;