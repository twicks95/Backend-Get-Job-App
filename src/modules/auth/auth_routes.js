const express = require('express')
const Route = express.Router()
const {
  login,
  registerWorker,
  registerRecruiter,
  verificationWorker,
  verificationRecruiter,
  sendEmailResetPasswordWorker,
  confimNewPasswordWorker,
  sendEmailResetPasswordRecruiter,
  confimNewPasswordRecruiter
} = require('./auth_controller')

Route.post('/login', login)
Route.post('/register/worker', registerWorker)
Route.post('/register/recruiter', registerRecruiter)
Route.post('/patch/worker/:id', verificationWorker)
Route.post('/patch/recruiter/:id', verificationRecruiter)
Route.get('/worker/reset-password', sendEmailResetPasswordWorker)
Route.patch('/worker/reset-password', confimNewPasswordWorker)
Route.get('/recruiter/reset-password', sendEmailResetPasswordRecruiter)
Route.patch('/recruiter/reset-password', confimNewPasswordRecruiter)

module.exports = Route
