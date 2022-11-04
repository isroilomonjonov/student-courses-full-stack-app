const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");

const router = express.Router();

router.post(
  "/login",
  authController.login
);
router.post(
  "/register",
  authController.register
);
router.post(
  "/registerbyphone",
  authController.registerbyphone
);

module.exports = router;
