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
            connection.query(`SELECT email, password, OTP FROM user WHERE email = '${email}'`, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    getDBOTP: (email) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT OTP FROM user WHERE email = '${email}'`, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    updateOTP: (email, OTP) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE user SET OTP = '${OTP}' WHERE email = '${email}'`, (error, result) => {
                if(error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    updateOTPToNull: (email) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE user SET OTP = NULL WHERE email = '${email}'`, (error, result) => {
                if(error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    updatePassword: (passwordHash, email) => {
        return new Promise((resolve, reject) => {
            query = `UPDATE user SET password = '${passwordHash}' WHERE email = '${email}'`
            connection.query(query, (error, result) => {
                if(error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    }
}
