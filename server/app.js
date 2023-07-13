const express = require("express");
const AppError = require("./utils/AppError");
const studentRoutes = require("./routes/studentRoutes");
const coursesRouter = require("./routes/coursesRoutes");
const paymentRoutes = require("./routes/paymentRouter");
const entrollementRouter = require("./routes/entrollementRouter");
const errorController = require("./controllers/errorController");
const authMiddleware = require("./middleware/authMiddleware");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRoutes");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + "/build"));
app.use("/api/v1/students", authMiddleware, studentRoutes);
app.use("/api/v1/courses", authMiddleware, coursesRouter);
app.use("/api/v1/users", authMiddleware, userRouter);
app.use("/api/v1/entrollement", authMiddleware, entrollementRouter);
app.use("/api/v1/payments", authMiddleware, paymentRoutes);
app.use("/api/v1/auth", authRouter);
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});
app.all("*", (req, res, next) => {
  return next(new AppError(`${req.path} not exists`, 404));
});
app.use(errorController);
module.exports = app;
