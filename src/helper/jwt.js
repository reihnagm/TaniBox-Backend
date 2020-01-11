const jwt = require('jsonwebtoken')
const misc = require('../helper/misc')
const User = require('../models/User')

module.exports = {
    CheckToken: async (req, response, next) => {
        try {
            const email = req.headers.email
            const checkUser = await User.checkUser(email)
            if(checkUser.length === 0) {
                return misc.response(response, 500, true, 'Oops!, email not exists')
            }

            const token = req.headers.authorization.split(' ')[1]
            const decodeToken = jwt.verify(token, process.env.JWT_KEY)
            if (decodeToken && decodeToken.user.email === email) {
                next()
            } else {
                return misc.response(response, 500, true, 'Invalid Email Token')
            }
        } catch (err) {
            return misc.response(response, 500, true, 'Invalid Token')
        }
    },
}
