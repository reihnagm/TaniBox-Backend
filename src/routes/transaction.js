const express = require('express')
const transaction = require('../controllers/transaction')
const Route = express.Router()

Route.post('/', transaction.addTransaction)

module.exports = Route
