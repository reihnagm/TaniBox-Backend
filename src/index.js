const express = require('express')
const product = require('./routes/product')
const Route = express.Router()

Route
    .use('/api/v1/products', product)

module.exports = Route
