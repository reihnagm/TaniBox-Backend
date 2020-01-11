const misc = require('../helper/misc')

module.exports = {
    receiveNotif: async (request, response) => {
        console.log(request.body);
        return misc.response(response, 200, false, 'Successfull')
    }
}
