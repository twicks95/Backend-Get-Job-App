const express = require('express')
const Route = express.Router()
const uploadFile = require('../../middleware/upload')
const recruiterControler = require('./recruiter_controller')
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
Route.patch('/:id', uploadFile, recruiterControler.updateRecruiter)
Route.patch(
  '/password/:id',
  // authMiddleware.authentication,
  recruiterControler.updateRecruiterPassword
)
Route.delete(
  '/:id',
  redisMiddleware.clearDataRecruiterRedis,
<<<<<<< HEAD
  recruiterControler.deleteRecruiter)
Route.patch('/request',
  recruiterControler.passChangeRequest)

Route.patch('/password',
  recruiterControler.changePassword)
=======
  recruiterControler.deleteRecruiter
)
>>>>>>> 8d789a625f7d60b8ef5059adf11dde812a6aef9f

module.exports = Route
