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
    let token = req.headers.authorization

    // cek kondisi user recruiter atau bukan
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
          if (req.decodeToken.role === 'recruiter') {
            next()
          } else {
            return helper.response(res, 403, 'Room Private recruiter')
          }
        }
      })
    } else {
      return helper.response(res, 403, 'Please login')
    }
  },
  isWorker: (req, res, next) => {
    let token = req.headers.authorization

    // cek kondisi user recruiter atau bukannn
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
          if (req.decodeToken.role === 'worker') {
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
