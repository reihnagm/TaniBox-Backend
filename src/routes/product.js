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
     .get('/show-product/:product_id', Product.getSingleProduct)
     .get('/cart', Product.getCart)
     .get('/:user_id/cart', Product.getSingleCart)
     .get('/wishlist', Product.getWishlist)
     .post('/', upload.single('photo'), Product.addProduct)
     .patch('/update', upload.single('photo'), Product.updateProduct)
     .patch('/update-cart', Product.updateCart)
     .post('/add-cart', Product.addCart)
     .post('/wishlist', Product.addWishlist)
     .delete('/:product_id/delete', Product.deleteProduct)
     .delete('/:product_id/:user_id/delete', Product.deleteWishlist)
     .delete('/:cart_id/delete', Product.deleteCart)

module.exports = Route
