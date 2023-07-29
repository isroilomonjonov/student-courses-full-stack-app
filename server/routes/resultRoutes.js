const express = require('express');
const router=express.Router()
const resultController = require('../controllers/resultController');
const roleMiddleware = require('../middleware/roleMiddleware');
router.get('/',resultController.getAllResults)
.get('/:id',resultController.getAllResultsByCourseId)
.post('/',resultController.createEnrollment)
.delete("/:id",resultController.deleteEntrollement)

module.exports = router;