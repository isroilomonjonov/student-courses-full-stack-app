const Courses = require("../models/Courses");
const Payment = require("../models/Payments");
const Students = require("../models/Students");
const QueryBuilder = require("../utils/QueryBuilder");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
exports.getAllPayments = catchAsync(async (req, res, next) => {
  const queryBuilder = new QueryBuilder(req.query);
  queryBuilder.filter().paginate().sort();
  queryBuilder.queryOptions.include = [{ model: Courses }, { model: Students }];
  let allPayments = await Payment.findAndCountAll({
    ...queryBuilder.queryOptions,
    where: { ...queryBuilder.queryOptions.where, userId: req.user.id },
  });
  let allPayments1 = await Payment.findAndCountAll({where:{userId: req.user.id}});
  let acc1 = 0;
  for (let i = 0; i < allPayments1?.rows?.length; i++) {
    acc1 += allPayments1.rows[i].price;
  }
  const acc = allPayments1.rows.slice(-1)[0].price;
  let accNow=0;
  for (let i = 0; i < allPayments?.rows?.length; i++) {
    accNow += allPayments.rows[i].price;
  }
  allPayments = queryBuilder.createPage(allPayments);

  res.json({
    status: "success",
    message: "",
    data: {
      allPayments,
      price: acc,
      allPrice: acc1,
      accNow
    },
  });
});
exports.getById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const byId = await Payment.findByPk(id);
  if (!byId) {
    return next(new AppError("Bunday To'lov topilmadi"));
  }
  res.status(201).json({
    status: "success",
    message: "",
    data: {
      byId,
    },
  });
});

exports.createPayment = catchAsync(async (req, res, next) => {
  const course = await Courses.findByPk(req.body.courseId);
  if (course.status !== true) {
    return res.status(201).json({
      status: "success",
      message: "Bu Kursga to'lov qilib bo'lmaydi",
    });
  }
  const newPayment = await Payment.create(req.body);
  res.status(201).json({
    status: "success",
    message: "Yangi Payment qo'shildi",
    data: {
      newPayment,
    },
  });
});
exports.updatePayment = async (req, res, next) => {
  const { id } = req.params;
  const byId = await Payment.findOne({ where: { id: id } });
  console.log(byId);
  if (req.user.role !== "SUPER_ADMIN") {
    if (byId.userId !== req.user.id) {
      return next(new AppError("Bu To'lov Bilan Amallar Bajara Olmaysiz"));
    }
  }
  if (!byId) {
    return next(new AppError("Bunday ID li To'lov topilmadi"));
  }
  const updatedCourse = await byId.update(req.body);
  res.json({
    status: "success",
    message: "To'lov ma'lumotlari tahrirlandi",
    data: {
      updatedCourse,
    },
  });
};
