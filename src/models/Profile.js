const connection = require('../configs/db')

module.exports = {

    checkRole: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT role FROM user WHERE id = '${id}'`, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },

    detailBuyer: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM buyer WHERE user_id = '${id}'`, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },

    detailSeller: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM seller WHERE user_id = '${id}'`, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },

    storeProfile: (role, data) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO ${role} SET ?`, data, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },

    updateProfile: (role, data) => {
        let query = 'UPDATE  buyer  SET  name = ?, province = ?, city = ?, kecamatan = ?, address = ?, postal_code = ?, phone = ? WHERE user_id = ?'
        if (role === 'seller') {
            query = 'UPDATE  seller  SET  name_of_seller = ?, name_of_store = ?, address1 = ?, province1 = ?, city1 = ?, kecamatan1 = ?, postal_code1 = ?, address2 = ?, province2 = ?, city2 = ?, kecamatan2 = ?, postal_code2 = ?, phone = ? WHERE user_id = ?'
        }
        return new Promise((resolve, reject) => {
            connection.query(query, data, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },

    deleteBuyer: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM buyer WHERE user_id = '${id}'`, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },

    deleteSeller: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM seller WHERE user_id = '${id}'`, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },

}
