const express = require('express')
const experienceController = require('./experience_controller')
const Route = express.Router()
const { sayHello } = require('./experience_controller')
const uploadFile = require('../../middleware/uploads')

Route.get('/hello', sayHello)

Route.get('/hello', experienceController.sayHello)
Route.get('/', experienceController.getExperience)
Route.post('/', uploadFile, experienceController.postExperience)
Route.get('/:id', experienceController.getExperienceById)
Route.patch('/:id', uploadFile, experienceController.updateExperience)
Route.delete('/:id', experienceController.deleteExperience)

module.exports = Route
