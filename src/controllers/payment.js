const misc = require('../helper/misc')
const Payment = require('../models/Payment')

module.exports = {
    receiveNotif: async (request, response) => {
        try {
            const {
                order_id,
                va_numbers,
                transaction_time,
                transaction_status,
                transaction_id,
                status_message,
                status_code,
                signature_key,
                settlement_time,
                payment_type,
                merchant_id,
                gross_amount,
                fraud_status,
            } = request.body
    
            const data = {
                id_transaction: order_id,
                va_number: va_numbers.va_number,
                bank: va_numbers.bank,
                transaction_time,
                transaction_status,
                transaction_id,
                status_message,
                status_code,
                signature_key,
                settlement_time,
                payment_type,
                merchant_id,
                gross_amount,
                fraud_status,
            }
    
            const created = await Payment.storePayment(data)
            const payload = {
                user: {
                    id: created.insertId
                }
            }
            return misc.response(response, 200, false, 'Successfull', payload)
        } catch(error) {
            console.error(error.message);
            misc.response(response, 500, true, 'Server error')
        }
    }
}
