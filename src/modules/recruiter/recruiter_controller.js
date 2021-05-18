const helper = require('../../helpers/wrapper')
const recruiterModel = require('./recruiter_model')

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
        // client.setex(`getmovie:${JSON.stringify(req.query)}`, 3600, JSON.stringify({ result, pageInfo }))
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
        return helper.response(res, 200, 'Success Get Data By Id', result)
      } else {
        return helper.response(res, 404, 'Data By id .... Not Found !', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postRecruiter: async (req, res) => {
    try {
      console.log(req.body)
      const {
        recruiterID,
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
        recruiterImage
      } = req.body
      const setData = {
        recruiter_id: recruiterID,
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
        recruiter_image: recruiterImage,
        recruiter_created_at: new Date(Date.now())
      }

      const result = await recruiterModel.createData(setData)
      return helper.response(res, 200, 'Success Create Movie', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updateRecruiter: async (req, res) => {
    try {
      const { id } = req.params
      // kondisi pengecekan dalam id
      const {
        recruiterID,
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
        recruiterImage,
        recruiterCreated
      } = req.body
      const setData = {
        recruiter_id: recruiterID,
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
        recruiter_image: recruiterImage,
        recruiter_created_at: recruiterCreated,
        recruiter_updated_at: new Date(Date.now())
      }
      const result = await recruiterModel.updateData(setData, id)
      return helper.response(res, 200, 'Success Update Recruiter', result)
      // console.log(req.params)
      // console.log(req.body)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deleteRecruiter: async (req, res) => {
    try {
      const { id } = req.params
      const initialResult = await recruiterModel.getDataById(id)
      if (initialResult.length > 0) {
        const result = await recruiterModel.deleteData(id)
        // kondisi pengecekan dalam id
        // console.log(result)
        if (result) {
          return helper.response(res, 200, 'Success Delete By Id', initialResult[0])
        } else {
          return helper.response(res, 404, 'Data By id .... Not Found !', null)
        }
      } else {
        return helper.response(res, 404, 'Data By id .... Not Found !', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
