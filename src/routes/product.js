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
     .get('/single-product', Product.getSingleProduct)
     .post('/', upload.single('photo'), Product.addProduct)
     .post('/add-cart', Product.addCart)
     .post('/wishlist', Product.addWishlist)
     .delete('/delete-wishlist', Product.deleteWishlist)

module.exports = Route
