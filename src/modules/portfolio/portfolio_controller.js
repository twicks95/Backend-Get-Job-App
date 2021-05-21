const helper = require('../../helpers/wrapper')
const portofolioModel = require('./portfolio_model')
const fs = require('fs')

module.exports = {
  getPortfolio: async (req, res) => {
    try {
      const result = await portofolioModel.getDataAll()
      return helper.response(res, 200, 'Succes Get All Data Portfolio', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getPortfolioById: async (req, res) => {
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
  postPortfolio: async (req, res) => {
    try {
      console.log(req.body)
      const {
        workerId,
        portfolioName,
        portfolioLink
      } = req.body
      const setData = {
        worker_id: workerId,
        portfolio_name: portfolioName,
        portfolio_link_repo: portfolioLink,
        portfolio_image: req.file ? req.file.filename : '',
        portfolio_created_at: new Date(Date.now())
      }
      console.log(setData)
      const result = await portofolioModel.createData(setData)
      return helper.response(res, 200, 'Success Create Skill', result)
    } catch (error) {
      // return helper.response(res, 400, 'Bad Request', error)
      console.log(error)
    }
  },
  updatePortfolio: async (req, res) => {
    try {
      const { id } = req.params
      // kondisi pengecekan dalam id
      const {
        workerId,
        portfolioName,
        portfolioLink,
        portfolioCreatedAt
      } = req.body
      const setData = {
        worker_id: workerId,
        portfolio_name: portfolioName,
        portfolio_link_repo: portfolioLink,
        portfolio_image: req.file ? req.file.filename : '',
        portfolio_created_at: portfolioCreatedAt,
        portfolio_updated_at: new Date(Date.now())
      }
      console.log(setData)
      const result = await portofolioModel.updateData(setData, id)
      return helper.response(res, 200, 'Success Update Skill', result)
      // console.log(req.params)
      // console.log(req.body)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deletePortfolio: async (req, res) => {
    try {
      const { id } = req.params
      const initialResult = await portofolioModel.getDataByIdDelete(id)
      // console.log("image", initialResult)
      if (initialResult.length > 0) {
        console.log(`Delete data by id = ${id}`)
        const result = await portofolioModel.deleteData(id)
        fs.stat(`src/uploads/${initialResult[0].portfolio_image}`, function (err, stats) {
          console.log(stats)
          if (err) {
            return console.error(err)
          }
          fs.unlink(`src/uploads/${initialResult[0].portfolio_image}`, function (err) {
            if (err) return console.log(err)
            console.log('file delected succesfuly')
          })
        })
        // kondisi pengecekan dalam id
        // console.log(result)

        return helper.response(res, 200, 'Success Delete By Id', result)
      } else {
        return helper.response(res, 404, 'Data By id .... Not Found !', null)
      }
    } catch (error) {
      // return helper.response(res, 400, 'Bad Request', error)
      console.log(error)
    }
  }
}
