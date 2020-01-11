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
     .get('/single-product', redis.checkCache, Product.getSingleProduct)
     .get('/cart', redis.checkCache, Product.getCart)
     .get('/cart-by-user-id', redis.checkCache, Product.getCartByUserId)
     .get('/wishlist', redis.checkCache, Product.getWishlist)
     .post('/', upload.single('photo'), jwtCheck.CheckToken, Product.addProduct)
     .patch('/update-product', jwtCheck.CheckToken, upload.single('photo'), Product.updateProduct)
     .patch('/update-cart', jwtCheck.CheckToken, Product.updateCart)
     .post('/add-cart', jwtCheck.CheckToken, Product.addCart)
     .post('/wishlist', jwtCheck.CheckToken, Product.addWishlist)
     .delete('/delete-product', jwtCheck.CheckToken, Product.deleteProduct)
     .delete('/delete-wishlist', jwtCheck.CheckToken, Product.deleteWishlist)
     .delete('/delete-cart', jwtCheck.CheckToken, Product.deleteCart)

module.exports = Route
