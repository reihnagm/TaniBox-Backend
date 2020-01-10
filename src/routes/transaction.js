const express = require('express')
const transaction = require('../controllers/transaction')
const Route = express.Router()

Route.get('/seller/:user_id', transaction.showTransactionBySeller)
Route.get('/buyer/:user_id', transaction.showTransactionByBuyer)
Route.get('/:id', transaction.showTransactionSingle)
Route.post('/', transaction.createTransaction)
Route.put('/status/:id', transaction.updateStatus)

module.exports = Route
