const express = require('express')
const Product = require('../controllers/product')
const Route = express.Router()

Route.get('/', Product.getAll)

module.exports = Route
