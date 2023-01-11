const Courses = require("../models/Courses");
const Users = require("../models/User");
const Students = require("../models/Students");
const catchAsyn = require("../utils/catchAsync");
const { validationResult } = require("express-validator");
const AppError = require("../utils/AppError");
const { Op } = require("sequelize");
const QueryBuilder = require("../utils/QueryBuilder");
exports.getAllCourses = catchAsyn(async (req, res, next) => {
  const queryBuilder = new QueryBuilder(req.query);
  queryBuilder
    .filter()
    .paginate()
    .limitFields()
    .sort()
    .search(["name", "description"]);
  queryBuilder.queryOptions.include = [
    { model: Students, attributes: ["id"] },
    { model: Users, attributes: ["id", "firstName", "lastName"] },
  ];
  let allCourses = await Courses.findAndCountAll(queryBuilder.queryOptions);
  let active = await Courses.findAll({ where: { status: true } });
  let inActive = await Courses.findAll({ where: { status: false } });
  let allStudents = await Students.findAll();
  allCourses = queryBuilder.createPage(allCourses);
  res.json({
    status: "success",
    message: "",
    data: {
      allCourses,
      active: active.length,
      inActive: inActive.length,
      allStudents: allStudents.length,
    },
  });
});
exports.getAllCoursesStatusTrue = catchAsyn(async (req, res, next) => {
  let allCourses = await Courses.findAll({ where: { status: true } });
  res.json({
    status: "success",
    message: "",
    data: {
      allCourses
    },
  });
});
exports.byIdStudetns = catchAsyn(async (req, res, next) => {
  const { id } = req.params;
  const students = await Students.findAll({
    where: { course_id: { [Op.eq]: id } },
  });
  res.status(201).json({
    status: "success",
    message: "",
    data: {
      students,
    },
  });
});
exports.getById = catchAsyn(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const byId = await Courses.findOne({ where: { id: { [Op.eq]: id } } });
  console.log(byId);
  if (!byId) {
    return next(new AppError("Bunday ID li Kurs topilmadi"));
  }
  res.status(201).json({
    status: "success",
    message: "",
    data: {
      byId,
    },
  });
});
exports.createCourse = catchAsyn(async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const err = new AppError("Validation error", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }
  const existedCourse = await Courses.findOne({
    where: { name: { [Op.eq]: req.body.name } },
  });
  if (existedCourse) {
    return next(new AppError("Bunday Ismli Kurs Mavjud", 409));
  }
  const newCourse = await Courses.create(req.body);
  res.status(201).json({
    status: "success",
    message: "Yangi Kurs qo'shildi",
    data: {
      newCourse,
    },
  });
});
exports.updateCourse = async (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const err = new AppError("Validation error", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }
  const { id } = req.params;
  const byId = await Courses.findByPk(id);
  if (req.user.role !== "SUPER_ADMIN") {
    if (byId.userId !== req.user.id) {
      return next(new AppError("Bu Kurs Bilan Amallar Bajara Olmaysiz"));
    }
  }

  if (!byId) {
    return next(new AppError("Bunday ID li Kurs topilmadi"));
  }
  const updatedCourse = await byId.update(req.body);
  res.json({
    status: "success",
    message: "Kurs ma'lumotlari tahrirlandi",
    data: {
      updatedCourse,
    },
  });
};
exports.updateCourseStatus = async (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const err = new AppError("Validation error", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }
  const { id } = req.params;
  const byId = await Courses.findByPk(id);
  if (req.user.role !== "SUPER_ADMIN") {
    if (byId.userId !== req.user.id) {
      return next(new AppError("Bu Kurs Bilan Amallar Bajara Olmaysiz"));
    }
  }

  if (!byId) {
    return next(new AppError("Bunday ID li Kurs topilmadi"));
  }
  const updatedCourse = await byId.update(req.body);
  res.json({
    status: "success",
    message: "Kurs Muvafaqiyatli Yakunlandi",
    data: {
      updatedCourse,
    },
  });
};
exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  const byId = await Courses.findByPk(id);
  if (byId?.userId !== req.user.id && req.user.userRole !== "SUPER_ADMIN") {
    return next(new AppError("Bu Kurs Bilan Amallar Bajara Olmaysiz"));
  }
  if (!byId) {
    return next(new AppError("Bunday ID li Kurs topilmadi"));
  }
  await byId.destroy();
  res.status(201).json({
    status: "success",
    message: "Kurs o'chirildi",
    data: null,
  });
};
