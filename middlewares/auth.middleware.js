const jwt = require('jsonwebtoken')
const Doctor = require('../models/user/doctor.model')

module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(403).json({ status: 403, success: false, error: 'Forbidden' })
    } else {
        if (!jwt.verify(req.headers.authorization, 'SECRET')) {
            console.log('NOT VERIFIED')
            res.status(403).json({ status: 403, success: false, error: 'Forbidden' })
        } else {
            const decodedToken = jwt.decode(req.headers.authorization)
            Doctor.findOne({
                // email: decodedToken.email,
                firstName: decodedToken.firstName,
                lastName: decodedToken.lastName,
                role: decodedToken.role,
                // appointments: decodedToken.appointments,
                canComment: decodedToken.canComment,
                canLabel: decodedToken.canLabel,
                // profilePicPath: decodedToken.profilePicPath,
                // patients: decodedToken.patients
            }, (err, data) => {
                if (err) {
                    res.status(500).json({ status: 500, success: false, error: 'Something went wrong' })
                } else {
                    if (!data) {
                        res.status(403).json({ status: 403, success: false, error: 'Forbidden' })
                    } else {
                        next()
                    }
                }
            })
        }
    }
}