const express = require('express')
const multer = require('multer')
const Auth = require('../controllers/auth')
const Route = express.Router()

Route.get('/', Auth.auth)
     .post('/login', Auth.login)
     .post('/register', Auth.register)


module.exports = Route
