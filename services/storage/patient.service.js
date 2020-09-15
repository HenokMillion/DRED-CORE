const Patient = require('../../models/user/patient.model')
const mongoose = require('mongoose')

module.exports.editRecord = (patientId, info) => {
    return new Promise((succeed, fail) => {
        Patient.findOneAndUpdate({ patientId: patientId }, info, (err, res) => {
            if (err) {
                fail({
                    success: false,
                    error: err
                })
            } else {
                succeed({
                    success: true,
                    data: res
                })
            }
        })
    })
}

module.exports.deleteRecord = (patientId, meta) => {
    meta['diagnoses'] = []
    return new Promise((succeed, fail) => {
        Patient.findOneAndUpdate({ patientId: patientId },
            meta, (err, res) => {
                if (err) {
                    fail({
                        success: false,
                        error: err
                    })
                } else {
                    succeed({
                        success: true,
                        data: res
                    })
                }
            })
    })
}

module.exports.generateHistory = (patientId) => {
    return new Promise((succeed, fail) => {
        Patient.findOne({ patientId: patientId }, (err, res) => {
            if (err) {
                fail({
                    success: failse,
                    error: err
                })
            } else {
                succeed({
                    success: true,
                    data: res.diagnoses
                })
            }
        })
    })
}

module.exports.registerPatient = (patient) => {
    return new Promise((succeed, fail) => {
        Patient.create(patient)
            .then(data => succeed({
                success: true,
                data: data
            }))
            .catch(err => fail({
                success: false,
                error: err
            }))
    })
}

module.exports.saveDiagnosis = (patientId, diagnosis) => {
    return new Promise((succeed, fail) => {
        Patient.findOneAndUpdate({ patientId: patientId }, {
            $push: { diagnoses: diagnosis }
        }, (err, res) => {
            if (err) {
                fail({
                    success: false,
                    error: err
                })
            } else {
                succeed({
                    success: true,
                    data: res
                })
            }
        })
    })
}

module.exports.getPatient = (patientId) => {
    return new Promise((succeed, fail) => {
        Patient.findOne({ patientId: patientId }, (err, res) => {
            if (err) {
                fail({
                    success: failse,
                    error: err
                })
            } else {
                delete res.password
                succeed({
                    success: true,
                    data: res
                })
            }
        })
    })
}