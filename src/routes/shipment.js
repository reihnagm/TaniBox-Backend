const express = require('express')
const shipment = require('../controllers/shipment')
const redis = require('../helper/redis')
const Route = express.Router()

Route.get('/province', redis.checkCache, shipment.getProvince)
Route.get('/city', shipment.getCity)
Route.get('/courier', shipment.getCourier)
Route.post('/cost', shipment.costBill)

module.exports = Route
