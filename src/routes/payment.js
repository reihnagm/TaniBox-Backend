const express = require('express')
const payment = require('../controllers/payment')
const Route = express.Router()

Route.get('/notification', payment.receiveNotif)

module.exports = Route
