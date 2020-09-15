const router = require('express').Router()
const patientController = require('../controllers/patient.controller')

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


module.exports = router