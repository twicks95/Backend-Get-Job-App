const express = require('express')
const Route = express.Router()
const { sendEmail } = require('./recruiter_controller')

Route.post('/send-email/:id', sendEmail)

module.exports = Route
