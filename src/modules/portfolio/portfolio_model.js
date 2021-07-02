const connection = require('../../config/mysql')

module.exports = {
  getDataAll: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT portfolios.portfolio_id , workers.worker_name, portfolios.portfolio_name, portfolios.portfolio_link_repo, portfolios.portfolio_image FROM portfolios INNER JOIN workers ON portfolios.worker_id = workers.worker_id',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT portfolios.portfolio_id , workers.worker_name, portfolios.portfolio_name, portfolios.portfolio_link_repo, portfolios.portfolio_image FROM portfolios INNER JOIN workers ON portfolios.worker_id = workers.worker_id WHERE portfolios.worker_id = ?',
        id, (error, result) => {
          console.log(error)
          console.log(result)
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataByIdDelete: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT portfolios.portfolio_id , workers.worker_name, portfolios.portfolio_name, portfolios.portfolio_link_repo, portfolios.portfolio_image FROM portfolios INNER JOIN workers ON portfolios.worker_id = workers.worker_id WHERE portfolios.portfolio_id = ?',
        id, (error, result) => {
          console.log(error)
          console.log(result)
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  createData: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO portfolios SET ?', setData, (error, result) => {
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
      connection.query('UPDATE portfolios SET ? WHERE portfolio_id = ?',
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
      connection.query('DELETE FROM portfolios WHERE portfolio_id = ?', id, (error, result) => {
        // console.log(error)
        // console.log(result)
        !error ? resolve(result) : reject(new Error(error))
      }
      )
    })
  }
}
