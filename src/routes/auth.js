const express = require('express')
const multer = require('multer')
const Auth = require('../controllers/auth')
const Route = express.Router()

Route.get('/', Auth.auth)
     .post('/login', Auth.login)
     .post('/register', Auth.register)
     .post('/forgot-password', Auth.forgotPassword)
     .patch('/update-password', Auth.updatePassword)
     .patch('/profile-change-password', Auth.profileNewPassword)


module.exports = Route
