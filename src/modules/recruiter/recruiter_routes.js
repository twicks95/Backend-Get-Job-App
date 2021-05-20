const express = require('express')
const Route = express.Router()
const uploadFile = require('../../middleware/uploads')
const recruiterControler = require('./recruiter_controller')
const redisMiddleware = require('../../middleware/redisRecruiter')

Route.post('/send-email/:id', recruiterControler.sendEmail)
Route.get(
  '/',
  redisMiddleware.getRecruiterRedis,
  recruiterControler.getRecruiter
)
Route.get(
  '/:id',
  redisMiddleware.getRecruiterByIdRedis,
  recruiterControler.getRecruiterById
)
Route.patch('/:id', uploadFile, recruiterControler.updateRecruiter)
Route.delete(
  '/:id',
  redisMiddleware.clearDataRecruiterRedis,
  recruiterControler.deleteRecruiter
)

module.exports = Route
