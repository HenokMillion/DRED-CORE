const router = require('express').Router()
const patientController = require('../controllers/patient.controller')

router.route('/patient')
    .get(patientController.getPatient)


module.exports = router