const connection = require('../../config/mysql')

module.exports = {
  registerWorker: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO workers SET ?', data, (error, result) => {
        console.log(error)
        if (!error) {
          const newData = {
            id: result.insertId,
            ...data
          }
          resolve(newData)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  getWorkerDataConditions: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM workers WHERE ?',
        data,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  registerRecruiter: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO recruiters SET ?',
        data,
        (error, result) => {
          console.log(error)
          if (!error) {
            const newData = {
              id: result.insertId,
              ...data
            }
            resolve(newData)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  getRecruiterDataConditions: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM recruiters WHERE ?',
        data,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  verfication: (table, setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE ${table} SET ${setData} WHERE ${id}`,
        (error, result) => {
          console.log(error)
          if (!error) {
            const newResult = {
              id: id,
              setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  }
}
