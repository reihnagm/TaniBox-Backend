require('dotenv').config()
const jwt = require('jsonwebtoken')
const misc = require('../helper/misc')

module.exports = {
    CheckToken: async (req, response, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1]
            const decodeToken = jwt.verify(token, process.env.JWT_KEY)
            if (decodeToken) {
                next()
            }
        } catch (err) {
            return misc.response(response, 500, true, 'Invalid Token')
        }
    },
}
