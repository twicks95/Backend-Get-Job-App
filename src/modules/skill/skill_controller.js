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
      const { idd } = req.params
      const result = await skillModel.getDataByIdWorker(idd)
      // kondisi pengecekan dalam id
      // console.log(result)
      if (result.length > 0) {
        return helper.response(res, 200, 'Success Get Data By Id', result)
      } else {
        return helper.response(res, 404, 'Data By id .... Not Found !', null)
      }
    } catch (error) {
      // return helper.response(res, 400, 'Bad Request', error)
      console.log(error)
    }
  },
  getSkillBySort: async (req, res) => {
    try {
      let { sort } = req.query
      if (!sort) {
        sort = 'COUNT(*) ASC'
      }
      const result = await skillModel.getDataBySort(sort)
      // kondisi pengecekan dalam id
      // console.log(result)
      if (result.length > 0) {
        for (const value of result) {
          // console.log('ssss', value)
          value.Skills = await skillModel.getDataByIdWorker(value.worker_id)
          // value.premiere = [
          //   { premiere_id: 1, premiere_name: 'Cinema21' },
          //   { premiere_id: 2, premiere_name: 'By.2' }
          // ]
        }
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
      const { workerId, skillName } = req.body
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
      const { workerId, skillName, skillCreatedAt } = req.body
      const setData = {
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
      // return helper.response(res, 400, 'Bad Request', error)
      console.log(error)
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
          return helper.response(
            res,
            200,
            'Success Delete By Id',
            initialResult[0]
          )
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
