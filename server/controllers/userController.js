const User = require("../models/User");
const catchAsyn = require("../utils/catchAsync");
const { validationResult } = require("express-validator");
const AppError = require("../utils/AppError");
const { Op } = require("sequelize");
const QueryBuilder = require("../utils/QueryBuilder");
const Users = require("../models/User");
const Enrollment = require("../models/Entrollment");
const Courses = require("../models/Courses");

exports.getAllUser = catchAsyn(async (req, res, next) => {
  const { id } = req.user;
  const queryBuilder = new QueryBuilder(req.query);

  queryBuilder
    .filter()
    .paginate()
    .limitFields()
    .search(["first_name", "last_name", "username"])
    .sort();
  if (!req.query.role || req.query.role === "SUPER_ADMIN") {
    queryBuilder.queryOptions.where.role = {
      [Op.notIn]: ["SUPER_ADMIN","STUDENT","TEACHER"],
    };
    queryBuilder.queryOptions.where.id = { [Op.ne]: id };
  }
  let allUser = await Users.findAndCountAll({
    ...queryBuilder.queryOptions,
    where: {
      ...queryBuilder.queryOptions.where,
      // role: { [Op.notIn]: "STUDENTS" },
    },
  });
  allUser = queryBuilder.createPage(allUser);
  res.json({
    status: "success",
    message: "",
    data: {
      allUser,
    },
  });
});
exports.getAllStudents = catchAsyn(async (req, res, next) => {
  const queryBuilder = new QueryBuilder(req.query);

  queryBuilder
    .filter()
    .paginate()
    .search(["first_name", "last_name", "phone_number"])
    .sort();
  let allUsers = await Users.findAndCountAll({
    ...queryBuilder.queryOptions,
    where: {
      ...queryBuilder.queryOptions.where,
      creatorId: req.user.id,
      role: "STUDENT",
    },
  });
  allUsers = queryBuilder.createPage(allUsers);
  res.json({
    status: "success",
    message: "",
    data: {
      allUsers,
    },
  });
});
exports.getAllTeachers = catchAsyn(async (req, res, next) => {
  const queryBuilder = new QueryBuilder(req.query);

  queryBuilder
    .filter()
    .paginate()
    .search(["first_name", "last_name", "phone_number"])
    .sort();
  let allUsers = await Users.findAndCountAll({
    ...queryBuilder.queryOptions,
    where: {
      ...queryBuilder.queryOptions.where,
      creatorId: req.user.id,
      role: "TEACHER",
    },
  });
  allUsers = queryBuilder.createPage(allUsers);
  res.json({
    status: "success",
    message: "",
    data: {
      allUsers,
    },
  });
});
exports.getAllStudentsForCourse = catchAsyn(async (req, res, next) => {
  const { id } = req.params;
  const queryBuilder = new QueryBuilder(req.query);
  queryBuilder
    .filter()
    .paginate()
    .search(["first_name", "last_name", "phone_number"]);
  queryBuilder.queryOptions.include = [{ model: User }, { model: Courses }];
  let allEnrollment = await Enrollment.findAll({
    ...queryBuilder.queryOptions,
    where: { courseId: { [Op.eq]: id } },
  });
  const students = await allEnrollment.map((e) => {
    return e?.user?.id;
  });
  console.log(req.query);
  queryBuilder.queryOptions.include = [];
  let allStudents = await User.findAll({
    ...queryBuilder.queryOptions,
    where: {
      ...queryBuilder.queryOptions.where,
      id: { [Op.notIn]: students },
      creatorId:req.user.id,
      isVerified: true,
      role:req.query.role||"STUDENT",
    },
  });
  res.json({
    status: "success",
    message: "",
    data: {
      allStudents,
    },
  });
});
exports.getAllStudentsStatusTrue = catchAsyn(async (req, res, next) => {
  let allStudents = await User.findAll({
    where: { isVerified: true, creatorId: req.user.id, role: "STUDENT" },
  });
  res.json({
    status: "success",
    message: "",
    data: {
      allStudents,
    },
  });
});
exports.getAllStatistics = catchAsyn(async (req, res, next) => {
  let inActive = await User.findAll({
    where: { isVerified: false, creatorId: req.user.id, role: "STUDENT" },
  });
  let active = await User.findAll({
    where: { isVerified: true, creatorId: req.user.id, role: "STUDENT" },
  });
  res.json({
    status: "success",
    message: "",
    data: {
      inActive: inActive.length,
      active: active.length,
    },
  });
});
exports.updateUserStatus = async (req, res) => {
  const { id } = req.params;
  const byId = await Users.findByPk(id);
  if (!byId) {
    return next(new AppError("Bunday ID li Foydalanuvchi topilmadi"));
  }
  const updatedStudent = await byId.update(req.body);
  res.json({
    status: "success",
    message: "Foydalanuvchi ma'lumotlari tahrirlandi",
    data: {
      updatedStudent,
    },
  });
};

exports.byVerifyCodeUser = catchAsyn(async (req, res, next) => {
  const { vercode } = req.params;
  const user = await User.findOne({
    where: {
      vericationCode: { [Op.eq]: vercode },
      isVerified: { [Op.eq]: false },
    },
  });
  if (!user) {
    return next(
      new AppError(
        "Bu Foydalanuvchi Verifikatsiyadan otib bolgan Royhatdan oting"
      )
    );
  }
  await user.update({ isVerified: true });
  res.status(201).json({
    status: "success",
    message: "Muvaffaqiyatli Royhatdan O'tdingiz Login Qlishingiz Mumkin",
    data: null,
  });
});
exports.byVerifyCodeUserPhoneNumber = catchAsyn(async (req, res, next) => {
  const { vercode } = req.params;
  const user = await User.findOne({
    where: {
      vericationCodeByPhone: { [Op.eq]: vercode },
      isVerified: { [Op.eq]: false },
    },
  });
  if (!user) {
    return next(new AppError("Hato Kod"));
  }
  await user.update({ isVerified: true });
  res.status(201).json({
    status: "success",
    message: "Muvaffaqiyatli Royhatdan O'tdingiz Login Qlishingiz Mumkin",
    data: null,
  });
});
exports.getById = catchAsyn(async (req, res, next) => {
  const { id } = req.params;
  const byId = await User.findByPk(id);
  if (!byId) {
    return next(new AppError("Bunday ID li Foydalanuvchi topilmadi"));
  }
  res.status(201).json({
    status: "success",
    message: "",
    data: {
      byId,
    },
  });
});
exports.createUser = async (req, res) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const err = new AppError("Validation error", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }

  req.body.username.toLowerCase();
  const user = await Users.create(req.body);
  // const updatedUser = await byId.update(req.body);
  res.json({
    status: "success",
    message: "Foydalanuvchi yaratildi",
    data: {
      user,
    },
  });
};
exports.updateUser = async (req, res) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const err = new AppError("Validation error", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }

  const { id } = req.params;

  const byId = await User.findByPk(id);

  if (!byId) {
    return next(new AppError("Bunday ID li Foydalanuvchi topilmadi"));
  }
  req.body.username.toLowerCase();
  const updatedUser = await byId.update(req.body);
  res.json({
    status: "success",
    message: "Foydalanuvchi ma'lumotlari tahrirlandi",
    data: {
      updatedUser,
    },
  });
};
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const byId = await User.findByPk(id);

  if (!byId) {
    return next(new AppError("Bunday ID li Kurs topilmadi"));
  }

  await byId.destroy();

  res.status(201).json({
    status: "success",
    message: "User o'chirildi",
    data: null,
  });
};
