const redis = require('redis')
const client = redis.createClient()
const helper = require('../../helpers/wrapper')

module.exports = {
  getRecruiterByIdRedis: (req, res, next) => {
    const { id } = req.params

    client.get(`getrecruiter:${id}`, (error, result) => {
      if (!error && result != null) {
        return helper.response(
          res,
          200,
          'Succes Get Data By Id',
          JSON.parse(result)
        )
      } else {
        console.log('data tidak ada di redis')
        next()
      }
    })
  },
  getRecruiterRedis: (req, res, next) => {
    client.get(`getrecruiter:${JSON.stringify(req.query)}`, (error, result) => {
      if (!error && result != null) {
        const newResult = JSON.parse(result) // {data,pageinfo}
        return helper.response(
          res,
          200,
          'Succes Get Recruiter',
          newResult.result,
          newResult.pageInfo
        )
      } else {
        console.log('data tidak ada di redis')
        next()
      }
    })
  },
  clearDataRecruiterRedis: (req, res, next) => {
    client.keys('getrecruiter*', (_error, result) => {
      if (result.length > 0) {
        result.forEach((item) => {
          client.del(item)
        })
      }
      next()
    })
  }
}
