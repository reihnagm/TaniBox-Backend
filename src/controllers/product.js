const Product = require('../models/Product')

module.exports = {
    getAll: async (request, response) => {
            const page = parseInt(request.query.page) || 1
            const search = request.query.search || ''
            const limit = request.query.limit || 10
            const sort = request.query.sort || 'DESC'
            const sortBy = request.query.sortBy || 'date_updated'
            const offset = (page - 1) * limit
        try {
            const total = await Product.getCount()
            const prevPage = page === 1 ? 1 : page - 1
            const nextPage = page === total[0].total ? total[0].total : page + 1
            const data = await Product.all(offset, limit, sort, sortBy, search)
            response.json({
                data,
                total: Math.ceil(total[0].total),
                per_page: limit,
                current_page: page,
                nextLink: `http://localhost:5000${request.originalUrl.replace('page=' + page, 'page=' + nextPage)}`,
                prevLink: `http://localhost:5000${request.originalUrl.replace('page=' + page, 'page=' + prevPage)}`
            })
        }
        catch (error) {
            console.error(error.message)
            response.status(500).send('Server Error')
        }
    }
}
