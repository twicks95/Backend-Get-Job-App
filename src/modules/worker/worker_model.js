const connection = require('../../config/mysql')

module.exports = {
  getDataAll: (limit, offset, search, sort) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT *, COUNT(*) AS jumlah_skill FROM workers JOIN skills ON workers.worker_id = skills.worker_id WHERE skills.skill_name LIKE '%${search}%' GROUP BY workers.worker_id ORDER BY ${sort} LIMIT ${limit} OFFSET ${offset}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataCount: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM workers JOIN skills ON workers.worker_id = skills.worker_id GROUP BY workers.worker_id',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataByEmail: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SElECT * FROM recruiter WHERE recruiter_email = ?',
        email,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataByid: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM workers JOIN skills ON workers.worker_id = skills.worker_id WHERE workers.worker_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataIdOnly: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM workers WHERE workers.worker_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  updateWorker: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE workers SET ? WHERE worker_id = ?',
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
  deleteWorker: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM workers WHERE worker_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
