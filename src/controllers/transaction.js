require('dotenv').config()
const misc = require('../helper/misc')

module.exports = {
    addTransaction: async (request, response) => {
        invoice = generateInvoice(13, request.timestamp)
        console.log(invoice);
        
        const products = request.body.lines
        for(let val of products) {
            console.log(val)
        }
        return misc.response(response, 200, false, 'Successfull', products)
    },
}

function generateInvoice(user_id, moment) {
    const id = pad(user_id, 4)
    const now = moment.tz('Asia/Jakarta').format("YYYYMMDD")
    const yearRoman = roman(moment.tz('Asia/Jakarta').format("YYYY"))
    const monthRoman = roman(moment.tz('Asia/Jakarta').format("MM"))
    const hourNow = moment.tz('Asia/Jakarta').format("HHmmss")
    const invoice = 'INV/' + now + '/' + yearRoman + '/' + monthRoman + '/' + id + '/' + hourNow
    return invoice
}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function roman(number){

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