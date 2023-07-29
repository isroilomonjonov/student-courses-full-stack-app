const { Op } = require("sequelize");
const catchAsync = require("../utils/catchAsync");
const QueryBuilder = require("../utils/QueryBuilder");
const Tests = require("../models/Tests");
const AppError = require("../utils/AppError");
const Questions = require("../models/Questions");
const Answers = require("../models/Answers");

exports.getAllTests = catchAsync(async (req, res, next) => {
  const queryBuilder = new QueryBuilder(req.query);
  queryBuilder.filter().paginate().sort();
  queryBuilder.queryOptions.include = [{ model: Questions, include: Answers }];
  let allTests = await Tests.findAll(queryBuilder.queryOptions);
  res.json({
    status: "success",
    message: "",
    data: {
      allTests,
    },
  });
});

exports.createTests = catchAsync(async (req, res, next) => {
  const { name, questions } = req.body;
  const newTests = await Tests.create(req.body);
  for (let i = 0; i < questions.length; i++) {
    const newQuestion = await Questions.create({
      question: questions[i].question,
      testId: newTests.id,
    });
    const answers = questions[i].answers.map((answer) => {
      return {
        ...answer,
        questionId: newQuestion.id,
      };
    });
    const newAnswers = await Answers.bulkCreate(answers);
  }
  res.status(201).json({
    status: "success",
    message: "Test muvaffaqiyatli qo'shildi",
    data: {
      newTests,
    },
  });
});
exports.updateTestStatus = async (req, res, next) => {
  const { id } = req.params;
  const byId = await Tests.findByPk(id);
  if (!byId) {
    return next(new AppError("Bunday ID li Test topilmadi"));
  }
  const updatedTest = await byId.update(req.body);
  res.json({
    status: "success",
    message: "Test ma'lumotlari tahrirlandi",
    data: {
      updatedTest,
    },
  });
};
exports.updateTest = async (req, res, next) => {
  const { id } = req.params;
  const byId = await Tests.findByPk(id);
  if (!byId) {
    return next(new AppError("Bunday ID li Test topilmadi"));
  }
  const { name, questions } = req.body;
  const updatedTest = await byId.update({ name: name });

  const questiondel = await Questions.findAll({
    where: { test_id: updatedTest.id },
  });
  for (let i = 0; i < questiondel.length; i++) {
    const answers = await Answers.findAll({
      where: { question_id: questiondel[i].id },
    });
    answers.forEach((answer) => answer.destroy());
  }
  questiondel.forEach((question) => question.destroy());
  for (let i = 0; i < questions.length; i++) {
    const newQuestion = await Questions.create({
      question: questions[i].question,
      testId: updatedTest.id,
    });
    const answers = questions[i].answers.map((answer) => {
      return {
        ...answer,
        questionId: newQuestion.id,
      };
    });
    const newAnswers = await Answers.bulkCreate(answers);
  }

  res.json({
    status: "success",
    message: "Test ma'lumotlari tahrirlandi",
    data: {
      updatedTest,
    },
  });
};
exports.getById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const queryBuilder = new QueryBuilder(req.query);
  queryBuilder.filter().paginate().sort();
  queryBuilder.queryOptions.include = [{ model: Questions, include: Answers }];
  const byId = await Tests.findAll({
    ...queryBuilder.queryOptions,
    where: { id: id },
  });
  if (!byId) {
    return next(new AppError("Bunday ID li Test topilmadi"));
  }
  res.status(201).json({
    status: "success",
    message: "",
    data: {
      byId,
    },
  });
});
exports.deleteTest = async (req, res, next) => {
  const { id } = req.params;
  const byId = await Tests.findByPk(id);
  await byId.destroy();

  res.status(201).json({
    status: "success",
    message: "Test o'chirildi",
    data: null,
  });
};
