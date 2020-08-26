const Doctor = require('../models/user/doctor.model')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

export const authUser = async (email = null, password = null, username = null) => {
    return new Promise((succeed, fail) => {
        const doctor = await Doctor.findOne({ $or: [{ 'email': email }, { 'username': username }] })
        if (doctor) {
            const isPassworCorrect = bcrypt.compareSync(password, doctor.password)
            if (isPassworCorrect) {
                const token = jwt.sign({
                    email: email,
                    firstName: doctor.firstName,
                    lastName: doctor.lastName,
                    role: doctor.role,
                    appointments: doctor.appointments,
                    canComment: doctor.canComment,
                    canLabel: doctor.canLabel,
                    profilePicPath: doctor.profilePicPath,
                    patients: doctor.patients
                })
                succeed({
                    success: true,
                    data: token
                })
            } else {
                fail({ status: 401, success: false, error: "Unauthorized" })
            }
        } else {
            fail({ status: 401, success: false, error: "Unauthorized" })
        }
    })
}