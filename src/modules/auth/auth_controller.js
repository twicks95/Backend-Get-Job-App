const helper = require('../../helpers/wrapper')
const bcrypt = require('bcrypt')
const authModel = require('./auth_model')
const jwt = require('jsonwebtoken')
// const nodemailer = require('nodemailer')
require('dotenv').config()

module.exports = {
  registerWorker: async (req, res) => {
    try {
      const { workerName, workerEmail, workerPhone, workerPassword } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(workerPassword, salt)
      const setData = {
        worker_name: workerName,
        worker_email: workerEmail,
        worker_phone: workerPhone,
        worker_password: encryptPassword
      }
      const getDataConditions = await authModel.getWorkerDataConditions({
        worker_email: workerEmail
      })
      // kondisi cek email
      if (getDataConditions.length <= 0) {
        // kalo tidak terdaftar
        // const transporter = nodemailer.createTransport({
        //   host: 'smtp.gmail.com',
        //   port: 587,
        //   secure: false, // true for 465, false for other ports
        //   auth: {
        //     user: process.env.SMTP_EMAIL, // generated ethereal user
        //     pass: process.env.SMTP_PASSWORD // generated ethereal password
        //   }
        // })
        const result = await authModel.registerWorker(setData)
        delete result.worker_password
        return helper.response(res, 200, 'Success Verification Email', result)
        // delete result.worker_password
        //   const mailOptions = {
        //     from: '"Jobshall" <jobshallproject@gmail.com>', // sender address
        //     to: workerEmail, // list of receivers
        //     subject: 'Job Shall - Activation Email', // Subject line
        //     html: `<b> Ga ada isinya </b>
        // </form>` // html body
        //   }

        // await transporter.sendMail(mailOptions, function (error, info) {
        //   if (error) {
        //     console.log(error)
        //     return helper.response(res, 400, 'Email not send !')
        //   } else {
        //     console.log('Email sent:' + info.response)
        //     return helper.response(res, 200, 'Check Your Email', result)
        //   }
        // })
      } else {
        // kalo email sudah terdaftar
        return helper.response(res, 404, `${workerEmail} Registered`)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  registerRecruiter: async (req, res) => {
    try {
      const {
        recruiterName,
        recruiterEmail,
        recruiterCompany,
        recruiterFieldCompany,
        recruiterPhone,
        recruiterPassword
      } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(recruiterPassword, salt)
      const setData = {
        recruiter_name: recruiterName,
        recruiter_email: recruiterEmail,
        recruiter_company: recruiterCompany,
        recruiter_field_company: recruiterFieldCompany,
        recruiter_phone: recruiterPhone,
        recruiter_password: encryptPassword
      }
      const getDataConditions = await authModel.getRecruiterDataConditions({
        recruiter_email: recruiterEmail
      })
      // kondisi cek email
      if (getDataConditions.length <= 0) {
        // kalau tidak terdafatar
        const result = await authModel.registerRecruiter(setData)
        delete result.recruiter_password
        return helper.response(res, 200, 'Success Verification Email', result)
      } else {
        // kalo email sudah terdaftar
        return helper.response(res, 404, `${recruiterEmail} Registered`)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  login: async (req, res) => {
    try {
      const { Email, Password } = req.body
      const checkEmailWorker = await authModel.getWorkerDataConditions({
        worker_email: Email
      })
      const checkEmailRecruiter = await authModel.getRecruiterDataConditions({
        recruiter_email: Email
      })
      // proses 1. pengecekan apakah email ada di database atau tidak
      if (checkEmailWorker.length > 0) {
        // proses 2. pengecekkan password apakah password yg dimaasukkan sesuai atau tidak
        const checkPasswordWorker = bcrypt.compareSync(
          Password,
          checkEmailWorker[0].worker_password
        )
        console.log(Password)
        // if (checkPassword) {
        //   const payload = checkEmailWorker[0]
        //   delete payload.worker_password
        //   const token = jwt.sign({ ...payload }, 'RAHASIA', {
        //     expiresIn: '48h'
        //   })
        //   const result = { ...payload, token }
        //   return helper.response(res, 200, 'Succes login !', result)
        // } else {
        //   return helper.response(res, 404, 'Wrong password')
        // }
      } else {
        return helper.response(res, 404, 'Email / Account not registed')
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
