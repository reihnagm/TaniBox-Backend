const Product = require('../models/Product')
const fs = require('fs-extra')
const misc = require('../helper/misc')
const redis = require('redis')
const redisClient = redis.createClient()

module.exports = {

    getAll: async (request, response) => {

            const page = parseInt(request.query.page) || 1
            const search = request.query.search || ''
            const limit = request.query.limit || 10
            const sort = request.query.sort || 'DESC'
            const category = request.query.category_id || 2
            const sortBy = request.query.sortBy || 'date_updated'
            const offset = (page - 1) * limit
        try {
            const total = await Product.getProductCount()
            const prevPage = page === 1 ? 1 : page - 1
            const nextPage = page === total[0].total ? total[0].total : page + 1
            const data = await Product.getAll(offset, limit, sort, sortBy, search, category)

            let pageDetail = {
                total: Math.ceil(total[0].total),
                per_page: limit,
                current_page: page,
                nextLink: `http://34.202.135.29:4000${request.originalUrl.replace('page=' + page, 'page=' + nextPage)}`,
                prevLink: `http://34.202.135.29:4000${request.originalUrl.replace('page=' + page, 'page=' + prevPage)}`
            }

            misc.responsePagination(response, 200, false, 'Successfull get all data', pageDetail, data, request.originalUrl)
        } catch (error) {
            console.error(error)
            misc.response(response, 500, true, 'Server error')
        }

    },

    getSingleProduct: async (request, response) => {

        const product_id = request.params.product_id

        try {
            const data = await Product.getSingleProduct(product_id)
            misc.response(response, 200, false, 'Successfull get single product', data[0], request.originalUrl)

        } catch(error) {
            console.error(error)
            misc.response(response, 500, true, 'Server error')
        }

    },

    addProduct: async (request, response) => {

        let error = false

        if(request) {
            if(request.file) {

                if(request.file.size >= 5242880) {
                    const message = 'Oops!, Size cannot more than 5MB'
                     response.json(message)
                     error = true
                    fs.unlink(`public/images/products/${request.file.originalname}`, function(error) {
                        if (error) response.json(error)
                    })
                }

                const file = request.file.originalname
                const extension = file.split('.')
                const filename = extension[extension.length - 1]

                if(!isImage(filename)) {
                    const message = 'Oops!, File allowed only JPG, JPEG, PNG, GIF, SVG'
                    response.json(message)
                    error = true
                    fs.unlink(`public/images/products/${request.file.originalname}`, function(error) {
                        if (error) response.json(error)
                    })
                }

                function isImage(filename) {
                    switch (filename) {
                        case 'jpg':
                        case 'jpeg':
                        case 'png':
                        case 'gif':
                        case 'svg':
                            return true
                        }
                        return false
                }
            }
        }

        const name = request.body.name
        const description = request.body.description
        const stock = request.body.stock
        const price = request.body.price
        const unit = request.body.unit
        const category_id = request.body.category_id
        const user_id = request.body.user_id
        const photo = request.file.originalname

        try {
            if(error === false) {
                const response_addProduct = await Product.addProduct(name, unit, price, stock, description, category_id, user_id)
                const product_id = response_addProduct.insertId
                await Product.addProductPhoto(product_id, photo)

                const data = {
                    name,
                    description,
                    stock,
                    price,
                    unit,
                    category_id,
                    user_id,
                    product_id,
                    photo
                }
                redisClient.flushdb()
                misc.response(response, 200, false, 'Successfull create product', data)
            }
        } catch(error) {
            console.error(error)
            misc.response(response, 500, true, 'Server Error')
        }

    },

    updateProduct: async (request, response) => {

        let error = false

        if(request) {
            if(request.file) {

                if(request.file.size >= 5242880) {
                    const message = 'Oops!, Size cannot more than 5MB'
                    response.json(message)
                    error = true
                    fs.unlink(`public/images/products/${request.file.originalname}`, function(error) {
                        if (error) response.json(error)
                    })
                }

                const file = request.file.originalname
                const extension = file.split('.')
                const filename = extension[extension.length - 1]

                if(!isImage(filename)) {
                    const message = 'Oops!, File allowed only JPG, JPEG, PNG, GIF, SVG'
                    response.json(message)
                    error = true
                    fs.unlink(`public/images/products/${request.file.originalname}`, function(error) {
                        if (error) response.json(error)
                    })
                }

                function isImage(filename) {
                    switch (filename) {
                        case 'jpg':
                        case 'jpeg':
                        case 'png':
                        case 'gif':
                        case 'svg':
                            return true
                        }
                        return false
                }
            }
        }

        const product_id = request.body.product_id

        const name = request.body.name
        const description = request.body.description
        const stock = request.body.stock
        const price = request.body.price
        const unit = request.body.unit
        const category_id = request.body.category_id
        const user_id = request.body.user_id
        const photo = request.file.originalname

        try {
            if(error === false) {
                await Product.updateProduct(product_id, name, unit, price, stock, description, category_id, user_id)
                await Product.updateProductPhoto(product_id, photo)

                const data = {
                    name,
                    description,
                    stock,
                    price,
                    unit,
                    category_id,
                    user_id,
                    product_id,
                    photo
                }
                redisClient.flushdb()
                misc.response(response, 200, false, 'Successfull update product', data)
            }
        } catch(error) {
            console.error(error)
            misc.response(response, 500, true, 'Server Error')
        }

    },

    deleteProduct: async (request, response) => {

        const product_id = request.body.product_id

        try {
            await Product.deleteProduct(product_id)
            redisClient.flushdb()
            misc.response(response, 200, false, 'Successfull delete product')
        } catch(error) {
            console.error(error)
            misc.response(response, 500, true, 'Server error')
        }

    },

    getCart: async (request, response) => {

        try {
            const data = await Product.getCart()
            misc.response(response, 200, false, 'Successfull get cart', data, request.originalUrl)
        } catch(error) {
            console.error(error)
            misc.response(response, 500, true, 'Server error')
        }

    },


    getSingleCart: async (request, response) => {

        const user_id = request.params.user_id

        try {
            const data = await Product.getCartByUserId(user_id)
            misc.response(response, 200, false, 'Successfull get cart by user id', data, request.originalUrl)
        } catch (error) {
            console.error(error)
            misc.response(response, 500, true, 'Server error')
        }

    },

    addCart: async (request, response) => {

        const product_id = request.body.product_id
        const user_id = request.body.user_id
        const qty = parseInt(request.body.qty)
        const unit_price = parseInt(request.body.unit_price)
        const total = qty * unit_price

        const data = {
            product_id,
            user_id,
            qty,
            unit_price,
            total
        }

        try {
            await Product.addCart(unit_price, qty, total, product_id, user_id)
            redisClient.flushdb()
            misc.response(response, 200, false, 'Successfull add cart', data)
        } catch(error) {
            console.error(error)
            misc.response(response, 500, true, 'Server error')
        }

    },

    deleteCart: async (request, response) => {

        const cart_id = request.params.cart_id

        try {
            await Product.deleteCart(cart_id)
            redisClient.flushdb()
            misc.response(response, 200, false, 'Successfull delete cart')
        } catch(error) {
            console.error(error)
            misc.response(response, 500, true, 'Server error')
        }

    },

    updateCart: async (request, response) => {

        const cart_id = request.body.cart_id
        const product_id = request.body.product_id
        const user_id = request.body.user_id
        const qty = parseInt(request.body.qty)
        const unit_price = parseInt(request.body.unit_price)
        const total = qty * unit_price

        try {
            await Product.updateCart(cart_id, unit_price, qty, total, product_id, user_id)

            const data = {
                cart_id,
                qty,
                unit_price,
                total,
                product_id,
                user_id
            }
            redisClient.flushdb()
            misc.response(response, 200, false, 'Successfull update cart', data)
        } catch (error) {
            misc.response(response, 500, true, 'Server error')
        }

    },

    getWishlist: async (request, response) => {

        try {
            const data = await Product.getWishlist()
            misc.response(response, 200, false, 'Successfull get product in wishlist', data)
        } catch(error) {
            console.error(error)
            misc.response(response, 500, true, 'Server error')
        }

    },

    addWishlist: async (request, response) => {

        const product_id = request.body.product_id
        const user_id = request.body.user_id

        try {
            await Product.addWishlist(product_id, user_id)

            const data = {
                product_id,
                user_id
            }
            redisClient.flushdb()
            misc.response(response, 200, false, 'Successfull add product in wishlist', data)
        } catch(error) {
            console.error(error)
            misc.response(response, 500, true, 'Server error')
        }

    },

    deleteWishlist: async (request, response) => {

        const product_id = request.params.product_id
        const user_id = request.params.user_id

        try {
            await Product.deleteWishlist(product_id, user_id)

            const data = {
                product_id,
                user_id
            }
            misc.response(response, 200, false, 'Successfull delete product in wishlist', data)
        } catch(error) {
            console.error(error)
            misc.response(response, 500, true, 'Server error')
        }

    }

}
