const helper = require('../../helpers/wrapper')
const recruiterModel = require('./recruiter_model')
const fs = require('fs')
const redis = require('redis')
const client = redis.createClient()

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