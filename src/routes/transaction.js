const express = require('express')
const transaction = require('../controllers/transaction')
const redis =   require('../helper/redis')
const jwtCheck = require('../helper/jwt')
const Route = express.Router()

Route.get('/seller/:user_id', redis.checkCache, transaction.showTransactionBySeller)
Route.get('/buyer/:user_id', redis.checkCache, transaction.showTransactionByBuyer)
Route.get('/:id', redis.checkCache, transaction.showTransactionSingle)
Route.post('/', jwtCheck.CheckToken, transaction.createTransaction)
Route.patch('/status/:id', jwtCheck.CheckToken, transaction.updateStatus)

module.exports = Route
