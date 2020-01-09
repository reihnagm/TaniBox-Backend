const Notification = require('../models/Notification')

module.exports = {

    addNotification: async (response, request) => {

        const receive_id = request.body.receive_id
        const sender_id = request.body.sender_id
        const message = request.body.message

        try {
            await Notification.addNotification(, receive_id, sender_id, message)
            misc.response(response, 200, false, 'Successfull add notification')
        } catch(error) {
            console.error(error)
            misc.response(response, 500, true, 'Server error')
        }

    },
    deleteNotification: async(response, request) => {

        const notificaiton_id = request.body.notification_id

        try {
            await Notification.deleteNotification(notification_id)
            misc.response(response, 200, false, 'Successfull delete notification')
        } catch(error) {
            console.error(error)
            misc.response(response, 500, true, 'Server error')
        }

    }

}
