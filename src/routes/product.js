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

Route.get('/', Product.getAll)
     .get('/show-product/:product_id', Product.getSingleProduct)
     .get('/cart', Product.getCart)
     .get('/:user_id/cart', Product.getSingleCart)
     .get('/wishlist', Product.getWishlist)
     .post('/', jwtCheck.CheckToken, upload.single('photo'), Product.addProduct)
     .patch('/update', jwtCheck.CheckToken, upload.single('photo'), Product.updateProduct)
     .patch('/update-cart', Product.updateCart)
     .post('/add-cart', jwtCheck.CheckToken, Product.addCart)
     .post('/wishlist', jwtCheck.CheckToken, Product.addWishlist)
     .delete('/:product_id/delete', jwtCheck.CheckToken, Product.deleteProduct)
     .delete('/:product_id/:user_id/delete-wishlist', jwtCheck.CheckToken, Product.deleteWishlist)
     .delete('/:cart_id/delete-cart', jwtCheck.CheckToken, Product.deleteCart)

module.exports = Route
