const connection = require('../../config/mysql')

module.exports = {
  getDataById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT experiences.experience_id, experiences.worker_id,experiences.experience_desc,workers.worker_name, experiences.experience_company, experiences.experience_position, experiences.experience_date_start,experiences.experience_date_end FROM experiences INNER JOIN workers ON experiences.worker_id = workers.worker_id where workers.worker_id = ?',
        id,
        (error, result) => {
          // console.log(error)
          // console.log(result)
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataByIdDelete: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT experiences.experience_id , workers.worker_name, experiences.experience_company, experiences.experience_position, experiences.experience_desc FROM experiences INNER JOIN workers ON experiences.worker_id = workers.worker_id WHERE experiences.experience_id = ?',
        id,
        (error, result) => {
          console.log(error)
          console.log(result)
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  createData: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO experiences SET ?',
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: result.insertId,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  updateData: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE experiences SET ? WHERE experience_id = ?',
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              id: id,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  deleteData: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM experiences WHERE experience_id = ?',
        id,
        (error, result) => {
          // console.log(error)
          // console.log(result)
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
