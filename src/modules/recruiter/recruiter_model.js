const connection = require('../../config/mysql')

module.exports = {
  getDataByid: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM workers WHERE ?', id, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  }
}
