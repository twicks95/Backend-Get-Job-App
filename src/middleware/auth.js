const helper = require('../helpers/wrapper')
const jwt = require('jsonwebtoken')

module.exports = {
  authentication: (req, res, next) => {
    let token = req.headers.authorization
    if (token) {
      token = token.split(' ')[1]
      // proses validasi token
      jwt.verify(token, 'RAHASIA', (error, result) => {
        if (
          (error && error.name === 'JsonWebTokenError') ||
          (error && error.name === 'TokenExpiredError')
        ) {
          return helper.response(res, 403, error.message)
        } else {
          // console.log(result) berisi data sebelum di enkrip
          // console.log('lolos')
          req.decodeToken = result
          if (req.decodeToken.is_verified === 0) {
            return helper.response(res, 403, 'Please verify your email !')
          }
          next()
        }
      })
      // console.log(token)
    } else {
      return helper.response(res, 403, 'please login first')
    }
  },
  isRecruiter: (req, res, next) => {
    console.log('middleware recruiter runing')
    console.log(req.decodeToken)
    let token = req.headers.authorization
    // // cek kondisi user recruiter atau bukan
    if (token) {
      token = token.split(' ')[1]
      jwt.verify(token, 'RAHASIA', (error, result) => {
        if (
          (error && error.name === 'JsonWebTokenError') ||
          (error && error.name === 'TokenExpiredError')
        ) {
          return helper.response(res, 403, error.message)
        } else {
          req.decodeToken = result
          if (req.decodeToken.recruiter_id) {
            next()
          } else {
            return helper.response(res, 403, 'Room Private recrutier')
          }
        }
      })
    } else {
      return helper.response(res, 403, 'Please login')
    }
  },
  isWorker: (req, res, next) => {
    console.log('middleware worker runing')
    console.log(req.decodeToken)
    let token = req.headers.authorization
    // // cek kondisi user recruiter atau bukann
    if (token) {
      token = token.split(' ')[1]
      jwt.verify(token, 'RAHASIA', (error, result) => {
        if (
          (error && error.name === 'JsonWebTokenError') ||
          (error && error.name === 'TokenExpiredError')
        ) {
          return helper.response(res, 403, error.message)
        } else {
          req.decodeToken = result
          if (req.decodeToken.worker_id) {
            next()
          } else {
            return helper.response(res, 403, 'Room Private worker')
          }
        }
      })
    } else {
      return helper.response(res, 403, 'Please login')
    }
  }

}
