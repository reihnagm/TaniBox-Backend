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
            connection.query(`SELECT a.*, b.name, b.email
                FROM buyer a, user b
                WHERE a.user_id = '${id}' AND b.id = '${id}'`, (error, result) => {
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
            connection.query(`SELECT a.*, b.name, b.email
                FROM seller a, user b
                WHERE a.user_id = '${id}' AND b.id = '${id}'`, (error, result) => {
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
        let query = 'UPDATE  buyer  SET  province = ?, province_name = ?, city = ?, city_name = ?, kecamatan = ?, address = ?, postal_code = ?, phone = ? WHERE user_id = ?'
        if (role === 'seller') {
            query = 'UPDATE  seller  SET  name_of_store = ?, address1 = ?, province1 = ?, province1_name = ?, city1 = ?, city1_name = ?, kecamatan1 = ?, postal_code1 = ?, address2 = ?, province2 = ?, province2_name = ?, city2 = ?, city2_name = ?, kecamatan2 = ?, postal_code2 = ?, phone = ? WHERE user_id = ?'
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

    updateName: (user_id ,name) => {
        let query = `UPDATE  user  SET  name = '${name}' WHERE id = ${user_id}`
        return new Promise((resolve, reject) => {
            connection.query(query, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },

    deleteUser: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM user WHERE id = '${id}'`, (error, result) => {
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

    uploadBuyer: (filename, id) => {
        let query = `UPDATE buyer SET photo = '${filename}' WHERE user_id = ${id}`
        return new Promise((resolve, reject) => {
            connection.query(query, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },

    uploadSeller: (filename, id) => {
        let query = `UPDATE seller SET photo_profile = '${filename}' WHERE user_id = ${id}`
        return new Promise((resolve, reject) => {
            connection.query(query, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },

    uploadStore: (filename, id) => {
        let query = `UPDATE seller SET photo_store = '${filename}' WHERE user_id = ${id}`
        return new Promise((resolve, reject) => {
            connection.query(query, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },

}
