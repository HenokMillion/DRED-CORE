const mongoose = require('mongoose')
const Schema = mongoose.Schema

// set up a mongoose model
module.exports = mongoose.model('User', new Schema({
    firstName: String,
    lastName: String,
    birthDate: String,
    profilePicPath: String,
    phone: String
}))
