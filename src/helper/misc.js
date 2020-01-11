const redis = require('redis')
const redisClient = redis.createClient()

module.exports = {
	response: (res, status, error, message, data, redisNeeded) => {
		let resultPrint = {}
		resultPrint.status = status || 200
		resultPrint.error = error || false
		resultPrint.message = message || 'Success'
		if(data){
			resultPrint.data = data
		}
		if (redisNeeded) {
			const redisData = JSON.stringify(resultPrint.data)
			redisClient.setex(redisNeeded, 3600, redisData)
		}

		return res.status(resultPrint.status).json(resultPrint)
	},
	responsePagination: (res, status, error, message, pageDetail, data, redisNeeded) => {
		let resultPrint = {}
		resultPrint.status = status || 200
		resultPrint.error = error || false
		resultPrint.message = message || 'Success'
		resultPrint.pageDetail = pageDetail || {}
		resultPrint.data = data || {}

		if (redisNeeded) {
			const redisData = JSON.stringify(resultPrint.data)
			redisClient.setex(redisNeeded, 3600, redisData)
		}

		return res.status(resultPrint.status).json(resultPrint)
	}
}
