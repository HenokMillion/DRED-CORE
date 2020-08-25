const mongoose = require('mongoose')
const Schema = mongoose.Schema

// set up a mongoose model
module.exports = mongoose.model('Doctor', new Schema({
    id: String,
    doctorId: String,
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    gender: String,
    birthDate: String,
    profilePicPath: String,
    phone: String,
    email: String,
    role: String,
    patients: Array,
    appointments: Array,
    canComment: Boolean,
    canLabel: Boolean
}))
