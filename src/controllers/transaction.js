const Transaction = require('../models/Transaction')
const Profile = require('../models/Profile')
const misc = require('../helper/misc')
const redis = require('redis')
const redisClient = redis.createClient()

module.exports = {
    showTransactionBySeller: async (request, response) => {
        try {
            const idUser = request.params.user_id
            const transaction = await Transaction.getTransactionBySeller(idUser)
            if (transaction.length === 0) {
                return misc.response(response, 400, false, 'Transaction not found')
            }
            let data = []
            let shipment = []
            let products = []
            let i = 0
            for(let val of transaction) {
                shipment[i] = await Transaction.getTransactionShipment(val.id)
                products[i] = await Transaction.getTransactionDetail(val.id)
                data[i] = {
                    transaction: val,
                    shipment: shipment[i],
                    products: products[i]
                } 
                i++
            }
            
            misc.response(response, 200, false, 'Success', data, request.originalUrl)
        } catch(error) {
            console.error(error.message);
            misc.response(response, 500, true, 'Server error') 
        }
    },

    showTransactionByBuyer: async (request, response) => {
        try {
            const idUser = request.params.user_id
            const transaction = await Transaction.getTransactionByBuyer(idUser)
            if (transaction.length === 0) {
                return misc.response(response, 400, false, 'Transaction not found')
            }
            let data = []
            let shipment = []
            let products = []
            let i = 0
            for(let val of transaction) {
                shipment[i] = await Transaction.getTransactionShipment(val.id)
                products[i] = await Transaction.getTransactionDetail(val.id)
                data[i] = {
                    transaction: val,
                    shipment: shipment[i],
                    products: products[i]
                } 
                i++
            }
            
            misc.response(response, 200, false, 'Success', data, request.originalUrl)
        } catch(error) {
            console.error(error.message);
            misc.response(response, 500, true, 'Server error') 
        }
    },

    showTransactionSingle: async (request, response) => {
        try {
            const idTransaction = request.params.id
            const transaction = await Transaction.getTransactionSingle(idTransaction)
            if (transaction.length === 0) {
                return misc.response(response, 400, false, 'Transaction not found')
            }
            const shipment = await Transaction.getTransactionShipment(idTransaction)
            const products = await Transaction.getTransactionDetail(idTransaction)
            const result = {
                transaction,
                shipment,
                products
            }
            misc.response(response, 200, false, 'Success', result, request.originalUrl)
        } catch(error) {
            console.error(error.message);
            misc.response(response, 500, true, 'Server error') 
        }
    },

    updateStatus: async (request, response) => {
        try {
            const idTransaction = request.params.id
            const status = request.body.status
            let requireCheck = []
            !status ? requireCheck.push('status in body is required') : ''
            if (requireCheck.length) {
                return misc.response(response, 400, false, 'Not Valid', { errors: [{ msg: requireCheck }] })
            }
            const transaction = await Transaction.updateStatus(idTransaction, status)
            misc.response(response, 200, false, 'Success Update Status', transaction)
        } catch(error) {
            console.error(error.message);
            misc.response(response, 500, true, 'Server error') 
        }
    },

    createTransaction: async (request, response) => {
        const invoiceNumb = generateInvoice(13, request.timestamp)
        try {
            let requireCheck = []
            let transaction = {}
            let shipment = {}
            const { 
                seller_user_id,
                buyer_user_id,
                shipment_amount,
                transaction_amount,
                courier,
                courier_service,
                weight,
                products,
            } = request.body
    
            !seller_user_id ? requireCheck.push('seller_user_id is required') : ''
            !buyer_user_id ? requireCheck.push('buyer_user_id is required') : ''
            !shipment_amount ? requireCheck.push('shipment_amount is required') : ''
            !transaction_amount ? requireCheck.push('transaction_amount is required') : ''
            !courier ? requireCheck.push('courier is required') : ''
            !courier_service ? requireCheck.push('courier_service is required') : ''
            !weight ? requireCheck.push('weight is required') : ''
            !products || products.length === 0 ? requireCheck.push('products is required') : ''

            if (requireCheck.length) {
                return misc.response(response, 400, false, 'Not Valid', { errors: [{ msg: requireCheck }] })
            }

            const total_amount = parseInt(shipment_amount) + parseInt(transaction_amount)
            console.log(total_amount);            

            const detailSeller = await Profile.detailSeller(seller_user_id)
            const detailBuyer = await Profile.detailBuyer(buyer_user_id)
            
            transaction = { 
                seller_user_id,
                buyer_user_id,
                invoice: invoiceNumb,
                shipment_amount,
                transaction_amount,
                total_amount,
                status: 'waiting',
            }

            const addTransaction = await Transaction.storeTransaction(transaction)
            const get_id_transaction = addTransaction.insertId

            shipment = {
                id_transaction: get_id_transaction,
                seller_address: detailSeller[0].address2,
                seller_kecamatan: detailSeller[0].kecamatan2,
                seller_postal_code: detailSeller[0].postal_code2,
                seller_province: detailSeller[0].province2,
                seller_province_name: detailSeller[0].province2_name,
                seller_city: detailSeller[0].city2,
                seller_city_name: detailSeller[0].city2_name,
                buyer_address: detailBuyer[0].address,
                buyer_kecamatan: detailBuyer[0].kecamatan,
                buyer_postal_code: detailBuyer[0].postal_code,
                buyer_province: detailBuyer[0].province,
                buyer_province_name: detailBuyer[0].province_name,
                buyer_city: detailBuyer[0].city,
                buyer_city_name: detailBuyer[0].city_name,
                courier,
                courier_service,
                weight,
                shipment_amount,
            }            
            await Transaction.storeTransactionShipment(shipment)
            
            for(let val of products) {
                val.id_transaction = get_id_transaction
                Transaction.storeTransactionDetail(val)
            }

            const result = {
                transaction,
                shipment,
                products
            }
            
            misc.response(response, 200, false, 'Create Success', result)
        } catch(error) {
            console.error(error.message);
            misc.response(response, 500, true, 'Server error')
        }
    },
}

generateInvoice = (buyer_user_id, moment) => {
    const id = pad(buyer_user_id, 4)
    const now = moment.tz('Asia/Jakarta').format("YYYYMMDD")
    const yearRoman = roman(moment.tz('Asia/Jakarta').format("YYYY"))
    const monthRoman = roman(moment.tz('Asia/Jakarta').format("MM"))
    const hourNow = moment.tz('Asia/Jakarta').format("HHmmss")
    const invoice = 'INV/' + now + '/' + yearRoman + '/' + monthRoman + '/' + id + '/' + hourNow
    return invoice
}

pad = (n, width, z) => {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

roman = (number) => {

    var decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    var romanian = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
    var result = '';
  
    for(var index = 0; index < decimal.length; index++){
      while(decimal[index] <= number) {
        result += romanian[index];
        number -= decimal[index];
      }
    }
    return result;
  }