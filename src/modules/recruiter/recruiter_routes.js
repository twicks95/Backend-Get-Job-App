const express = require('express')
const Route = express.Router()
const { sayHello } = require('./recruiter_controller')

const recruiterControler = require('./recruiter_controller')
Route.get('/hello', sayHello)

Route.get('/hello', recruiterControler.sayHello)
Route.get('/', recruiterControler.getRecruiter)
Route.get('/:id', recruiterControler.getRecruiterById)
Route.post('/', recruiterControler.postRecruiter)
Route.patch('/:id', recruiterControler.updateRecruiter)
Route.delete('/:id', recruiterControler.deleteRecruiter)

module.exports = Route
