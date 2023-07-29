const { Op } = require("sequelize");
const catchAsync = require("../utils/catchAsync");
const QueryBuilder = require("../utils/QueryBuilder");
const AppError = require("../utils/AppError");
const Results = require("../models/Results");
const Tests = require("../models/Tests");
const Users = require("../models/User");

exports.getAllResults = catchAsync(async (req, res, next) => {
  const queryBuilder = new QueryBuilder(req.query);
  queryBuilder.filter().paginate().limitFields().sort();

  queryBuilder.queryOptions.include = [{ model: Users }, { model: Tests }];
  queryBuilder.queryOptions.order = [["createdAt", "asc"]];
  let allResults = await Results.findAndCountAll(queryBuilder.queryOptions);
  allResults = queryBuilder.createPage(allResults);
  allResults.content.sort((a, b) => b.score - a.score);
  res.json({
    status: "success",
    message: "",
    data: {
      allResults,
    },
  });
});
exports.getAllResultsByCourseId = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const queryBuilder = new QueryBuilder(req.query);
  queryBuilder.queryOptions.include = [{ model: Users }, { model: Tests }];
  queryBuilder.queryOptions.order = [["createdAt", "asc"]];
  let allResults = await Results.findAll({
    ...queryBuilder.queryOptions,
    where: { testId: { [Op.eq]: id } },
  });
  allResults.sort((a, b) => b.score - a.score);

  res.json({
    status: "success",
    message: "",
    data: {
      allResults,
    },
  });
});
exports.createEnrollment = catchAsync(async (req, res, next) => {
  const test = await Tests.findByPk(req.body.testId);
  if (test.status !== true) {
    return res.status(400).json({
      status: "fail",
      message: "Bu Test aktiv emas sizni ballaringiz inobatga olinmaydi!",
    });
  }
  if (req.user.role !== "STUDENT") {
    return res.status(400).json({
      status: "fail",
      message: "Siz bu testda ishtirok eta olmaysiz!",
    });
  }
  const exists = await Results.findAll({
    where: { userId: req.body.userId, testId: req.body.testId },
  });
  if (exists.length > 0) {
    return res.status(400).json({
      status: "fail",
      message:
        "Siz bu Testni avval yechgansz hozirgi ballaringiz inobatga olinmaydi!",
      data: {
        exists,
      },
    });
  }

  const newResult = await Results.create(req.body);
  res.status(201).json({
    status: "success",
    message: "Test yechildi ballaringiz bilan tanishishingiz mumkin!",
    data: {
      newResult,
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
