const express = require('express')
const Route = express.Router()
const workerController = require('./worker_controller')
const uploadImage = require('../../middleware/upload')
const redisMiddleware = require('../../middleware/redis/redisWorker')

Route.get('/', redisMiddleware.getAllWorkerRedis, workerController.getAllWorker)
Route.get(
  '/:id',
  redisMiddleware.getWorkerByIdRedis,
  workerController.getWorkerByid
)
Route.post(
  '/',
  uploadImage,
  redisMiddleware.clearDataWorkerRedis,
  workerController.postWorkers
)
Route.patch(
  '/:id',
  uploadImage,
  redisMiddleware.clearDataWorkerRedis,
  workerController.updateWorker
)
Route.delete(
  '/:id',
  redisMiddleware.clearDataWorkerRedis,
  workerController.deleteWorker
)

module.exports = Route
