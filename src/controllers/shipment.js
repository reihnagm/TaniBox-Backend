require('dotenv').config()
const axios = require('axios');
const misc = require('../helper/misc')
const querystring = require('querystring');
const config = {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "key":  process.env.SHIPMENT_KEY,
    }
}

module.exports = {

    getProvince: async (request, response) => {
        try {
            const {province_id} = request.query
            const prov = province_id ? `id=${province_id}&` : ''
            const url = `https://api.rajaongkir.com/starter/province?${prov}`

            await axios.get(url, config)
            .then(function (res) {
                return misc.response(response, 200, false, 'Successfull get province', res.data.rajaongkir.results, request.originalUrl)
            })
            .catch(function (error) {
                return misc.response(response, 500, false, 'shipment key has reach daily limit')
            })
        } catch(error) {
            console.error(error.message)
            misc.response(response, 500, true, 'Server error')
        }
    },

    getCity: async (request, response) => {
        try {
            const {city_id, province_id} = request.query
            const city = city_id ? `id=${city_id}&` : ''
            const prov = province_id ? `province=${province_id}&` : ''
            const url = `https://api.rajaongkir.com/starter/city?${city}${prov}`
            // console.log(config);
            
            await axios.get(url, config)
            .then(function (res) {
                return misc.response(response, 200, false, 'Successfull', res.data.rajaongkir.results, request.originalUrl)
            })
            .catch(function (error) {
                return misc.response(response, 500, false, 'shipment key has reach daily limit')
            })
        } catch(error) {
            // console.error(error.message)
            misc.response(response, 500, true, 'Server error')
        }
    },

    getCourier: async (request, response) => {
        try {
            const items = [
                { id: 'jne', name: 'JNE' },
                { id: 'tiki', name: 'TIKI' },
                { id: 'pos', name: 'Pos Indonesia' },
              ];
            return misc.response(response, 200, false, 'Successfull', {couriers: items}, request.originalUrl)
        } catch(error) {
            console.error(error.message)
            misc.response(response, 500, true, 'Server error')
        }
    },

    costBill: async (request, response) => {
        try {
            let requireCheck = []
            const {
                origin_city, 
                destination_city,
                weight,
                courier
            } = request.body

            !origin_city ? requireCheck.push('origin_city is required') : ''
            !destination_city ? requireCheck.push('destination_city is required') : ''
            !weight ? requireCheck.push('weight is required') : ''
            !courier ? requireCheck.push('courier is required') : ''

            if (requireCheck.length) {
                return response.status(400).json({ errors: [{ msg: requireCheck }] });
            }
            
            const data = { origin: origin_city, destination: destination_city, weight: weight, courier: courier }
            const url = `https://api.rajaongkir.com/starter/cost`
            
            await axios.post(url, querystring.stringify(data), config)
            .then(function (res) {
                return misc.response(response, 200, false, 'Successfull', res.data.rajaongkir.results)
            })
            .catch(function (error) {
                return misc.response(response, 500, false, 'shipment key has reach daily limit')
            })
        } catch(error) {
            console.error(error.message)
            misc.response(response, 500, true, 'Server error')
        }
    },

}
