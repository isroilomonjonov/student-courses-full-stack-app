const express = require('express');
const { body } = require("express-validator")
const router=express.Router()
// const upload = require("../utils/multer")
const studentController=require("../controllers/studentController")
router.get('/', studentController.getAllStudents)
.get('/:id', studentController.getById)
.post('/',studentController.createStudent)
.patch('/:id', studentController.updateStudent)
.delete('/:id', studentController.deleteStudent)
module.exports = router;