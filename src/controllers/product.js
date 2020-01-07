const Product = require('../models/Product')
const fs = require('fs-extra')

module.exports = {
    getAll: async (request, response) => {
            const page = parseInt(request.query.page) || 1
            const search = request.query.search || ''
            const limit = request.query.limit || 10
            const sort = request.query.sort || 'DESC'
            const sortBy = request.query.sortBy || 'date_updated'
            const offset = (page - 1) * limit
        try {
            const total = await Product.getProductCount()
            const prevPage = page === 1 ? 1 : page - 1
            const nextPage = page === total[0].total ? total[0].total : page + 1
            const data = await Product.getAll(offset, limit, sort, sortBy, search)
            response.json({
                data,
                total: Math.ceil(total[0].total),
                per_page: limit,
                current_page: page,
                nextLink: `http://localhost:5000${request.originalUrl.replace('page=' + page, 'page=' + nextPage)}`,
                prevLink: `http://localhost:5000${request.originalUrl.replace('page=' + page, 'page=' + prevPage)}`
            })
        } catch (error) {
            console.error(error.message)
            response.status(500).send('Server Error')
        }
    },
    addProduct: async (request, response, next) => {

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

                response.json(data)
            }
        } catch(error) {
            console.error(error)
            response.status(500).send('Server Errror')
        }

    },
    addCart: async (request, response) => {

        const product_id = request.body.product_id
        const user_id = request.body.user_id
        const qty = request.body.qty
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
            response.json(data)
        } catch(error) {
            console.error(error.message)
            response.status(5000).send('Server Error')
        }

    }
}
