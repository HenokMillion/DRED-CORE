const Appointment = require('../../models/appointment.model')
const mongoose = require('mongoose')


export const showCalendar = (doctorId, patientId) => {
    return new Promise((succeed, fail) => {
        Appointment.find({
            doctorId: doctorId,
            patientId: patientId
        })
        .then(data => succeed({
            success: true,
            data: data
        }))
        .catch(err => fail({
            success: false,
            error: err
        }))    })
}

export const createAppointment = (doctorId, patientId, appointmentDate) => {
    return new Promise((succeed, fail) => {
        Appointment.create({
            doctorId: doctorId,
            patientId: patientId,
            appointmentDate: appointmentDate
        })
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

export const editAppointment = (appointmentId, newAppointment) => {
    return new Promise((succeed, fail) => {
        Appointment.findByIdAndUpdate(appointmentId, newAppointment, (err, res) => {
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

export const deleteAppointment = (appointmentId) => {
    return new Promise((succeed, fail) => {
        Appointment.findByIdAndRemove(id, (err, res) => {
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
