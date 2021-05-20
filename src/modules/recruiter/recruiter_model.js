const connection = require('../../config/mysql')

module.exports = {
  getDataAll: (search, sort, limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM recruiters WHERE recruiter_name LIKE "%"?"%" ORDER BY ${sort} LIMIT ? OFFSET ? `,
        [search, limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataCount: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT COUNT (*) As total FROM recruiters', (error, result) => {
        !error ? resolve(result[0].total) : reject(new Error(error))
      })
    })
  },
  getDataById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM recruiters where recruiter_id = ?', id, (error, result) => {
        // console.log(error)
        // console.log(result)
        !error ? resolve(result) : reject(new Error(error))
      }
      )
    })
  },
  createData: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO recruiters SET ?', setData, (error, result) => {
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
      connection.query('UPDATE recruiters SET ? WHERE recruiter_id = ?',
        [setData, id], (error, result) => {
          if (!error) {
            const newResult = {
              id: id,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        })
    })
  },
  deleteData: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM recruiters WHERE recruiter_id = ?', id, (error, result) => {
        // console.log(error)
        // console.log(result)
        !error ? resolve(result) : reject(new Error(error))
      }
      )
    })
  }
}
