const connection = require('../configs/db')

module.exports = {
    
    getTransactionBySeller: (idUser) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM transaction WHERE seller_user_id = ${idUser}`, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },

    getTransactionByBuyer: (idUser) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM transaction WHERE buyer_user_id = ${idUser}`, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    
    getTransactionSingle: (idTransaction) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM transaction WHERE id = ${idTransaction}`, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },

    getTransactionDetail: (idTransaction) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM transaction_detail WHERE id_transaction = ${idTransaction}`, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },

    getTransactionShipment: (idTransaction) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM transaction_shipment WHERE id_transaction = ${idTransaction}`, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    
    storeTransaction: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO transaction SET ?`, data, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },

    storeTransactionDetail: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO transaction_detail SET ?`, data, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },

    storeTransactionShipment: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO transaction_shipment SET ?`, data, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },

    updateStatus: (idTransaction, status) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE  transaction  SET  status = '${status}' WHERE id = ${idTransaction}`, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    
}
