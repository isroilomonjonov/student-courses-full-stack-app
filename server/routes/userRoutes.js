const express = require("express");
const { body } = require("express-validator");
const userController = require("../controllers/userController");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router
  .get("/verify/:vercode", userController.byVerifyCodeUser)
  .get(
    "/verifyphonenumber/:vercode",
    userController.byVerifyCodeUserPhoneNumber
  )
  .post("/",roleMiddleware(["SUPER_ADMIN","ADMIN"]), userController.createUser)
  .put("/:id", roleMiddleware(["SUPER_ADMIN","ADMIN"]),userController.updateUserStatus)
  .get("/all",roleMiddleware(["SUPER_ADMIN","ADMIN"]), userController.getAllStudentsStatusTrue)
  .get("/students",roleMiddleware(["SUPER_ADMIN","ADMIN"]), userController.getAllStudents)
  .get("/teachers",roleMiddleware(["SUPER_ADMIN","ADMIN"]), userController.getAllTeachers)
  .get("/:id", userController.getById)
  .get("/",roleMiddleware(["SUPER_ADMIN","ADMIN"]), userController.getAllUser)
  .get("/students/course/:id",roleMiddleware(["SUPER_ADMIN","ADMIN"]), userController.getAllStudentsForCourse)
  .patch("/:id", userController.updateUser)
  .delete("/:id",roleMiddleware(["SUPER_ADMIN","ADMIN"]), userController.deleteUser)
  .get("/students/statistics", userController.getAllStatistics);

module.exports = router;
