const express = require('express')
const Route = express.Router()
// const { sayHello } = require('./skill_controller')

const uploadFile = require('../../middleware/uploads')
const portfolioControler = require('./portfolio_controller')
// Route.get('/hello', sayHello)

// Route.get('/hello', skillControler.sayHello)
// Route.get('/', skillControler.getSkill)
Route.get('/:id', portfolioControler.getSkillById)
Route.get('/sort/ling', portfolioControler.getSkillBySort)
Route.post('/', uploadFile, portfolioControler.postSkill)
Route.patch('/:id', portfolioControler.updateSkill)
Route.delete('/:id', portfolioControler.deleteSkill)

module.exports = Route
