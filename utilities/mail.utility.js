const ejs = require('ejs')
const mailService = require('../services/comm/mail.service')
const reportTemplate = require('./mail_templates/report.template')

export const sendReport = (data) => {
    const html = ejs.render(reportTemplate, {
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
}