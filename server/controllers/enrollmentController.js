const { Op } = require("sequelize");
const Enrollment = require("../models/Entrollment");
const catchAsync = require("../utils/catchAsync");
const QueryBuilder = require("../utils/QueryBuilder");
const Courses = require("../models/Courses");
const AppError = require("../utils/AppError");
const Users = require("../models/User");

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
  queryBuilder.queryOptions.include = [{ model: Users }];
  let allEnrollment = await Enrollment.findAll({
    ...queryBuilder.queryOptions,
    where: { courseId: { [Op.eq]: id } },
  });
  const course = await Courses.findByPk(id);
  const students = await allEnrollment.map((e) => {
    if(e.user.role==="STUDENT"){
      return e.user
    }
  }).filter(e=>e);
  const teachers = await allEnrollment.map((e) => {
    if(e.user.role==="TEACHER"){
      return e.user
    }
  }).filter(e=>e);


  res.json({
    status: "success",
    message: "",
    data: {
      course: course,
      students,
      teachers
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
  const data = req.body.users.map((s) => {
    return {
      courseId: req.body.courseId,
      userId: s,
    };
  });
  const exists = await Enrollment.findAll({
    where: { userId: { [Op.in]: req.body.users } },
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
    where: { userId: id, courseId: req.body.courseId },
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
