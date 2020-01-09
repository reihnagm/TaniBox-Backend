require('dotenv').config()
const axios = require('axios');
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
            const {province_id} = request.body
            const prov = province_id ? `id=${province_id}&` : ''
            const url = `https://api.rajaongkir.com/starter/province?${prov}`

            await axios.get(url, config)
            .then(function (res) {
                return response.status(200).json(res.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
        } catch(error) {
            console.error(error.message)
            response.status(500).send('Server error')
        }
    },

    getCity: async (request, response) => {
        try {
            const {city_id, province_id} = request.body
            const city = city_id ? `id=${city_id}&` : ''
            const prov = province_id ? `province=${province_id}&` : ''
            const url = `https://api.rajaongkir.com/starter/city?${city}${prov}`
            
            await axios.get(url, config)
            .then(function (res) {
                return response.status(200).json(res.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
        } catch(error) {
            console.error(error.message)
            response.status(500).send('Server error')
        }
    },

    getCourier: async (request, response) => {
        try {
            const items = [
                { id: 'jne', name: 'JNE' },
                { id: 'tiki', name: 'TIKI' },
                { id: 'pos', name: 'Pos Indonesia' },
              ];
            return response.status(200).json({data: items})
        } catch(error) {
            console.error(error.message)
            response.status(500).send('Server error')
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
            
            const data = { origin: '501', destination: '114', weight: '1700', courier: 'jne' }
            const url = `https://api.rajaongkir.com/starter/cost`
            
            await axios.post(url, querystring.stringify(data), config)
            .then(function (res) {
                return response.status(200).json(res.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
        } catch(error) {
            console.error(error.message)
            response.status(500).send('Server error')
        }
    },

}
