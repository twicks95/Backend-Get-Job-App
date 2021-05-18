const redis = require('redis')
const client = redis.createClient()
const helper = require('../../helpers/wrapper')

module.exports = {
  getAllWorkerRedis: (req, res, next) => {
    client.get('getworker', (error, result) => {
      if (!error && result != null) {
        console.log('Worker data is in redis')
        // const newResult = JSON.parse(result)
        // console.log(newResult)
        return helper.response(
          res,
          200,
          'Succes get worker data',
          JSON.parse(result)
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
    // proses pertama, cari kunci yg berawalan getdata
    client.keys('getworker*', (_error, result) => {
      console.log(result) // berbentuk array ex: ['getmovie:1', 'getmovie:{page limit ...}']
      if (result.length > 0) {
        result.forEach((item) => {
          client.del(item)
        })
      }
      next()
    })
  }
}
