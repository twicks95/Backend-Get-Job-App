const helper = require('../../helpers/wrapper')
const workerModel = require('./worker_model')

module.exports = {
  readAllWorker: async (req, res) => {
    try {
      const result = await workerModel.getDataAll()
      return helper.response(res, 200, 'Succes Get Data Worker', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postWorkers: async (req, res) => {
    try {
      const {
        workerName,
        workerDomicile,
        workerStatus,
        workerPhone,
        workerEmail,
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
        worker_phone: workerPhone,
        worker_email: workerEmail,
        worker_password: workerPassword,
        worker_instagram: workerInstagram,
        worker_github: workerGithub,
        worker_gitlab: workerGitlab,
        worker_description: workerDescription,
        worker_image: req.file ? req.file.filename : ''
      }
      console.log(setData)
      // const result = await workerModel.createData(setData)
      // return helper.response(res, 200, 'Succes Create Worker Data', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
