const helper = require('../../helpers/wrapper')
const workerModel = require('./worker_model')
const fs = require('fs')
const redis = require('redis')
const client = redis.createClient()

module.exports = {
  getAllWorker: async (req, res) => {
    try {
      let { page, limit, search, sort } = req.query
      if (page === undefined) {
        page = '1'
      }
      if (limit === undefined) {
        limit = '5'
      }
      if (sort === undefined) {
        sort = 'worker_id ASC'
      }
      if (search === undefined) {
        search = ''
      }
      page = parseInt(page)
      limit = parseInt(limit)

      const totalData = await workerModel.getDataCount()
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData
      }
      // console.log(page, limit, sort, totalData, offset, pageInfo)
      const result = await workerModel.getDataAll(limit, offset, search, sort)
      client.setex(
        `getworker:${JSON.stringify(req.query)}`,
        3600,
        JSON.stringify({ result, pageInfo })
      )
      return helper.response(
        res,
        200,
        'Succes Get Data Worker',
        result,
        pageInfo
      )
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getWorkerByid: async (req, res) => {
    try {
      const { id } = req.params
      const result = await workerModel.getDataByid(id)
      if (result.length > 0) {
        client.set(`getworker:${id}`, JSON.stringify(result))
        return helper.response(res, 200, `Succes Get Data By Id ${id}`, result)
      } else {
        return helper.response(res, 404, `Data By id: ${id} Not Found`)
      }
    } catch (error) {
      helper.response(res, 400, 'Bad Request', error)
    }
  },
  updateWorker: async (req, res) => {
    try {
      const { id } = req.params

      const {
        workerName,
        workerDomicile,
        workerStatus,
        workerJobDesk,
        workerPhone,
        workerPassword,
        workerInstagram,
        workerGithub,
        workerGitlab,
        workerDescription
      } = req.body

      const setData = {
        worker_name: workerName,
        worker_domicile: workerDomicile,
        worker_status: workerStatus,
        worker_job_desk: workerJobDesk,
        worker_phone: workerPhone,
        worker_password: workerPassword,
        worker_instagram: workerInstagram,
        worker_github: workerGithub,
        worker_gitlab: workerGitlab,
        worker_description: workerDescription,
        worker_image: req.file ? req.file.filename : '',
        worker_updated_at: new Date(Date.now())
      }
      const checkId = await workerModel.getDataByid(id)
      const result = await workerModel.updateWorker(setData, id)
      if (checkId.length > 0) {
        fs.stat(
          `src/uploads/${checkId[0].worker_image}`,
          function (err, stats) {
            console.log(stats) // here we got all information of file in stats variable
            if (err) {
              return console.error(err)
            }
            fs.unlink(`src/uploads/${checkId[0].worker_image}`, function (err) {
              if (err) return console.log(err)
              console.log('file deleted successfully')
            })
          }
        )
        return helper.response(res, 200, `Succes Get Data By Id ${id}`, result)
      } else {
        return helper.response(res, 404, `Data By id: ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deleteWorker: async (req, res) => {
    try {
      const { id } = req.params
      const checkId = await workerModel.getDataByid(id)
      const result = await workerModel.deleteWorker(id)
      console.log(checkId)
      if (checkId.length > 0) {
        fs.stat(
          `src/uploads/${checkId[0].worker_image}`,
          function (err, stats) {
            console.log(stats) // here we got all information of file in stats variable
            if (err) {
              return console.error(err)
            }
            fs.unlink(`src/uploads/${checkId[0].worker_image}`, function (err) {
              if (err) return console.log(err)
              console.log('file deleted successfully')
            })
          }
        )
        return helper.response(
          res,
          200,
          `Succes Delete Data By id ${id}`,
          result
        )
      } else {
        return helper.response(res, 404, `Data By Id: ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
