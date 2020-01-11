const express = require('express')
const transaction = require('../controllers/transaction')
const redis =   require('../helper/redis')
const Route = express.Router()

Route.get('/seller/:user_id', redis.checkCache, transaction.showTransactionBySeller)
Route.get('/buyer/:user_id', redis.checkCache, transaction.showTransactionByBuyer)
Route.get('/:id', redis.checkCache, transaction.showTransactionSingle)
Route.post('/', transaction.createTransaction)
Route.put('/status/:id', transaction.updateStatus)

module.exports = Route
