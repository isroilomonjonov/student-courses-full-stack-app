const express = require('express');
const router=express.Router()
const entrollerController = require('../controllers/enrollmentController');
const roleMiddleware = require('../middleware/roleMiddleware');
router.get('/',roleMiddleware(["SUPER_ADMIN","ADMIN"]), entrollerController.getAllEnrollment)
.get('/:id', entrollerController.getAllEnrollmentByCourseId)
.post('/',roleMiddleware(["SUPER_ADMIN","ADMIN"]),entrollerController.createEnrollment)
.delete("/:id",roleMiddleware(["SUPER_ADMIN","ADMIN"]),entrollerController.deleteEntrollement)

module.exports = router;