const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const config = require('./src/configs/configs')
const cors = require('cors')
const app = express()
const port = config.port
const routerNav = require('./src/index')
const timest = require('express-timestamp')

app.use(express.static('public'))

app.use(cors())

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(timest.init)
app.use('/', routerNav)

app.listen(port, () => {
    console.log(`Server listening on PORT ${port}`)
})

app.get('*', (request, response) => {
    response.sendStatus(404)
})

module.exports = app
