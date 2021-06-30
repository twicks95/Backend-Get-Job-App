const connection = require('../../config/mysql')

module.exports = {
  getDataAll: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT skills.skill_id, skills.worker_id, skills.skill_name, workers.worker_name FROM skills INNER JOIN workers ON skills.worker_id = workers.worker_id',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT skills.skill_id, skills.worker_id, skills.skill_name, workers.worker_name FROM skills INNER JOIN workers ON skills.worker_id = workers.worker_id where skill_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataByIdWorker: (idd) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT skills.worker_id, skills.skill_name, workers.worker_name FROM skills INNER JOIN workers ON skills.worker_id = workers.worker_id where workers.worker_id =? ',
        idd,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataBySort: (sort) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT worker_id, COUNT(*) AS total_skill FROM skills GROUP BY worker_id ORDER BY ${sort}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  createData: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO skills SET ?', setData, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...setData
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  updateData: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE skills SET ? WHERE skill_id = ?',
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
        'DELETE FROM skills WHERE skill_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
