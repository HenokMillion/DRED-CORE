const Patient = require('../../models/user/patient.model')
const mongoose = require('mongoose')

export const editRecord = (id, info) => {
    return new Promise((succeed, fail) => {
        Patient.findByIdAndUpdate(id, info, (err, res) => {
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

export const deleteRecord = (id, meta) => {
    meta['diagnoses'] = []
    return new Promise((succeed, fail) => {
        Patient.findByIdAndUpdate(id, meta, (err, res) => {
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

export const generateHistory = (id) => {
    return new Promise((succeed, fail) => {
        Patient.findById(id, (err, res) => {
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

export const registerPatient = (patient) => {
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

export const saveDiagnosis = (id, diagnosis) => {
    return new Promise((succeed, fail) => {
        Patient.findByIdAndUpdate(id, {
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
