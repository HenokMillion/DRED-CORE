const ejs = require('ejs')
const mailService = require('../services/comm/mail.service')
const fs = require('fs')

module.exports.sendReport = (data) => {
    var template = fs.readFileSync(path.join(__dirname, './mail_templates/report.template'), 'utf-8');
    return new Promise((succeed, fail) => {
        const html = ejs.render(template, {
            diagnosis: data.diagnosis,
            doctor: data.doctor,
            patient: data.patient
        })
        mailService.sendMail({
            from: '',
            to: '',
            subject: '',
            body: html,
            attachements: data.attachements
        })
            .then(resp => succeed(true))
            .catch(err => succeed(false))
    })
}

module.exports.notifyPatient = (data) => {

}