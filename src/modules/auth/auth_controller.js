const helper = require('../../helpers/wrapper')
const bcrypt = require('bcrypt')
const authModel = require('./auth_model')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
require('dotenv').config()
const { sendMail } = require('../../helpers/send_email')

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
        worker_password: encryptPassword,
        role: 'worker'
      }
      const getDataConditions = await authModel.getWorkerDataConditions({
        worker_email: workerEmail
      })
      // kondisi cek email
      if (getDataConditions.length <= 0) {
        // kalo tidak terdaftar
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.SMTP_EMAIL, // generated ethereal user
            pass: process.env.SMTP_PASSWORD // generated ethereal password
          }
        })
        const result = await authModel.registerWorker(setData)
        delete result.worker_password
        const mailOptions = {
          from: '"Jobshall" <jobshallproject@gmail.com>', // sender address
          to: workerEmail, // list of receivers
          subject: 'Job Shall - Activation Email', // Subject line
          html: `<b>Click Here to activate </b><form action='http://localhost:3001/api/v1/auth/patch/worker/${result.id}' method="post">
          <button type="submit" name="your_name" value="your_value">Go</button>
      </form>` // html body
        }

        await transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            return helper.response(res, 400, 'Email not send !')
          } else {
            console.log('Email sent:' + info.response)
            return helper.response(res, 200, 'Check Your Email', result)
          }
        })
      } else {
        // kalo email sudah terdaftar
        return helper.response(res, 404, `${workerEmail} Email Registered`)
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
        recruiter_password: encryptPassword,
        role: 'recruiter'
      }
      const getDataConditions = await authModel.getRecruiterDataConditions({
        recruiter_email: recruiterEmail
      })
      // kondisi cek email
      if (getDataConditions.length <= 0) {
        // kalau tidak terdafatar
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.SMTP_EMAIL, // generated ethereal user
            pass: process.env.SMTP_PASSWORD // generated ethereal password
          }
        })
        const result = await authModel.registerRecruiter(setData)
        delete result.recruiter_password
        const mailOptions = {
          from: '"Jobshall" <jobshallproject@gmail.com>', // sender address
          to: recruiterEmail, // list of receivers
          subject: 'Job Shall - Activation Email', // Subject line
          html: `<b>Click Here to activate </b><form action='http://localhost:3001/api/v1/auth/patch/recruiter/${result.id}' method="post">
          <button type="submit" name="your_name" value="your_value">Go</button>
      </form>` // html body
        }

        await transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            return helper.response(res, 400, 'Email not send !')
          } else {
            console.log('Email sent:' + info.response)
            return helper.response(res, 200, 'Check Your Email', result)
          }
        })
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
        const checkPasswordWorker = bcrypt.compareSync(
          Password,
          checkEmailWorker[0].worker_password
        )
        // proses 2. pengecekkan password apakah password yg dimaasukkan sesuai atau tidak
        if (checkPasswordWorker) {
          const payload = checkEmailWorker[0]
          delete payload.worker_password
          const token = jwt.sign({ ...payload }, 'RAHASIA', {
            expiresIn: '48h'
          })
          const result = { ...payload, token }
          return helper.response(res, 200, 'Succes login !', result)
        } else {
          // kalau pasword salah
          return helper.response(res, 404, 'Wrong password')
        }
      } else if (checkEmailRecruiter.length > 0) {
        const checkPasswordRecruiter = bcrypt.compareSync(
          Password,
          checkEmailRecruiter[0].recruiter_password
        )
        // proses 2. pengecekkan password apakah password yg dimaasukkan sesuai atau tidak
        if (checkPasswordRecruiter) {
          const payload = checkEmailRecruiter[0]
          delete payload.recruiter_password
          const token = jwt.sign({ ...payload }, 'RAHASIA', {
            expiresIn: '48h'
          })
          const result = { ...payload, token }
          return helper.response(res, 200, 'Succes login !', result)
        } else {
          // kalau pasword salah
          return helper.response(res, 404, 'Wrong password')
        }
      } else {
        // kalau email belum terregistrasi
        return helper.response(res, 404, 'Email / Account is not registered')
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  verificationWorker: async (req, res) => {
    try {
      const { id } = req.params
      const workerId = `worker_id = ${id}`
      const setData = 'worker_verfication = 1'
      const table = 'workers'
      const checkIdWorker = await authModel.getWorkerDataConditions({
        worker_id: id
      })
      const result = await authModel.verfication(table, setData, workerId)
      console.log(result)
      if (checkIdWorker.length > 0) {
        return helper.response(res, 200, `Succes verification worker id: ${id}`)
      } else {
        return helper.response(res, 404, `Data By Id ${id} Not Found`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  verificationRecruiter: async (req, res) => {
    try {
      const { id } = req.params
      const recruiterId = `recruiter_id = ${id}`
      const setData = 'recruiter_verfication = 1'
      const table = 'recruiters'
      const checkIdRecruiter = await authModel.getRecruiterDataConditions({
        recruiter_id: id
      })
      await authModel.verfication(table, setData, recruiterId)
      if (checkIdRecruiter.length > 0) {
        return helper.response(
          res,
          200,
          `Succes verification recruiter id: ${id}`
        )
      } else {
        return helper.response(res, 404, `Data By Id ${id} Not Found`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  sendEmailResetPassword: async (req, res) => {
    try {
      const { userEmail } = req.body
      const checkDataWorker = await authModel.getWorkerDataConditions({
        worker_email: userEmail
      })
      const checkRecruiterData = await authModel.getRecruiterDataConditions({
        recruiter_email: userEmail
      })
      if (checkDataWorker.length > 0) {
        const emailWorker = checkDataWorker[0].worker_email
        sendMail(
          'Reset Password',
          'https://jobshall.netlify.app/req-pass',
          emailWorker
        )
        return helper.response(res, 200, 'Check your email')
      } else if (checkRecruiterData.length > 0) {
        const emailRecruiter = checkRecruiterData[0].recruiter_email
        sendMail(
          'Reset Password',
          'https://jobshall.netlify.app/req-pass',
          emailRecruiter
        )
        return helper.response(res, 200, 'Check your email')
      } else {
        return helper.response(
          res,
          404,
          `Data By Email: ${userEmail} Not Found`,
          null
        )
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  confimNewPassword: async (req, res) => {
    try {
      const { newPassword, confirmNewPassword, userEmail } = req.body
      const checkDataWorker = await authModel.getWorkerDataConditions({
        worker_email: userEmail
      })
      const checkRecruiterData = await authModel.getRecruiterDataConditions({
        recruiter_email: userEmail
      })

      if (checkDataWorker.length > 0) {
        if (newPassword === confirmNewPassword) {
          const salt = bcrypt.genSaltSync(10)
          const encryptPassword = bcrypt.hashSync(newPassword, salt)

          await authModel.resetPassword(
            'workers',
            { worker_password: encryptPassword },
            `worker_id = ${checkDataWorker[0].worker_id}`
          )
          return helper.response(res, 200, 'Berhasil ganti password')
        } else {
          return helper.response(
            res,
            402,
            'Password dan konfirmasi password tidak sama',
            null
          )
        }
      } else if (checkRecruiterData.length > 0) {
        if (newPassword === confirmNewPassword) {
          const salt = bcrypt.genSaltSync(10)
          const encryptPassword = bcrypt.hashSync(newPassword, salt)

          await authModel.resetPassword(
            'recruiters',
            { recruiter_password: encryptPassword },
            `recruiter_id = ${checkRecruiterData[0].recruiter_id}`
          )
          return helper.response(res, 200, 'Berhasil ganti password')
        } else {
          return helper.response(
            res,
            402,
            'Password dan konfirmasi password tidak sama',
            null
          )
        }
      } else {
        return helper.response(
          res,
          404,
          `Data By email ${userEmail} Not Found`,
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
