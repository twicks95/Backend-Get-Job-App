const helper = require('../../helpers/wrapper')
const recruiterModel = require('./recruiter_model')
const fs = require('fs')
const redis = require('redis')
const client = redis.createClient()
const nodemailer = require('nodemailer')

module.exports = {
  sayHello: (req, res) => {
    res.status(200).send('Hello World')
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
      const result = await recruiterModel.getDataAll(search, sort, limit, offset)

      if (result.length > 0) {
        client.setex(`getrecruiter:${JSON.stringify(req.query)}`, 3600, JSON.stringify({ result, pageInfo }))
        return helper.response(res, 200, `Succes Get, Search , and Sort by ${sort}`, result, pageInfo)
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
      // kondisi pengecekan dalam id
      // console.log(result)
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
  updateRecruiter: async (req, res) => {
    try {
      const { id } = req.params
      // kondisi pengecekan dalam id
      const {
        recruiterName,
        recruiterDomicile,
        recruiterEmail,
        recruiterIG,
        recruiterLinked,
        recruiterPhone,
        recruiterPassword,
        recruiterCompany,
        recruiterFieldCompany,
        recruiterDesc,
        recruiterCreated
      } = req.body
      const setData = {
        recruiter_name: recruiterName,
        recruiter_domicile: recruiterDomicile,
        recruiter_email: recruiterEmail,
        recruiter_instagram: recruiterIG,
        recruiter_linked_id: recruiterLinked,
        recruiter_phone: recruiterPhone,
        recruiter_password: recruiterPassword,
        recruiter_company: recruiterCompany,
        recruiter_field_company: recruiterFieldCompany,
        recruiter_description: recruiterDesc,
        recruiter_image: req.file ? req.file.filename : '',
        recruiter_created_at: recruiterCreated,
        recruiter_updated_at: new Date(Date.now())
      }
      const initialResult = await recruiterModel.getDataById(id)
      const result = await recruiterModel.updateData(setData, id)
      if (initialResult.length > 0) {
        // client.set(`getmovie:${id}`, JSON.stringify(result))
        fs.stat(`src/uploads/${initialResult[0].recruiter_image}`, function (err, stats) {
          // console.log(stats) // here we got all information of file in stats variable
          if (err) {
            return console.error(err)
          }
          fs.unlink(`src/uploads/${initialResult[0].recruiter_image}`, function (err) {
            if (err) return console.log(err)
            console.log('file deleted successfully')
          })
        })

        // kondisi pengecekan dalam id
        // console.log(result)
        return helper.response(res, 200, 'Success Update By Id', result)
      } else {
        return helper.response(res, 404, `Data id ${id} Not Found`, null)
      }// console.log(req.params)
      // console.log(req.body)
    } catch (error) {
      // return helper.response(res, 400, 'Bad Request', error)
      console.log(error)
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
        fs.stat(`src/uploads/${initialResult[0].recruiter_image}`, function (err, stats) {
          console.log(stats)
          if (err) {
            return console.error(err)
          }
          fs.unlink(`src/uploads/${initialResult[0].recruiter_image}`, function (err) {
            if (err) return console.log(err)
            console.log('file delected succesfuly')
          })
        })
        // kondisi pengecekan dalam id
        // console.log(result)

        return helper.response(res, 200, 'Success Delete By Id', result)
      } else {
        return helper.response(res, 404, 'Data By id .... Not Found !', null)
      }
    } catch (error) {
      // return helper.response(res, 400, 'Bad Request', error)
      console.log(error)
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
        const isExpired = new Date(Date.now()) - checkEmailRecruiter[0].recruiter_updated_at
        // console.log(isExpired)
        if (otp !== checkEmailRecruiter[0].reset_token || isExpired > 300000) {
          // console.log(req.body)
          return helper.response(res, 300, 'Otp mismatch or token invalid', null)
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
  }
}

// postRecruiter: async (req, res) => {
//   try {
//     const {
//       recruiterName,
//       recruiterDomicile,
//       recruiterEmail,
//       recruiterIG,
//       recruiterLinked,
//       recruiterPhone,
//       recruiterPassword,
//       recruiterCompany,
//       recruiterFieldCompany,
//       recruiterDesc
//     } = req.body
//     const setData = {
//       recruiter_name: recruiterName,
//       recruiter_domicile: recruiterDomicile,
//       recruiter_email: recruiterEmail,
//       recruiter_instagram: recruiterIG,
//       recruiter_linked_id: recruiterLinked,
//       recruiter_phone: recruiterPhone,
//       recruiter_password: recruiterPassword,
//       recruiter_company: recruiterCompany,
//       recruiter_field_company: recruiterFieldCompany,
//       recruiter_description: recruiterDesc,
//       recruiter_image: req.file ? req.file.filename : '',
//       recruiter_created_at: new Date(Date.now())
//     }

//     console.log(setData)
//     console.log(req.body)
//     const result = await recruiterModel.createData(setData)
//     return helper.response(res, 200, 'Success Create Movie', result)
//   } catch (error) {
//     return helper.response(res, 400, 'Bad Request', error)
//     // console.log(error)
//   }
// },
