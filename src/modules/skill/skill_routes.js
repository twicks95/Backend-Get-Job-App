const express = require('express')
const Route = express.Router()
// const uploadFile = require('../../middleware/uploads')
const skillControler = require('./skill_controller')

Route.get('/', skillControler.getSkill)
Route.get('/:id', skillControler.getSkillById)
Route.get('/sort/ling', skillControler.getSkillBySort)
Route.post('/', skillControler.postSkill)
Route.patch('/:id', skillControler.updateSkill)
Route.delete('/:id', skillControler.deleteSkill)

module.exports = Route
