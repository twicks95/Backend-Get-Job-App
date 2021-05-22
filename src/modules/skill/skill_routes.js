const express = require('express')
const Route = express.Router()
const { sayHello } = require('./skill_controller')

const uploadFile = require('../../middleware/uploads')
const skillControler = require('./skill_controller')
Route.get('/hello', sayHello)

Route.get('/hello', skillControler.sayHello)
Route.get('/', skillControler.getSkill)
Route.get('/:id/ling/:idd', skillControler.getSkillById)
Route.get('/sort/ling', skillControler.getSkillBySort)
Route.post('/', uploadFile, skillControler.postSkill)
Route.patch('/:id', skillControler.updateSkill)
Route.delete('/:id', skillControler.deleteSkill)

module.exports = Route
