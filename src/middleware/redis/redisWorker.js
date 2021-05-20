const redis = require('redis')
const client = redis.createClient()
const helper = require('../../helpers/wrapper')

module.exports = {
  getAllWorkerRedis: (req, res, next) => {
    client.get(`getworker:${JSON.stringify(req.query)}`, (error, result) => {
      console.log(result)
      if (!error && result != null) {
        const newResult = JSON.parse(result)
        return helper.response(
          res,
          200,
          'Succes get worker data',
          newResult.result,
          newResult.pageInfo
        )
      } else {
        next()
      }
    })
  },
  getWorkerByIdRedis: (req, res, next) => {
    const { id } = req.params
    console.log('get data by id ' + id)
    client.get(`getworker:${id}`, (error, result) => {
      if (!error && result != null) {
        return helper.response(
          res,
          200,
          `Succes Get Worker Data By id: ${id}`,
          JSON.parse(result)
        )
      } else {
        next()
      }
    })
  },
  clearDataWorkerRedis: (req, res, next) => {
    client.keys('getworker*', (_error, result) => {
      console.log(result)
      if (result.length > 0) {
        result.forEach((item) => {
          client.del(item)
        })
      }
      next()
    })
  }
}
