const express = require('express')
const Route = express.Router()
const { sayHello } = require('./skill_controller')

const skillControler = require('./skill_controller')
Route.get('/hello', sayHello)

Route.get('/hello', skillControler.sayHello)
Route.get('/', skillControler.getSkill)
Route.get('/:id', skillControler.getSkillById)
Route.post('/', skillControler.postSkill)
Route.patch('/:id', skillControler.updateSkill)
Route.delete('/:id', skillControler.deleteSkill)

module.exports = Route
