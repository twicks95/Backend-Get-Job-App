const express = require('express')
const Route = express.Router()
const {
  registerWorker,
  registerRecruiter,
  login
} = require('./auth_controller')

Route.post('/worker', registerWorker)
Route.post('/recruiter', registerRecruiter)
Route.post('/login', login)

module.exports = Route
