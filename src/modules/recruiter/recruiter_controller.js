const helper = require('../../helpers/wrapper')
const recruiterModel = require('./recruiter_model')
const fs = require('fs')
const redis = require('redis')
const client = redis.createClient()
const nodemailer = require('nodemailer')
require('dotenv').config()

module.exports = {
  sendEmail: async (req, res) => {
    try {
      const { workerId } = req.query
      const { subject, message } = req.body
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
      // kondisi pengecekan dalam id
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
        fs.stat(
          `src/uploads/${initialResult[0].recruiter_image}`,
          function (err, stats) {
            if (err) {
              return console.error(err)
            }
            fs.unlink(
              `src/uploads/${initialResult[0].recruiter_image}`,
              function (err) {
                if (err) return console.log(err)
                console.log('file deleted successfully')
              }
            )
          }
        )

        // kondisi pengecekan dalam id
        // console.log(result)
        return helper.response(res, 200, 'Success Update By Id', result)
      } else {
        return helper.response(res, 404, `Data id ${id} Not Found`, null)
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
        // kondisi pengecekan dalam id

        return helper.response(res, 200, 'Success Delete By Id', result)
      } else {
        return helper.response(res, 404, 'Data By id .... Not Found !', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
