const Students=require('../models/Students')
const catchAsyn = require("../utils/catchAsync")
const { validationResult } = require("express-validator")
const AppError = require("../utils/AppError")
const {Op} =require("sequelize")
const QueryBuilder = require("../utils/QueryBuilder")
const Courses = require('../models/Courses')
exports.getAllStudents = catchAsyn(async (req, res, next) => {
  console.log(req.query,"query");
  const queryBuilder = new QueryBuilder(req.query)
  
  queryBuilder
    .filter()
    .paginate()
    .limitFields()
    .search(["first_name", "last_name"])
    queryBuilder.queryOptions.include = [
      { model: Courses, attributes: ["id","name"] },
    ];
  let allStudents = await Students.findAndCountAll(queryBuilder.queryOptions)
  allStudents = queryBuilder.createPage(allStudents)
  res.json({
    status: "success",
    message: "",
    data: {
      allStudents
    }})
  })
  
  
  exports.getAllStatistics=catchAsyn(async (req,res,next)=>{
  let inActive = await Students.findAll({ where: { status: false } });
  let active = await Students.findAll({ where: { status: true } });
  res.json({
    status: "success",
    message: "",
    data: {
     inActive: inActive.length,
      active:active.length
    }})
    
  })
exports.getById = catchAsyn( async (req, res, next) => {
    const { id } = req.params
    const byId = await Students.findByPk(id)
    if (!byId) {
     return next(new AppError("Bunday ID li Foydalanuvchi topilmadi"))
    }
    res.status(201).json({
      status: "success",
      message: "",
      data: {
        byId
      }
    })
    
  }
  )

 
exports.createStudent = catchAsyn( async (req, res, next) => {
    const validationErrors = validationResult(req)
    
    if(!validationErrors.isEmpty()) {
      const err = new AppError("Validation error", 400);
      err.name = "validationError";
      err.errors = validationErrors.errors;
      err.isOperational = false;
      return next(err);
    }
    if(req.body.courseId===""){
      req.body.courseId =null
    }
    console.log(req.body);
    const newStudent = await Students.create(req.body)
    res.status(201).json({
      status: "success",
      message: "Yangi Foydalanuvchi qo'shildi",
      data: {
       newStudent
      }
    })
  })
  exports.updateStudent = async (req, res) => {

    const validationErrors = validationResult(req)
  
    if (!validationErrors.isEmpty()) {
      const err = new AppError("Validation error", 400);
      err.name = "validationError";
      err.errors = validationErrors.errors;
      err.isOperational = false;
      return next(err);
    }
  
    const { id } = req.params
    
    const byId = await Students.findByPk(id)
  
    if (!byId) {
     return next(new AppError("Bunday ID li Foydalanuvchi topilmadi"))
    }
  console.log(req.body);
    const updatedStudent = await byId.update(req.body)
    res.json({
      status: "success",
      message: "Foydalanuvchi ma'lumotlari tahrirlandi",
      data: {
        updatedStudent
      }
    })
  }
  exports.updateStudentStatus = async (req, res) => {

    const { id } = req.params
    
    const byId = await Students.findByPk(id)
  
    if (!byId) {
     return next(new AppError("Bunday ID li Foydalanuvchi topilmadi"))
    }
    const updatedStudent = await byId.update(req.body)
    res.json({
      status: "success",
      message: "Foydalanuvchi ma'lumotlari tahrirlandi",
      data: {
        updatedStudent
      }
    })
  }
  
  exports.deleteStudent= async (req, res) => {
    const { id } = req.params
    
    const byId = await Students.findByPk(id)
  
    if (!byId) {
     return next(new AppError("Bunday ID li Foydalanuvchi topilmadi"))
    }
  
    await byId.destroy()
  
    res.status(201).json({
      status: "success",
      message: "Foydalanuvchi o'chirildi",
      data: null
    })
  }