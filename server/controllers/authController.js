const { validationResult } = require("express-validator");
const { Op } = require("sequelize");
const User = require("../models/User");
const AppError = require("../utils/AppError");
const catchAsyn = require("../utils/catchAsync");
const {sendVerificationMail}=require("../utils/mailUtils")
const jwt = require("jsonwebtoken");
const {sendVerificationSMS} = require('../utils/smsUtils')
const generateToken = (payload, jwtSecret, options) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, jwtSecret, options, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};
const findByUsername = async username => {
  const user = await User.findOne({
    where: { username: { [Op.eq]: username } },
  });
  if (user) {
    return user;
  }
  return null;
};
exports.registerByEmail = catchAsyn(async (req, res, next) => {
  
  const validationErrorrs = validationResult(req);
  if (!validationErrorrs.isEmpty()) {
    const err = new AppError("Validation error", 400);
    err.isOperational = false;
    err.errors = validationErrorrs.errors;
    return next(err);
  }
  const existedUser = await findByUsername(req.body.username);
  req.body.username.toLowerCase()
  if (existedUser) {
    return next(new AppError("Bunday Usernameli foydalanuvchi mavjud ", 409));
  }
  const newUser = await User.create(req.body);
  console.log(newUser.vericationCode);
   sendVerificationMail({to:req.body.email,vercode:newUser.vericationCode})
  res.status(201).json({
    status: "success",
    message: "User Yaratildi Emaildan Tastiqlang",
    error: null,
    data:null
  });
});
exports.registerbyphone = catchAsyn(async (req, res, next) => {

  const validationErrorrs = validationResult(req);
  if (!validationErrorrs.isEmpty()) {
   const err = new AppError("Validation error", 400);
   err.isOperational = false;
   err.errors = validationErrorrs.errors;
   return next(err);
 }
 req.body.username.toLowerCase()
 const existedUser = await findByUsername(req.body.username);
 if (existedUser) {
   return next(new AppError("Bunday Usernameli foydalanuvchi mavjud ", 409));
 }
 const newUser = await User.create(req.body);
 console.log(newUser.vericationCode);
  sendVerificationSMS({to:req.body.phoneNumber,vercode:newUser.vericationCodeByPhone})
 res.status(201).json({
   status: "success",
   message: "User Yaratildi SMS Habarni Tekshiring",
   error: null,
   data:null
 });
});



exports.register = catchAsyn(async (req, res, next) => {
  
  const validationErrorrs = validationResult(req);
  if (!validationErrorrs.isEmpty()) {
    const err = new AppError("Validation error", 400);
    err.isOperational = false;
    err.errors = validationErrorrs.errors;
    return next(err);
  }
  const existedUser = await findByUsername(req.body.username);
  req.body.username.toLowerCase()
  if (existedUser) {
    return next(new AppError("Bunday Usernameli foydalanuvchi mavjud ", 409));
  }
  const newUser = await User.create(req.body);
  const payload = {
    id: newUser.id,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    username: newUser.username,
    email: newUser.email,
    isVerified: newUser.isVerified,
    role: newUser.role,
  };
  const token = await generateToken(payload, process.env.JWT_SECRET, {
    algorithm: "HS512",
    expiresIn: "24h",
  });
  res.json({
    status: "success",
    message: "",
    error: null,
    data: {
      user: {
        ...payload,
        token: token
      },
    },
  });
});
exports.login = catchAsyn(async (req, res, next) => {
  const validationErrorrs = validationResult(req);
  if (!validationErrorrs.isEmpty()) {
    const err = new AppError("Validation error", 400);
    err.isOperational = false;
    err.errors = validationErrorrs.errors;
    return next(err);
  }
  const { username, password } = req.body;
  console.log(username,password);
  const candidate = await findByUsername(username);
  console.log(candidate);
  if (!candidate) {
    return next(new AppError("Login yoki parol xato!", 400));
  }
  const passwordIsMatch = (password===candidate.password);
  if (!passwordIsMatch) {
    return next(new AppError("Login yoki parol xato!", 400));
  }
  if(!candidate.isVerified){
    return next(new AppError("Siz Adminlar Tomonidan Bloklangansiz", 401))
  }
  const payload = {
    id: candidate.id,
    firstName: candidate.firstName,
    lastName: candidate.lastName,
    username: candidate.username,
    email: candidate.email,
    isVerified: candidate.isVerified,
    role: candidate.role,
  };
  const token = await generateToken(payload, process.env.JWT_SECRET, {
    algorithm: "HS512",
    expiresIn: "24h",
  });
  res.json({
    status: "success",
    message: "",
    error: null,
    data: {
      user: {
        ...payload,
        token: token
      },
    },
  });
});