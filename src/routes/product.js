const express = require('express')
const multer = require('multer')
const Product = require('../controllers/product')
const redis =   require('../helper/redis')
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

Route.get('/', redis.checkCache, Product.getAll)
     .get('/single-product', redis.checkCache, Product.getSingleProduct)
     .get('/cart', redis.checkCache, Product.getCart)
     .get('/cart-by-user-id', redis.checkCache, Product.getCartByUserId)
     .get('/wishlist', redis.checkCache, Product.getWishlist)
     .post('/', upload.single('photo'), Product.addProduct)
     .patch('/update-product', upload.single('photo'), Product.updateProduct)
     .patch('/update-cart', Product.updateCart)
     .post('/add-cart', Product.addCart)
     .post('/wishlist', Product.addWishlist)
     .delete('/delete-product', Product.deleteProduct)
     .delete('/delete-wishlist', Product.deleteWishlist)
     .delete('/delete-cart', Product.deleteCart)

module.exports = Route
