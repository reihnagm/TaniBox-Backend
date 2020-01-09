require('dotenv').config()
const misc = require('../helper/misc')

module.exports = {
    addTransaction: async (request, response) => {
        function pad(n, width, z) {
            z = z || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        }
        console.log(pad(10,4));
        
        const products = request.body.lines
        for(let val of products) {
            console.log(val)
        }
        return misc.response(response, 200, false, 'Successfull', products)
    }
}
