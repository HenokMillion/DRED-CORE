const doctorService = require('../services/storage/doctor.service')

module.exports.registerDoctor = (req, res, next) => {
    const { doctor } = req.body
    const valid = doctor
    if (!valid) {
        return res.status(400).json({
            status: 400,
            success: false,
            error: "Bad Request"
        })
    }
    doctorService.registerDoctor(doctor)
        .then(resp => res.status(resp.status).json(resp))
        .catch(err => res.status(err.status).json(err))
}

module.exports.changePassword = (req, res, next) => {
    const { email, username, oldPassword, newPassword } = req.body
    const valid = (email || username) && oldPassword && newPassword
    if (!valid) {
        return res.status(400).json({
            status: 400,
            success: false,
            error: "Bad Request"
        })
    }
    doctorService.changePassword(email, username, oldPassword, newPassword)
        .then(resp => res.status(resp.status).json(resp))
        .catch(err => res.status(err.status).json(err))
}

module.exports.editInfo = (req, res, next) => {
    const { doctorId } = req.params
    const { info } = req.body
    const valid = doctorId
    if (!valid) {
        return res.status(400).json({
            status: 400,
            success: false,
            error: "Bad Request"
        })
    }
    doctorService.editInfo(doctorId, info)
        .then(resp => res.status(resp.status).json(resp))
        .catch(err => res.status(err.status).json(err))
}

module.exports.listAppointments = (req, res, next) => {
    const { doctorId } = req.params
    if (!doctorId) {
        return res.status(400).json({
            status: 400,
            success: false,
            error: "Bad Request"
        })
    }
    return doctorService.listAppointments(doctorId)
        .then(resp => res.status(resp.status).json(resp))
        .catch(err => res.status(err.status).json(err))
}
