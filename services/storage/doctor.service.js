const Doctor = require('../../models/user/doctor.model')
const mongoose = require('mongoose')


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