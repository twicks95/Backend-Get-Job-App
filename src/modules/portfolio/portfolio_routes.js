const express = require('express')
const Route = express.Router()

const uploadFile = require('../../middleware/uploads')
const portfolioControler = require('./portfolio_controller')

// Route.get('/', skillControler.getSkill)
Route.get('/:id', portfolioControler.getPortfolioById)
Route.post('/', uploadFile, portfolioControler.postPortfolio)
Route.patch('/:id', uploadFile, portfolioControler.updatePortfolio)
Route.delete('/:id', portfolioControler.deletePortfolio)

module.exports = Route
