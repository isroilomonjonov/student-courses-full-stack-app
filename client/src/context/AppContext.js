import React from "react";

const AppContext = React.createContext({ isAuth:false,user:{},setUser:()=>{},setIsAuth:()=>{}})
// localStorage.setItem("context",...AppContext)
// console.log(AppContext.user);
export default AppContext