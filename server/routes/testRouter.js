const express = require('express');
const router=express.Router()
const testController = require('../controllers/testController')
router.get('/', testController.getAllTests)
.post('/',testController.createTests)
.delete("/:id",testController.deleteTest)
.get("/:id",testController.getById)
.put("/:id",testController.updateTestStatus)
.patch("/:id",testController.updateTest)


module.exports = router;