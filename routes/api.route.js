const router = require('express').Router()
const patientController = require('../controllers/patient.controller')
const appointmentController = require('../controllers/appointment.controller')

router.route('/patient/:patientId')
    .get(patientController.getPatient)
router.route('/patient/register')
    .post(patientController.registerPatient)
router.route('/patient/:patientId/history')
    .get(patientController.generateHistory)
router.route('/patient/:patientId/saveDiagnosis')
    .post(patientController.saveDiagnosis)
router.route('/patient/:patientId/edit')
    .post(patientController.editRecord)
router.route('/patient/:patientId/delete')
    .post(patientController.deleteRecord)



router.route('/appointment/calendar/:doctorId/:patientId')
    .get(appointmentController.showCalendar)
router.route('/appointment/new')
    .post(appointmentController.createAppointment)
router.route('/appointment/edit/:appointmentId')
    .put(appointmentController.editAppointment)
router.route('/appointment/delete/:appointmentId')
    .delete(appointmentController.deleteAppointment)

module.exports = router