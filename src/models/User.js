const connection = require('../configs/db')

module.exports = {

    auth: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT id, name, email FROM user WHERE id = '${id}'`, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },

    login: (email) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM user WHERE email = ?`, email, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },

    register: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO user SET ?', data, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },

    checkUser: (email) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT email FROM user WHERE email = '${email}'`, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    }

}
