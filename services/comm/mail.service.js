const nodemailer = require('nodemailer')
module.exports.sendMail = mail => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'henokmillionmekuria@gmail.com',
            pass: 'D@n781229@n781229'
        }
    });
    return transporter.sendMail(mail)
}