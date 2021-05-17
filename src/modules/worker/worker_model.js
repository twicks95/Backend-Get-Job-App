const connection = require('../../config/mysql')

module.exports = {
  getDataAll: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM workers', (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  }
}
