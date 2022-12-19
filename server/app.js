const express = require('express');
const AppError=require('./utils/AppError')
const studentRoutes= require('./routes/studentRoutes')
const coursesRouter= require('./routes/coursesRoutes')
const errorController=require('./controllers/errorController')
const authMiddleware = require("./middleware/authMiddleware");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRoutes");
const cors = require('cors');
const app = express()
app.use(express.json())
app.use(cors())
app.use("/api/v1/students",authMiddleware,studentRoutes)
app.use("/api/v1/courses",authMiddleware,coursesRouter)
app.use("/api/v1/users",userRouter)
app.use("/api/v1/auth", authRouter);
app.use(express.static("./static"))
app.use(express.static(__dirname + "/build"));
app.get("*", (req, res) => {
   return res.sendFile(__dirname + "/build/index.html");
  });
app.all("*", (req, res, next) => {
   return next(new AppError(`Path ${req.path} not exists`, 404));
});
app.use(errorController)
module.exports =app