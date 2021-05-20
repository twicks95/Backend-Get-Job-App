const helper = require('../../helpers/wrapper')
const skillModel = require('./skill_model')

module.exports = {
  sayHello: (req, res) => {
    res.status(200).send('Hello World')
  },
  getSkill: async (req, res) => {
    try {
      const result = await skillModel.getDataAll()
      return helper.response(res, 200, 'Succes Get All Data Skills', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getSkillById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await skillModel.getDataById(id)
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
  getSkillBySort: async (req, res) => {
    try {
      const result = await skillModel.getDataById()
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
  postSkill: async (req, res) => {
    try {
      console.log(req.body)
      const {
        workerId,
        skillName
      } = req.body
      const setData = {
        worker_id: workerId,
        skill_name: skillName,
        skill_created_at: new Date(Date.now())
      }
      console.log(setData)
      const result = await skillModel.createData(setData)
      return helper.response(res, 200, 'Success Create Skill', result)
    } catch (error) {
      // return helper.response(res, 400, 'Bad Request', error)
      console.log(error)
    }
  },
  updateSkill: async (req, res) => {
    try {
      const { id } = req.params
      // kondisi pengecekan dalam id
      const {
        skillId,
        workerId,
        skillName,
        skillCreatedAt
      } = req.body
      const setData = {
        skill_id: skillId,
        worker_id: workerId,
        skill_name: skillName,
        skill_created_at: skillCreatedAt,
        skill_updated_at: new Date(Date.now())
      }
      const result = await skillModel.updateData(setData, id)
      return helper.response(res, 200, 'Success Update Skill', result)
      // console.log(req.params)
      // console.log(req.body)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deleteSkill: async (req, res) => {
    try {
      const { id } = req.params
      const initialResult = await skillModel.getDataById(id)
      if (initialResult.length > 0) {
        const result = await skillModel.deleteData(id)
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
