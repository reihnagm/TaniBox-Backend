require('dotenv').config()

const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {

    auth: async (request, response) => {
        try {
            const user = await User.auth(request.user.id)
            response.json(user);
        } catch (error) {
            console.error(error.message);
            response.status(500).send('Server Error')
        }
    },

    login: async (request, response) => {

        const { email, password } = request.body

        try {

            const user = await User.login(email)

            if (user.length === 0) {
                return response.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
            }

            const isMatch = await bcrypt.compare(password, user[0].password)

            if (!isMatch) {
                return response.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
            }

            const payload = {
                user: {
                    id: user[0].id
                }
            }

            const token = await jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 360000 })

            response.json({ token })

        } catch(error) {
            console.error(error.message)
            response.status(500).send('Server error')
        }
    },

    register: async (request, response) => {

        const { name, email, password, role } = request.body

        console.log(name, email, password, role)

        try {
                const user = await User.checkUser(email)

                if (user.length === 0)
                {
                    const salt = await bcrypt.genSalt(10);

                    const passwordHash = await bcrypt.hash(password, salt)

                    const data = { name, email, password:passwordHash, role }

                    const registered = await User.register(data)

                    const payload = {
                        user: {
                            id: registered.insertId
                        }
                    }

                    const token = await jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 360000 })

                    response.json('Success register')

                } else {
                    return response.status(400).json({ errors: [{ msg: 'User already exists' }] });
                }

        } catch(error) {
            console.error(error.message);
            response.status(500).send('Server error');
        }

    }
}
