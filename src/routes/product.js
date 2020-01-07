const express = require('express')
const multer = require('multer')
const Product = require('../controllers/product')
const Route = express.Router()

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, './public/images/products')
    },
    filename: (request, file, callback) => {
        callback(null, file.originalname)
    }
})

const upload = multer({
    storage
})

Route.get('/', Product.getAll)
     .post('/', upload.single('photo'), Product.addProduct)
     .post('/add-cart', Product.addCart)

module.exports = Route
