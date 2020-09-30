const Diagnosis = require('../../models/diagnosis.model')
const mongoose = require('mongoose')

module.exports.diagnose = (imagePath) => {
}

module.exports.saveDiagnosis = (diagnosis) => {
    return new Promise((succeed, fail) => {
        Diagnosis.create(diagnosis)
        .then(data => succeed({
            status: 200,
            success: true,
            data: data
        }))
        .catch(err => fail({
            status: 500,
            success: false,
            error: err
        }))
    })
}

module.exports.editDiagnosis = (id, diagnosis) => {
    return new Promise((succeed, fail) => {
        Diagnosis.findByIdAndUpdate(id, diagnosis, (err, res) => {
            if (err) {
                fail({
                    status: 500,
                    success: false,
                    error: err
                })
            } else {
                if (!res) {
                    return fail({
                        status: 500,
                        success: false,
                        error: 'diagnosis not found'
                    })  
                }
                succeed({
                    status: 200,
                    success: true,
                    data: res
                })
            }
        })
    })
}

module.exports.deleteDiagnosis = (id) => {
    return new Promise((succeed, fail) => {
        Diagnosis.findByIdAndRemove(id, (err, data) => {
            if (err) {
                fail({
                    status: 500,
                    success: false,
                    error: err
                })
            } else {
                if (!data) {
                    return fail({
                        status: 500,
                        success: false,
                        error: 'diagnosis not found'
                    }) 
                }
                succeed({
                    status: 200,
                    success: true,
                    data: 'successfully removed diagnosis record'
                })
            }
        })
    })
}
