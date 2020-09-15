const patientService = require('../services/storage/patient.service')
module.exports.getPatient = (req, res, next) => {
    const { patientId } = req.params
    const valid = !!patientId
    if (!valid) {
        return res.status(400).json({
            status: 400,
            success: false,
            error: "Bad Request"
        })
    }
    patientService.getPatient(patientId)
        .then(resp => res.status(200).json(resp))
        .catch(err => res.status(500).json(err))
}

module.exports.registerPatient = (req, res, next) => {
    const {
        patientId,
        firstName,
        lastName,
        birthDate,
        gender,
        profilePicPath,
        email,
        phone,
        fileNumber,
        address } = req.body
    const valid = !!patientId && !!firstName && !!lastName && !!birthDate && !!gender &&
            !!phone && !!fileNumber && !!profilePicPath && !!email && !!address
    if (!valid) {
        return res.status(400).json({
            status: 400,
            success: false,
            error: "Bad Request"
        })
    }
    patientService.registerPatient({
        'patientId': patientId.trim(),
        'firstName': firstName.trim(),
        'lastName': lastName.trim(),
        'birthDate': birthDate,
        'gender': gender,
        'profilePicPath': profilePicPath,
        'email': email,
        'phone': phone.trim(),
        'address': address.trim(),
        'fileNumber': fileNumber
    })
        .then(resp => res.status(200).json(resp))
        .catch(err => res.status(500).json(err))
}

module.exports.generateHistory = (req, res, next) => {
    const { patientId } = req.params
    const valid = !!patientId
    if (!valid) {
        return res.status(400).json({
            status: 400,
            success: false,
            error: "Bad Request"
        })
    }
    patientService.generateHistory(patientId)
        .then(resp => res.status(200).json(resp))
        .catch(err => res.status(500).json(err))
}

module.exports.saveDiagnosis = (req, res, next) => {
    const { patientId } = req.params
    const { diagnosis } = req.body
    const valid = !!patientId && !!diagnosis
    if (!valid) {
        return res.status(400).json({
            status: 400,
            success: false,
            error: "Bad Request"
        })
    }
    patientService.saveDiagnosis(patientId, diagnosis)
        .then(resp => res.status(200).json(resp))
        .catch(err => res.status(500).json(err))
}

module.exports.editRecord = (req, res, next) => {
    const { patientId } = req.params
    const { info } = req.body
    const valid = !!patientId && !!info
    if (!valid) {
        return res.status(400).json({
            status: 400,
            success: false,
            error: "Bad Request"
        })
    }
    patientService.editRecord(patientId, info)
        .then(resp => res.status(200).json(resp))
        .catch(err => res.status(500).json(err))
}

module.exports.deleteRecord = (req, res, next) => {
    const { patientId } = req.params
    const { meta } = req.body
    const valid = !!patientId && !!meta
    if (!valid) {
        return res.status(400).json({
            status: 400,
            success: false,
            error: "Bad Request"
        })
    }
    patientService.deleteRecord(patientId, meta)
        .then(resp => res.status(200).json(resp))
        .catch(err => res.status(500).json(err))
}

