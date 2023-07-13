const { Op } = require("sequelize");
const Enrollment = require("../models/Entrollment");
const catchAsync = require("../utils/catchAsync");
const QueryBuilder = require("../utils/QueryBuilder");
const Students = require("../models/Students");
const Courses = require("../models/Courses");
const AppError = require("../utils/AppError");

exports.getAllEnrollment = catchAsync(async (req, res, next) => {
  let allEnrollment = await Enrollment.findAndCountAll();
  res.json({
    status: "success",
    message: "",
    data: { 
      allEnrollment,
    },
  });
});
exports.getAllEnrollmentByCourseId = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const queryBuilder = new QueryBuilder(req.query);
  queryBuilder.queryOptions.include = [{ model: Students }, { model: Courses }];
  let allEnrollment = await Enrollment.findAll({
    ...queryBuilder.queryOptions,
    where: { courseId: { [Op.eq]: id } },
  });
  const course = await Courses.findByPk(id);
  const students = await allEnrollment.map((e) => {
    return e.student;
  });

  res.json({
    status: "success",
    message: "",
    data: {
      course: course,
      students,
    },
  });
});
exports.createEnrollment = catchAsync(async (req, res, next) => {
  const course=await Courses.findByPk(req.body.courseId);
  if(course.status!==true){
    return res.status(201).json({
      status: "success",
      message: "Bu Kursga Talaba qo'shib bo'lmaydi",
    });
  }
  const data = req.body.students.map((s) => {
    return {
      courseId: req.body.courseId,
      studentId: s,
    };
  });
  const exists = await Enrollment.findAll({
    where: { studentId: { [Op.in]: req.body.students } },
  });
  for (let i = 0; i < exists.length; i++) {
    console.log(exists[i]);
    if (exists[i]?.courseId === req.body.courseId) {
      return res.status(201).json({
        status: "success",
        message: "Bu Student Bu kursda mavjud",
        data: {
          exists,
        },
      });
    }
  }

  const newEnrollment = await Enrollment.bulkCreate(data);
  res.status(201).json({
    status: "success",
    message: "Talaba muvaffaqiyatli qo'shildi",
    data: {
      newEnrollment,
    },
  });
});

exports.deleteEntrollement = async (req, res, next) => {
  const { id } = req.params;
  const byId = await Enrollment.findOne({
    where: { studentId: id, courseId: req.body.courseId },
  });

  if (!byId) {
    return next(new AppError("Bunday ID li Talaba topilmadi"));
  }
  await byId.destroy();

  res.status(201).json({
    status: "success",
    message: "Talaba kursdan o'chirildi",
    data: null,
  });
};
