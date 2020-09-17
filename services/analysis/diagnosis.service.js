const Diagnosis = require('../../models/diagnosis.model')
const mongoose = require('mongoose')

export const diagnose = (imagePath) => {
}

export const saveDiagnosis = (diagnosis) => {
    return new Promise((succeed, fail) => {
        Diagnosis.create(diagnosis)
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

export const editDiagnosis = (id, diagnosis) => {
    return new Promise((succeed, fail) => {
        Diagnosis.findByIdAndUpdate(id, diagnosis, (err, res) => {
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

export const deleteDiagnosis = (id) => {
    return new Promise((succeed, fail) => {
        patientModel.findByIdAndRemove(id, (err, res) => {
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
