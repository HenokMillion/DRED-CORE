const Patient = require('../../models/user/patient.model')
const Diagnosis = require('../../models/diagnosis.model')
const mongoose = require('mongoose')
const mailUtility = require('.././../utilities/mail.utility')

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
                const diagnosisIds = res.diagnoses.map(diagnosis => diagnosis.diagnosisId)
                console.log(diagnosisIds)
                Diagnosis.find({
                    diagnosisId: { $in: diagnosisIds }
                }, (err, res) => {
                    succeed({
                        success: true,
                        data: res
                    })
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
                delete res._id
                delete res.__v
                
                const diagnosisIds = res.diagnoses.map(diagnosis => diagnosis.diagnosisId)
                console.log(diagnosisIds)
                Diagnosis.find({
                    diagnosisId: { $in: diagnosisIds }
                }, (err, _res) => {
                    res.diagnoses = _res
                    succeed({
                        success: true,
                        data: res
                    })
                })
            }
        })
    })
}

module.exports.sendReport = (id, report) => {
    return new Promise((succeed, fail) => {
        Patient.findByIdAndUpdate(id, {
            $push: { reports: report }
        }, (err, doc) => {
            if (err) {
                fail({ status: 500, success: false, error: "Something went wrong" })
            } else {
                mailUtility.sendReport(report)
                    .then(resp => succeed({ status: 200, success: true, msg: resp }))
                    .catch(err => fail({ status: 500, success: false, error: err }))
            }
        })
    })
}