const jwt = require("jsonwebtoken")
const AppError = require("../utils/AppError")
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
   return next(new AppError("Unauthorized", 401))
  }
  const token = authHeader.slice(7)
  const user = jwt.verify(token, process.env.JWT_SECRET)
  if (!user) {
    return next(new AppError("Unauthorized", 401))
  }
  req.user = user
  next()
 }