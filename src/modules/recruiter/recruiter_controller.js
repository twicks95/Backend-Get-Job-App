const helper = require('../../helpers/wrapper')
const recruiterModel = require('./recruiter_model')
const fs = require('fs')
const redis = require('redis')
const client = redis.createClient()
const nodemailer = require('nodemailer')
require('dotenv').config()
const bcrypt = require('bcrypt')

module.exports = {
  sendEmail: async (req, res) => {
    try {
      const { workerId } = req.query
      const { message, subject } = req.body
      const checkIdWorker = await recruiterModel.getWorkerById({
        worker_id: workerId
      })
      if (checkIdWorker.length > 0) {
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.SMTP_EMAIL, // generated ethereal user
            pass: process.env.SMTP_PASSWORD // generated ethereal password
          }
        })
        const mailOptions = {
          from: '"Jobshall" <jobshallproject@gmail.com>', // sender address
          to: checkIdWorker[0].worker_email, // list of receivers
          subject: subject, // Subject line
          html: message // html body
        }
        await transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error)
            return helper.response(res, 400, 'Email not send !')
          } else {
            console.log('Email sent:' + info.response)
            return helper.response(res, 200, ' Email Sent')
          }
        })
      } else {
        return helper.response(res, 404, `Data By id: ${workerId} Not Found`)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getRecruiter: async (req, res) => {
    try {
      let { search, page, limit, sort } = req.query
      page = parseInt(page)
      limit = parseInt(limit)
      if (!sort) {
        sort = 'recruiter_name ASC'
      }
      if (!search) {
        search = ''
      }
      if (!limit) {
        limit = 2
      }
      if (!page) {
        page = 1
      }
      const totalData = await recruiterModel.getDataCount()
      const totalDataSearch = await recruiterModel.getDataCount()
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
        totalDataSearch
      }
      const result = await recruiterModel.getDataAll(
        search,
        sort,
        limit,
        offset
      )

      if (result.length > 0) {
        client.setex(
          `getrecruiter:${JSON.stringify(req.query)}`,
          3600,
          JSON.stringify({ result, pageInfo })
        )
        return helper.response(
          res,
          200,
          `Succes Get, Search , and Sort by ${sort}`,
          result,
          pageInfo
        )
      } else {
        return helper.response(res, 404, 'Data Not Found . . .', null, pageInfo)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getRecruiterById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await recruiterModel.getDataById(id)
      delete result[0].recruiter_password
      if (result.length > 0) {
        client.set(`getrecruiter:${id}`, JSON.stringify(result))
        return helper.response(res, 200, 'Success Get Data By Id', result)
      } else {
        return helper.response(res, 404, 'Data By id .... Not Found !', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  updateRecruiterImage: async (req, res) => {
    try {
      const { id } = req.params
      const setData = {
        recruiter_image: req.file ? req.file.filename : '',
        recruiter_updated_at: new Date(Date.now())
      }

      const dataToUpdate = await recruiterModel.getDataById(id)
      if (dataToUpdate.length > 0) {
        if (dataToUpdate.length > 0) {
          const imageToDelete = dataToUpdate[0].recruiter_image
          const isImageExist = fs.existsSync(`src/uploads/${imageToDelete}`)

          if (isImageExist && imageToDelete) {
            fs.unlink(`src/uploads/${imageToDelete}`, (err) => {
              if (err) throw err
            })
          }
        }
        const result = await recruiterModel.updateData(setData, id)
        return helper.response(res, 200, 'Success Update Image', result)
      } else {
        return helper.response(res, 404, 'Failed! No Image Is Updated')
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  updateRecruiter: async (req, res) => {
    try {
      const { id } = req.params

      const {
        recruiterName,
        recruiterDomicile,
        recruiterEmail,
        recruiterIG,
        recruiterLinked,
        recruiterPhone,
        recruiterCompany,
        recruiterFieldCompany,
        recruiterDesc
      } = req.body

      const setData = {
        recruiter_name: recruiterName,
        recruiter_domicile: recruiterDomicile,
        recruiter_email: recruiterEmail,
        recruiter_instagram: recruiterIG,
        recruiter_linked_id: recruiterLinked,
        recruiter_phone: recruiterPhone,
        recruiter_company: recruiterCompany,
        recruiter_field_company: recruiterFieldCompany,
        recruiter_description: recruiterDesc,
        recruiter_updated_at: new Date(Date.now())
      }

      const dataToUpdate = await recruiterModel.getDataById(id)
      if (dataToUpdate.length > 0) {
        const result = await recruiterModel.updateData(setData, id)
        return helper.response(res, 200, 'Success Update Data', result)
      } else {
        return helper.response(res, 404, 'Failed! No Data Is Updated')
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  updateRecruiterPassword: async (req, res) => {
    try {
      const { id } = req.params
      const { newPassword, confirmPassword } = req.body
      const salt = bcrypt.genSaltSync(10)

      const dataToDelete = await recruiterModel.getDataById(id)
      const isPasswordConfirmed = newPassword === confirmPassword
      if (dataToDelete.length > 0 && isPasswordConfirmed) {
        const encryptedPassword = bcrypt.hashSync(newPassword, salt)
        const setData = {
          recruiter_password: encryptedPassword,
          recruiter_updated_at: new Date(Date.now())
        }

        const result = await recruiterModel.updateData(setData, id)
        delete result.recruiter_password

        return helper.response(res, 200, 'Success Update Password', result)
      } else if (!isPasswordConfirmed) {
        return helper.response(
          res,
          401,
          "New And Confirm Password Didn't Match"
        )
      } else {
        return helper.response(res, 404, 'Failed! No Data Is Updated')
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  deleteRecruiter: async (req, res) => {
    try {
      const { id } = req.params
      const initialResult = await recruiterModel.getDataById(id)
      console.log(initialResult[0].recruiter_image)
      if (initialResult.length > 0) {
        console.log(`Delete data by id = ${id}`)
        const result = await recruiterModel.deleteData(id)
        fs.stat(
          `src/uploads/${initialResult[0].recruiter_image}`,
          function (err, stats) {
            console.log(stats)
            if (err) {
              return console.error(err)
            }
            fs.unlink(
              `src/uploads/${initialResult[0].recruiter_image}`,
              function (err) {
                if (err) return console.log(err)
                console.log('file delected succesfuly')
              }
            )
          }
        )

        return helper.response(res, 200, 'Success Delete By Id', result)
      } else {
        return helper.response(res, 404, 'Data By id .... Not Found !', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  passChangeRequest: async (req, res) => {
    try {
      const { email } = req.body
      const checkEmailRecruiter = await recruiterModel.getDataByEmail(email)
      if (checkEmailRecruiter.length === 0) {
        return helper.response(res, 404, 'Cannot update empty data', null)
      } else {
        const token = Math.ceil(Math.random() * 9001) + 998
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
          }
        })
        const mailOptions = {
          from: process.env.SMTP_EMAIL,
          to: checkEmailRecruiter[0].recruiter_email,
          subject: 'Reset Password',
          html: `
          <h1>Your reset password token</h1>
          <p>Click '${token}' to reset your password.</p>
          `
        }
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) throw err
          console.log('email sent: ' + info.response)
        })
        const id = checkEmailRecruiter[0].recruiter_id
        const setData = {
          recruiter_updated_at: new Date(Date.now()),
          reset_token: token
        }
        const result = await recruiterModel.updateRecruiter(setData, id)
        return helper.response(res, 200, 'OTP sent', result)
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad request', Error)
    }
  },
  changePassword: async (req, res) => {
    try {
      const { email, otp, newPassword } = req.body
      const checkEmailRecruiter = await recruiterModel.getDataByEmail(email)
      if (checkEmailRecruiter.length === 0) {
        return helper.response(res, 404, 'Cannot update empty data', null)
      } else {
        const isExpired =
          new Date(Date.now()) - checkEmailRecruiter[0].recruiter_updated_at
        if (otp !== checkEmailRecruiter[0].reset_token || isExpired > 300000) {
          return helper.response(
            res,
            300,
            'Otp mismatch or token invalid',
            null
          )
        } else {
          const id = checkEmailRecruiter[0].recruiter_id
          const setData = {
            recruiter_password: newPassword
          }
          const result = await recruiterModel.updateRecruiter(setData, id)
          return helper.response(res, 200, 'Password changed', result)
        }
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad request', Error)
    }
  },
  deleteRecruiterImage: async (req, res) => {
    try {
      const { id } = req.params
      const setData = {
        recruiter_image: '',
        recruiter_updated_at: new Date(Date.now())
      }

      const dataToUpdate = await recruiterModel.getDataById(id)
      if (dataToUpdate.length > 0) {
        if (dataToUpdate.length > 0) {
          const imageToDelete = dataToUpdate[0].recruiter_image
          const isImageExist = fs.existsSync(`src/uploads/${imageToDelete}`)

          if (isImageExist && imageToDelete) {
            fs.unlink(`src/uploads/${imageToDelete}`, (err) => {
              if (err) throw err
            })
          }
        }
        const result = await recruiterModel.updateData(setData, id)
        return helper.response(res, 200, 'Success Delete Image', result)
      } else {
        return helper.response(res, 404, 'Failed! No Image Is Deleted')
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad request', Error)
    }
  }
}
