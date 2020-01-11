const express = require('express')
const multer = require('multer')
const Product = require('../controllers/product')
const redis =   require('../helper/redis')
const jwtCheck = require('../helper/jwt')
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
     .get('/show-product/:product_id', redis.checkCache, Product.getSingleProduct)
     .get('/cart', redis.checkCache, Product.getCart)
     .get('/:user_id/cart', redis.checkCache, Product.getSingleCart)
     .get('/wishlist', redis.checkCache, Product.getWishlist)
     .post('/', jwtCheck.CheckToken, upload.single('photo'), Product.addProduct)
     .patch('/update', jwtCheck.CheckToken, upload.single('photo'), Product.updateProduct)
     .patch('/update-cart', jwtCheck.CheckToken, Product.updateCart)
     .post('/add-cart', jwtCheck.CheckToken, Product.addCart)
     .post('/wishlist', jwtCheck.CheckToken, Product.addWishlist)
     .delete('/:product_id/delete', jwtCheck.CheckToken, Product.deleteProduct)
     .delete('/:product_id/:user_id/delete-wishlist', jwtCheck.CheckToken, Product.deleteWishlist)
     .delete('/:cart_id/delete-cart', jwtCheck.CheckToken, Product.deleteCart)

module.exports = Route
