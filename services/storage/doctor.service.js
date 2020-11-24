const Doctor = require('../../models/user/doctor.model')
const Patient = require('../../models/user/patient.model')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

module.exports.editInfo = (id, info) => {
    return new Promise((succeed, fail) => {
        Doctor.findByIdAndUpdate(id, info, (err, res) => {
            if (err) {
                fail({
                    status: 500,
                    success: false,
                    error: err
                })
            } else {
                succeed({
                    status: 200,
                    success: true,
                    data: res
                })
            }
        })
    })
}

module.exports.changePassword = (email = null, username = null, oldPassword, newPassword) => {
    return new Promise(async (succeed, fail) => {
        const doctor = await Doctor.findOne({ $or: [{ email: email }, { username: username }] })
        if (doctor) {
            console.log(doctor)
            const isPassworCorrect = bcrypt.compareSync(oldPassword, doctor.password)
            if (isPassworCorrect) {
                doctor.update({
                    password: bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10))
                }, (err, res) => {
                    if (err) {
                        fail({ status: 500, success: false, error: "Something went wrong" })
                    } else {
                        succeed({ status: 201, success: true, data: 'Password changed successfully' })
                    }
                })
            } else {
                fail({ status: 401, success: false, error: "Unauthorized" })
            }
        } else {
            fail({ status: 401, success: false, error: "Unauthorized" })
        }
    })
}

// might not be in the document(s)
module.exports.registerDoctor = (doctor) => {
    if (doctor.password) {
        doctor.password = bcrypt.hashSync(doctor.password, bcrypt.genSaltSync(10))
    }
    return new Promise((succeed, fail) => {
        Doctor.create(doctor)
            .then(data => succeed({
                status: 201,
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
