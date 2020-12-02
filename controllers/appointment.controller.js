const appointmentService = require('../services/event_management/appointment.service')

module.exports.showCalendar = (req, res, next) => {
    const { patientId, doctorId } = req.params
    const valid = patientId && doctorId
    if (!valid) {
        return res.status(400).json({
            status: 400,
            success: false,
            error: "Bad Request"
        })
    }
    appointmentService.showCalendar(doctorId, patientId)
        .then(resp => res.status(200).json(resp))
        .catch(err => res.status(500).json(err))
}

module.exports.createAppointment = (req, res, next) => {
    let { patientId, doctorId, appointmentDate } = req.body
    const valid = patientId && doctorId && appointmentDate
    appointmentDate = new Date(appointmentDate).setHours(new Date().getHours())
    if (!valid) {
        return res.status(400).json({
            status: 400,
            success: false,
            error: "Bad Request"
        })
    }
    appointmentService.createAppointment(doctorId, patientId, appointmentDate)
        .then(resp => res.status(200).json(resp))
        .catch(err => res.status(500).json(err))
}

module.exports.editAppointment = (req, res, next) => {
    const { appointmentId } = req.params
    const { newAppointment } = req.body
    const valid = appointmentId && newAppointment
    if (!valid) {
        return res.status(400).json({
            status: 400,
            success: false,
            error: "Bad Request"
        })
    }
    appointmentService.editAppointment(appointmentId, newAppointment)
        .then(resp => res.status(200).json(resp))
        .catch(err => res.status(500).json(err))
}

module.exports.deleteAppointment = (req, res, next) => {
    const { appointmentId } = req.params
    const valid = appointmentId
    if (!valid) {
        return res.status(400).json({
            status: 400,
            success: false,
            error: "Bad Request"
        })
    }
    appointmentService.deleteAppointment(appointmentId)
        .then(resp => res.status(200).json(resp))
        .catch(err => res.status(500).json(err))
}
