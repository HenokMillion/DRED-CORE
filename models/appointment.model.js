const mongoose = require('mongoose')
const Schema = mongoose.Schema

// set up a mongoose model
module.exports = mongoose.model('Appointment', new Schema({
    id: String,
    patientId: String,
    doctorId: String,
    dateCreated: Date,
    appointmentDate: Date
}))
