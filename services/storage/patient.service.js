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
