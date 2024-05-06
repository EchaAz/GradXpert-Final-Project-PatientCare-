const express = require('express');
const router = express.Router();
const doctorsController = require('../controllers/doctors');

router.get('/', doctorsController.getAllDoctors);
router.get('/:id', doctorsController.getDoctorById);

module.exports = router;