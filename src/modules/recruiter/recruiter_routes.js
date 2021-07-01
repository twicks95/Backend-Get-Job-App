const express = require('express')
const Route = express.Router()
const uploadFile = require('../../middleware/uploads')
const recruiterControler = require('./recruiter_controller')
const authMiddleware = require('../../middleware/auth')
const redisMiddleware = require('../../middleware/redis/redisRecruiter')

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
  '/img/upload/:id',
  authMiddleware.authentication,
  authMiddleware.isRecruiter,
  uploadFile,
  redisMiddleware.clearDataRecruiterRedis,
  recruiterControler.updateRecruiterImage
)
Route.patch(
  '/:id',
  authMiddleware.authentication,
  authMiddleware.isRecruiter,
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
Route.delete(
  '/img/delete/:id',
  authMiddleware.isRecruiter,
  redisMiddleware.clearDataRecruiterRedis,
  recruiterControler.deleteRecruiterImage
)
Route.patch('/request', recruiterControler.passChangeRequest)

Route.patch(
  '/password',
  recruiterControler.changePassword,
  recruiterControler.deleteRecruiter
)

module.exports = Route
