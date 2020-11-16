const authService = require('../services/auth.service')

module.exports.authUser = (req, res, next) => {
    const { email, username, password } = req.body
    console.log(req.body)
    const valid = (email || username) && password
    if (!valid) {
        return res.status(400).json({
            status: 400,
            success: false,
            error: "Bad Request"
        })
    }
    authService.authUser(email, password, username)
        .then(resp => res.status(resp.status).json(resp))
        .catch(err => res.status(err.status).json(err))
}