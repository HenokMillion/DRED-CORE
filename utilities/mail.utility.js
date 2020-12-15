const ejs = require('ejs')
const mailService = require('../services/comm/mail.service')
const fs = require('fs')

module.exports.sendReport = (data) => {
    console.log('DATA: ', data)
    var template = fs.readFileSync(__dirname + '/mail_templates/report.template.ejs', 'utf-8');
    return new Promise((succeed, fail) => {
        const html = ejs.render(template, {
            diagnosis: data.diagnosis,
            doctor: data.doctor,
            patient: data.patient
        })
        fs.writeFileSync('mail.html', html)
        mailService.sendMail({
            from: 'henokmillionmekuria@gmail.com',
            to: 'henokmillionmekuria@gmail.com',
            subject: 'New Diabetic Retinopathy Diagnosis',
            html: html,
            attachements: data.attachement
        })
            .then(resp => succeed(true))
            .catch(err => succeed(false))
    })
}

module.exports.notifyPatient = (data) => {

}