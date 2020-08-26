const Doctor = require('../../models/user/doctor.model')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


export const editInfo = (id, info) => {
    return new Promise((succeed, fail) => {
        Doctor.findByIdAndUpdate(id, info, (err, res) => {
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

export const changePassword = async (email = null, username = null, oldPassword, newPassword) => {
    return new Promise((succeed, fail) => {
        const doctor = await Doctor.findOne({ $or: [{ email: email }, { username: username }] })
        if (doctor) {
            const isPassworCorrect = bcrypt.compareSync(oldPassword, doctor.password)
            if (isPassworCorrect) {
                doctor.update({
                    password: bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10))
                }, (err, res) => {
                    if (err) {
                        fail({ status: 500, success: false, error: "Something went wrong" })
                    } else {
                        succeed({ status: 201, success: true, data: res })
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