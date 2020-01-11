const Notification = require('../models/Notification')
const misc = require('../helper/misc')

module.exports = {

    addNotification: async (request, response) => {

        const receiver_id = request.body.receiver_id
        const sender_id = request.body.sender_id
        const message = request.body.message

        try {
            await Notification.addNotification(receiver_id, sender_id, message)
            misc.response(response, 200, false, 'Successfull add notification')
        } catch(error) {
            console.error(error)
            misc.response(response, 500, true, 'Server error')
        }

    },

    deleteNotification: async(request, response) => {

        const notification_id = request.params.notification_id

        try {
            await Notification.deleteNotification(notification_id)
            misc.response(response, 200, false, 'Successfull delete notification')
        } catch(error) {
            console.error(error)
            misc.response(response, 500, true, 'Server error')
        }

    }

}
