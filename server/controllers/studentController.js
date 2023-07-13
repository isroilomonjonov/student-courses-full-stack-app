const Students = require("../models/Students");
const catchAsyn = require("../utils/catchAsync");
const { validationResult } = require("express-validator");
const AppError = require("../utils/AppError");
const { Op } = require("sequelize");
const Enrollment = require("../models/Entrollment");

const QueryBuilder = require("../utils/QueryBuilder");
const Courses = require("../models/Courses");
exports.getAllStudents = catchAsyn(async (req, res, next) => {
  const queryBuilder = new QueryBuilder(req.query);

  queryBuilder
    .filter()
    .paginate()
    .search(["first_name", "last_name", "phone_number"])
    .sort();
  let allStudents = await Students.findAndCountAll({
    ...queryBuilder.queryOptions,
    where: { ...queryBuilder.queryOptions.where, userId: req.user.id },
  });
  allStudents = queryBuilder.createPage(allStudents);
  res.json({
    status: "success",
    message: "",
    data: {
      allStudents,
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
  queryBuilder.queryOptions.include = [{ model: Students }, { model: Courses }];
  let allEnrollment = await Enrollment.findAll({
    ...queryBuilder.queryOptions,
    where: { courseId: { [Op.eq]: id } },
  });
  const students = await allEnrollment.map((e) => {
    return e?.student?.id;
  });
  queryBuilder.queryOptions.include = [];
  let allStudents = await Students.findAll({
    ...queryBuilder.queryOptions,
    where: {
      ...queryBuilder.queryOptions.where,
      id: { [Op.notIn]: students },
      status: true,
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
  let allStudents = await Students.findAll({
    where: { status: true, userId: req.user.id },
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
  let inActive = await Students.findAll({
    where: { status: false, userId: req.user.id },
  });
  let active = await Students.findAll({
    where: { status: true, userId: req.user.id },
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
exports.getById = catchAsyn(async (req, res, next) => {
  const { id } = req.params;
  const byId = await Students.findByPk(id);
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

exports.createStudent = catchAsyn(async (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const err = new AppError("Validation error", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }
  if (req.body.courseId === "") {
    req.body.courseId = null;
  }
  const newStudent = await Students.create(req.body);
  res.status(201).json({
    status: "success",
    message: "Yangi Foydalanuvchi qo'shildi",
    data: {
      newStudent,
    },
  });
});
exports.updateStudent = async (req, res) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const err = new AppError("Validation error", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }

  const { id } = req.params;

  const byId = await Students.findByPk(id);

  if (!byId) {
    return next(new AppError("Bunday ID li Foydalanuvchi topilmadi"));
  }
  console.log(req.body);
  const updatedStudent = await byId.update(req.body);
  res.json({
    status: "success",
    message: "Foydalanuvchi ma'lumotlari tahrirlandi",
    data: {
      updatedStudent,
    },
  });
};
exports.updateStudentStatus = async (req, res) => {
  const { id } = req.params;

  const byId = await Students.findByPk(id);

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

exports.deleteStudent = async (req, res,next) => {
  const { id } = req.params;

  const byId = await Students.findByPk(id);

  if (!byId) {
    return next(new AppError("Bunday ID li Foydalanuvchi topilmadi"));
  }

  await byId.destroy();

  res.status(201).json({
    status: "success",
    message: "Foydalanuvchi o'chirildi",
    data: null,
  });
};
