const express = require('express')
const auth = require('./routes/auth')
const product = require('./routes/product')
const Route = express.Router()

Route
    .use('/auth', auth)
    .use('/api/v1/products', product)

module.exports = Route
