const express = require('express')
const Notification = require('../controllers/notification')
const Route = express.Router()

Route.post('/', Notification.addNotification)
     .delete('/:notification_id/delete', Notification.deleteNotification)


module.exports = Route
