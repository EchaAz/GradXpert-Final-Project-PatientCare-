const express = require('express');
const router = express.Router();
const { authorizeUser } = require('../authmiddleware');
const appointmentsController = require('../controllers/appointments');

router.route('/').post(authorizeUser, appointmentsController.createAppointment)
router.route('/:id').get(appointmentsController.getAppointmentById)
.delete(authorizeUser, appointmentsController.deleteAppointmentById).patch(authorizeUser, appointmentsController.updateAppointment)

module.exports = router;