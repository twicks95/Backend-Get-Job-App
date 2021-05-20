const helper = require('../../helpers/wrapper')
const portofolioModel = require('./portfolio_model')

module.exports = {
  sayHello: (req, res) => {
    res.status(200).send('Hello World')
  },
  getSkill: async (req, res) => {
    try {
      const result = await portofolioModel.getDataAll()
      return helper.response(res, 200, 'Succes Get All Data Portfolio', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getSkillById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await portofolioModel.getDataById(id)
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
      const result = await portofolioModel.getDataById()
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
        portfolioName,
        portfolioLink,
        portfolioImage
      } = req.body
      const setData = {
        worker_id: workerId,
        portfolio_name: portfolioName,
        portfolio_link_repo: portfolioLink,
        portfolio_image: portfolioImage,
        skill_created_at: new Date(Date.now())
      }
      console.log(setData)
      const result = await portofolioModel.createData(setData)
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
        workerId,
        portfolioName,
        portfolioLink,
        portfolioImage,
        portfolioCreatedAt
      } = req.body
      const setData = {
        worker_id: workerId,
        portfolio_name: portfolioName,
        portfolio_link_repo: portfolioLink,
        portfolio_image: portfolioImage,
        skill_created_at: portfolioCreatedAt,
        skill_updated_at: new Date(Date.now())
      }
      const result = await portofolioModel.updateData(setData, id)
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
      const initialResult = await portofolioModel.getDataById(id)
      if (initialResult.length > 0) {
        const result = await portofolioModel.deleteData(id)
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
