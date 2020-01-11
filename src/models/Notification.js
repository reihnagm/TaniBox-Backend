const connection = require('../configs/db')

module.exports = {
    addNotification: (receiver_id, sender_id, message) => {
        return new Promise((resolve, reject) => {
            query = `INSERT INTO notifications (receiver_id, sender_id, message) VALUES ('${receiver_id}', '${sender_id}', '${message}')`
            connection.query(query, (error, result) => {
                if(error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    deleteNotification: (notification_id) => {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM notifications WHERE id = '${notification_id}'`
            connection.query(query, (error, result) => {
                if(error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    }
}
