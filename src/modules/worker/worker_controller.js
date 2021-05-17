const helper = require('../../helpers/wrapper')
const workerModel = require('./worker_model')

module.exports = {
  getAllWorker: async (req, res) => {
    try {
      const result = await workerModel.getDataAll()
      return helper.response(res, 200, 'Succes Get Data Worker', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
