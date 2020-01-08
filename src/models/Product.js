const connection = require('../configs/db')

module.exports = {
    getProductCount: () => {
        return new Promise ((resolve, reject) => {
            const query = `SELECT COUNT(*) total from products`
            connection.query(query, (error, result) => {
                if(error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    getAll: (offset, limit, sort, sortBy, search) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT a.*
            FROM products a
            WHERE a.name LIKE '%${search}%'
            ORDER BY ${sortBy} ${sort} LIMIT ${offset}, ${limit}`
            connection.query(query, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    getSingleProduct: () => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM products WHERE id = '${product_id}'`
            connection.query(query, (error, result) => {
                if(error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    addCart: (unit_price, qty, total, product_id, user_id) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO cart (unit_price, qty, total, product_id, user_id) VALUES ('${unit_price}', '${qty}', '${total}', '${product_id}', '${user_id}')`
            connection.query(query, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    addProduct: (name, unit, price, stock, description, category_id, user_id) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO products (name, unit, price, stock, description, category_id, user_id)
            VALUES ('${name}', '${unit}', '${price}', '${stock}', '${description}', '${category_id}', '${user_id}')`
            connection.query(query, (error, result) => {
                if(error) {
                    reject(new Error(error))
                }
                else {
                    resolve(result)
                }
            })
        })
    },
    addProductPhoto: (product_id, photo) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO photo_product (photo, product_id)
                            VALUES ('${photo}', '${product_id}')`
            connection.query(query, (error, result) => {
                if(error) {
                    reject(new Error(error))
                }
                else {
                    resolve(result)
                }
            })
        })
    },
    addWishlist: (product_id, user_id) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO wishlist (product_id, user_id)
                            VALUES ('${product_id}', '${user_id}')`
            connection.query(query, (error, result) => {
                if(error) {
                    reject(new Error(error))
                }
                else {
                    resolve(result)
                }
            })
        })
    },
    deleteWishlist: (product_id, user_id) => {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM wishlist WHERE product_id = '${product_id}' and user_id = '${user_id}'`
            connection.query(query, (error, result) => {
                if(error) {
                    reject(new Error(error))
                }
                else {
                    resolve(result)
                }
            })
        })
    }
}
