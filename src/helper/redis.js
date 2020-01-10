const misc = require('./misc')
const redis = require('redis')
const redisClient = redis.createClient()

module.exports = {
  checkCache: (req, res, next) => {
    const key = req.originalUrl

    redisClient.get(key, (err, data) => {
      if (err) {
        return misc.response((res), 500, true, 'Redis error', err)
      }
      if (data != null) {
        misc.response((res), 200, false, 'Successfull - cache', JSON.parse(data))
        console.log('cache');
      } else {
        // proceed to next function
        console.log('real');
        next()
      }
    })
  }
}
