const express = require('express');
const { body } = require("express-validator")
const router=express.Router()
const courseController=require("../controllers/courseController");
const roleMiddleware = require('../middleware/roleMiddleware');
router.get('/', courseController.getAllCourses)
.get('/all', courseController.getAllCoursesStatusTrue)
.get('/:id', courseController.getById)
.post('/',roleMiddleware(["SUPER_ADMIN","ADMIN"]), body("name").notEmpty().withMessage("Nom bo'sh bo'lishi mumkin emas"), body("description").notEmpty(), courseController.createCourse)
.patch('/:id',roleMiddleware(["SUPER_ADMIN","ADMIN"]),body("name").notEmpty().withMessage("Nom bo'sh bo'lishi mumkin emas"), body("description").notEmpty(), courseController.updateCourse)
.put('/:id',roleMiddleware(["SUPER_ADMIN","ADMIN"]), courseController.updateCourseStatus)
.delete('/:id',roleMiddleware(["SUPER_ADMIN","ADMIN"]), courseController.deleteProduct)
module.exports = router;