const helper = require('../../helpers/wrapper')
const recruiterModel = require('./recruiter_model')

module.exports = {
  sendEmail: async (req, res) => {
    try {
      const { id } = req.query
      const { subject, message } = req.body
      const checkIdWorker = await recruiterModel.getDataByid({
        worker_id: id
      })
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
