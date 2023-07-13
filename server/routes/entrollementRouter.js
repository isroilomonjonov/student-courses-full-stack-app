const express = require('express');
const router=express.Router()
const entrollerController = require('../controllers/enrollmentController')
router.get('/', entrollerController.getAllEnrollment)
.get('/:id', entrollerController.getAllEnrollmentByCourseId)
.post('/',entrollerController.createEnrollment)
.delete("/:id",entrollerController.deleteEntrollement)

module.exports = router;