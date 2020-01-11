const connection = require('../configs/db')

module.exports = {
    storePayment: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO payment SET ?`, data, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
}
