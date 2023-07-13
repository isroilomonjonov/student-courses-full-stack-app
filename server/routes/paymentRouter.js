const express = require('express');
const router=express.Router()
const paymnetsController = require('../controllers/paymnetsController')
router.get('/', paymnetsController.getAllPayments)
.patch('/:id', paymnetsController.updatePayment)
.post('/',paymnetsController.createPayment)
.get('/:id', paymnetsController.getById)
module.exports = router;