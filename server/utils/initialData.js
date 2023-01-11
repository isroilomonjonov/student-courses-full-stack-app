const { Op } = require("sequelize");
const User = require("../models/User");
const catchAsync = require("./catchAsync");


module.exports = catchAsync(async () => {
	const superAdminCount = await User.count();
	if (superAdminCount === 0) {
		const superAdminInfo ={
			firstName:"Isroil",
			lastName:"Omonjonov",
			username:"admin",
			email:"olimjonazizov10@gmail.com",
			password:"admin123",
			phoneNumber: "998908171355",
			vericationCode:null,
			vericationCodeByPhone:null,
			isVerified:true,
			role:"SUPER_ADMIN"
		 }
		const createdUser = await User.create(superAdminInfo);
	}
});
