const express = require('express')
const payment = require('../controllers/payment')
const Route = express.Router()

Route.post('/notification', payment.receiveNotif)

module.exports = Route
