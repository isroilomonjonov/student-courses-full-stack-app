const User=require('../models/User')
const catchAsyn = require("../utils/catchAsync")
const { validationResult } = require("express-validator")
const AppError = require("../utils/AppError")
const {Op}=require("sequelize")
const QueryBuilder = require("../utils/QueryBuilder")

exports.getAllUser= catchAsyn( async (req, res, next) => {
  const { page, size,search="",active} = req.query  

  const allUser = await User.findAndCountAll({
    offset: (page - 1) * size || 0,
    limit: size || 100,
    where:(active==="true"||active==="false")?{role:{[Op.not]:"SuperAdmin"},is_verified:{[Op.eq]:active},
    [Op.or]:[{firstName: {[Op.iLike]: `%${search}%` }}, {lastName: { [Op.iLike]: `%${search}%` }}]}:
    {role:{[Op.not]:"SuperAdmin"},[Op.or]:[{firstName: {[Op.iLike]: `%${search}%` }}, {lastName: { [Op.iLike]: `%${search}%` }}]}
  }) 
   allUser.totalPages = Math.ceil(allUser.count / size) || 0
  res.json({
    status: "success",
    message: "",
    data: {
      allUser
    }
  })
})
exports.byVerifyCodeUser= catchAsyn( async (req, res, next) => {
  const { vercode } = req.params
  const user=await User.findOne({where:{vericationCode:{[Op.eq]:vercode},isVerified:{[Op.eq]:false}}})
  if(!user){
    return next(new AppError("Bu Foydalanuvchi Verifikatsiyadan otib bolgan Royhatdan oting"))
  }
  await user.update({isVerified:true})
   res.status(201).json({
    status: "success",
    message: "Muvaffaqiyatli Royhatdan O'tdingiz Login Qlishingiz Mumkin",
    data: null
  })
})
exports.byVerifyCodeUserPhoneNumber= catchAsyn( async (req, res, next) => {
  const { vercode } = req.params
  const user=await User.findOne({where:{vericationCodeByPhone:{[Op.eq]:vercode},isVerified:{[Op.eq]:false}}})
  if(!user){
    return next(new AppError("Hato Kod"))
  }
  await user.update({isVerified:true})
   res.status(201).json({
    status: "success",
    message: "Muvaffaqiyatli Royhatdan O'tdingiz Login Qlishingiz Mumkin",
    data: null
  })
})
exports.getById = catchAsyn( async (req, res, next) => {
  const { id } = req.params
  const byId = await User.findByPk(id)
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
exports.updateUser = async (req, res) => {

  const validationErrors = validationResult(req)

  if (!validationErrors.isEmpty()) {
    const err = new AppError("Validation error", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }

  const { id } = req.params
  
  const byId = await User.findByPk(id)

  if (!byId) {
   return next(new AppError("Bunday ID li Foydalanuvchi topilmadi"))
  }
  req.body.username.toLowerCase()
  const updatedUser = await byId.update(req.body)
  res.json({
    status: "success",
    message: "Foydalanuvchi ma'lumotlari tahrirlandi",
    data: {
      updatedUser
    }
  })
}
exports.deleteUser= async (req, res) => {
  const { id } = req.params
  const byId = await User.findByPk(id)

  if (!byId) {
   return next(new AppError("Bunday ID li Kurs topilmadi"))
  }

  await byId.destroy()

  res.status(201).json({
    status: "success",
    message: "User o'chirildi",
    data: null
  })
}