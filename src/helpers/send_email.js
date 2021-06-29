const nodemailer = require('nodemailer')
require('dotenv').config()

module.exports = {
  sendMail: (msg, url, userEmailAddress) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
      }
    })

    const mailOptions = {
      from: '"Jobshall" <jobshallproject@gmail.com>',
      to: userEmailAddress,
      subject: `Jobshall - ${msg}`,
      html: `<b>Click Here to reset passowrd</b> <a href=${url}>Click !</>`
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })
  }
}
