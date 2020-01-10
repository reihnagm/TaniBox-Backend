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
     .get('/:product_id', Product.getSingleProduct)
     .get('/cart', Product.getCart)
     .get('/cart-by-user-id', Product.getCartByUserId)
     .get('/wishlist', Product.getWishlist)
     .post('/', upload.single('photo'), Product.addProduct)
     .patch('/:product_id/update', upload.single('photo'), Product.updateProduct)
     .patch('/update-cart', Product.updateCart)
     .post('/add-cart', Product.addCart)
     .post('/wishlist', Product.addWishlist)
     .delete('/delete-product', Product.deleteProduct)
     .delete('/delete-wishlist', Product.deleteWishlist)
     .delete('/delete-cart', Product.deleteCart)

module.exports = Route
