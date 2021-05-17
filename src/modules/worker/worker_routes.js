const express = require('express')
const Route = express.Router()
const WorkerController = require('./worker_controller')

Route.get('/', WorkerController.getAllWorker)

module.exports = Route
