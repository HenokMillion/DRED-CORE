const Appointment = require('../../models/appointment.model')
const mongoose = require('mongoose')

module.exports.showCalendar = (doctorId, patientId) => {
    return new Promise((succeed, fail) => {
        Appointment.find({
            doctorId: doctorId,
            patientId: patientId
        })
        .then(data => succeed({
            success: true,
            status: 200,
            data: data
        }))
        .catch(err => fail({
            status: 500,
            success: false,
            error: err
        }))    })
}

module.exports.createAppointment = (doctorId, patientId, appointmentDate) => {
    return new Promise((succeed, fail) => {
        Appointment.create({
            doctorId: doctorId,
            patientId: patientId,
            appointmentDate: appointmentDate
        })
            .then(data => succeed({
                success: true,
                data: data,
                status: 201
            }))
            .catch(err => fail({
                status: 500,
                success: false,
                error: err
            }))
    })
}

module.exports.editAppointment = (appointmentId, newAppointment) => {
    return new Promise((succeed, fail) => {
        Appointment.findByIdAndUpdate(appointmentId, newAppointment, (err, res) => {
            if (err) {
                fail({
                    status: 500,
                    success: false,
                    error: err
                })
            } else {
                succeed({
                    status: 200,
                    success: true
                })
            }
        })
    })
}

module.exports.deleteAppointment = (appointmentId) => {
    return new Promise((succeed, fail) => {
        Appointment.findByIdAndRemove(id, (err, res) => {
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
