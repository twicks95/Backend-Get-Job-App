const express = require('express')
const Route = express.Router()

const authRouter = require('../modules/auth/auth_routes')
// const experienceRouter = require('../modules/experience/experience_routes')
// const portfolioRouter = require('../modules/portfolio/portfolio_routes')
// const recruiterRouter = require('../modules/recruiter/recruiter_routes')
// const skillRouter = require('../modules/skill/skill_routes')
const workerRouter = require('../modules/worker/worker_routes')

// Router modules
Route.use('/auth', authRouter)
Route.use('/worker', workerRouter)
// Route.use('/experience', experienceRouter)
// Route.use('/portfolio', portfolioRouter)
// Route.use('/recruiter', recruiterRouter)
// Route.use('/skill', skillRouter)

module.exports = Route
