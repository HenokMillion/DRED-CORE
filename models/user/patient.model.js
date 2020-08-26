const mongoose = require('mongoose')
const Schema = mongoose.Schema

// set up a mongoose model
module.exports = mongoose.model('Patient', new Schema({
    id: String,
    patientID: String,
    firstName: String,
    lastName: String,
    birthDate: String,
    profilePicPath: String,
    phone: String,
    fileNumber: String,
    appointments: Array,
    diagnoses: Array,
    status: Number,
    lastDiagnosed: Date
}))
