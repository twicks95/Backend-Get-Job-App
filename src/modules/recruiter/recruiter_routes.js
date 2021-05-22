const express = require('express')
const Route = express.Router()
const { sayHello } = require('./recruiter_controller')

Route.get('/hello', sayHello)

const uploadFile = require('../../middleware/uploads')
const recruiterControler = require('./recruiter_controller')
const redisMiddleware = require('../../middleware/redis/redisRecruiter')

Route.get('/hello', recruiterControler.sayHello)
Route.get(
  '/',
  redisMiddleware.getRecruiterRedis,
  recruiterControler.getRecruiter)
Route.get(
  '/:id',
  redisMiddleware.getRecruiterByIdRedis,
  recruiterControler.getRecruiterById)
// Route.post('/', uploadFile, recruiterControler.postRecruiter)
Route.patch('/:id', uploadFile, recruiterControler.updateRecruiter)
Route.delete(
  '/:id',
  redisMiddleware.clearDataRecruiterRedis,
  recruiterControler.deleteRecruiter)
Route.patch('/request',
  recruiterControler.passChangeRequest)

Route.patch('/password',
  recruiterControler.changePassword)

module.exports = Route
