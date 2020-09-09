const router = require('express').Router()
const apiRoute = require('./api.route')

router.use('/v1', apiRoute)



module.exports = router