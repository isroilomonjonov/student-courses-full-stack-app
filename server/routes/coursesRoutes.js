const express = require('express');
const { body } = require("express-validator")
const router=express.Router()
const courseController=require("../controllers/courseController")
router.get('/', courseController.getAllCourses)
.get('/all', courseController.getAllCoursesStatusTrue)
.get('/:id', courseController.getById)
.post('/', body("name").notEmpty().withMessage("Nom bo'sh bo'lishi mumkin emas"), body("description").notEmpty(), courseController.createCourse)
.patch('/:id',body("name").notEmpty().withMessage("Nom bo'sh bo'lishi mumkin emas"), body("description").notEmpty(), courseController.updateCourse)
.put('/:id', courseController.updateCourseStatus)
.delete('/:id', courseController.deleteProduct).get("/:id/students",courseController.byIdStudetns)
module.exports = router;