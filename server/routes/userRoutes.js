const express = require("express");
const { body } = require("express-validator");
const userController = require("../controllers/userController");

const router = express.Router();

router.get(
  "/verify/:vercode",
  userController.byVerifyCodeUser
);
router.get(
  "/verifyphonenumber/:vercode",
  userController.byVerifyCodeUserPhoneNumber
);
router.put('/:id', userController.updateUserStatus)
router.get("/:id",userController.getById)
router.get("/",userController.getAllUser)
router.patch("/:id", userController.updateUser)
router.delete("/:id",userController.deleteUser)
module.exports = router;