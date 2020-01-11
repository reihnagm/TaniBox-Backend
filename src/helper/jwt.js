const jwt = require('jsonwebtoken')
const misc = require('../helper/misc')
const User = require('../models/User')

module.exports = {
    CheckToken: async (req, response, next) => {
        try {
            if (decodeToken) {
                next()
            }
        } catch (err) {
            return misc.response(response, 500, true, 'Invalid Token')
        }
    },
}
