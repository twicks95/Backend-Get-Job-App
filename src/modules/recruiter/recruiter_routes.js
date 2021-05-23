const express = require('express')
const Route = express.Router()
const uploadFile = require('../../middleware/upload')
const recruiterControler = require('./recruiter_controller')
const redisMiddleware = require('../../middleware/redisRecruiter')
const authMiddleware = require('../../middleware/auth')

Route.post('/send-email/', recruiterControler.sendEmail)
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
Route.patch(
  '/:id',
  authMiddleware.authentication,
  authMiddleware.isRecruiter,
  uploadFile,
  redisMiddleware.clearDataRecruiterRedis,
  recruiterControler.updateRecruiter
)
Route.patch(
  '/password/:id',
  authMiddleware.authentication,
  authMiddleware.isRecruiter,
  recruiterControler.updateRecruiterPassword
)
Route.delete(
  '/:id',
  authMiddleware.authentication,
  redisMiddleware.clearDataRecruiterRedis,
  recruiterControler.deleteRecruiter
)

module.exports = Route
