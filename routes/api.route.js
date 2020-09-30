const router = require('express').Router()
const patientController = require('../controllers/patient.controller')
const doctorController = require('../controllers/doctor.controller')
const appointmentController = require('../controllers/appointment.controller')
const diagnosisController = require('../controllers/diagnosis.controller')
const authController = require('../controllers/auth.controller')

// patient
router.route('/patient/:patientId')
    .get(patientController.getPatient)
router.route('/patient/register')
    .post(patientController.registerPatient)
router.route('/patient/history/:patientId')
    .get(patientController.generateHistory)
router.route('/patient/saveDiagnosis/:patientId')
    .post(patientController.saveDiagnosis)
router.route('/patient/edit/:patientId')
    .post(patientController.editRecord)
router.route('/patient/delete/:patientId')
    .post(patientController.deleteRecord)

// appointment
router.route('/appointment/calendar/:doctorId/:patientId')
    .get(appointmentController.showCalendar)
router.route('/appointment/new')
    .post(appointmentController.createAppointment)
router.route('/appointment/edit/:appointmentId')
    .put(appointmentController.editAppointment)
router.route('/appointment/delete/:appointmentId')
    .delete(appointmentController.deleteAppointment)

// diagnosis
router.route('/diagnosis/new')
    .post(diagnosisController.saveDiagnosis)
router.route('/diagnosis/edit/:diagnosisId')
    .put(diagnosisController.editDiagnosis)
router.route('/diagnosis/delete/:diagnosisId')
    .delete(diagnosisController.deleteDiagnosis)

// diagnosis
router.route('/doctor/register')
    .post(doctorController.registerDoctor)
router.route('/doctor/changePassword')
    .put(doctorController.changePassword)
router.route('/doctor/edit/:doctorId')
    .put(doctorController.editInfo)

// auth
router.route('/auth')
    .post(authController.authUser)

module.exports = router