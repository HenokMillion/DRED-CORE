const nodemailer = require('nodemailer')
export const sendMail = mail => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: '',
            pass: ''
        }
    });
    return transporter.sendMail(mail)
}