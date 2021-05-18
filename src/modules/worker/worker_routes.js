const express = require('express')
const Route = express.Router()
const workerController = require('./worker_controller')

Route.get('/', workerController.readAllWorker)
Route.post('/', workerController.postWorkers)

module.exports = Route
