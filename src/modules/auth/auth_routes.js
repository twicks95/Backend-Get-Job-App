const express = require('express')
const Route = express.Router()
const {
  registerWorker,
  registerRecruiter,
  loginWorker,
  loginRecruiter,
  verificationWorker,
  verificationRecruiter
} = require('./auth_controller')

Route.post('/register/worker', registerWorker)
Route.post('/register/recruiter', registerRecruiter)
Route.post('/login/worker', loginWorker)
Route.post('/login/recruiter', loginRecruiter)
Route.post('/patch/worker/:id', verificationWorker)
Route.post('/patch/recruiter/:id', verificationRecruiter)

module.exports = Route
