const mongoose = require('mongoose')
const Schema = mongoose.Schema

// set up a mongoose model
module.exports = mongoose.model('Diagnosis', new Schema({
    diagnosisId: String,
    imagePath: String,
    severity: Number,
    doctorId: String,
    patientId: String,
    diagnosis_date: Date,
    label: Number,
    comment: String
}))
