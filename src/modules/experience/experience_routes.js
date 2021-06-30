const express = require('express')
const experienceController = require('./experience_controller')
const Route = express.Router()

Route.post('/', experienceController.postExperience)
Route.get('/:id', experienceController.getExperienceById)
Route.patch('/:id', experienceController.updateExperience)
Route.delete('/:id', experienceController.deleteExperience)

module.exports = Route
