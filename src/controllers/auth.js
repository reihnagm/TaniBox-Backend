require('dotenv').config()

const User = require('../models/User')
const nodemailer  = require('nodemailer')
const misc = require('../helper/misc')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {

    auth: async (request, response) => {

        const user_id = request.user.id

        try {
            const data = await User.auth(user_id)
            misc.response(response, 200, false, 'Successfull authentication', data)
        } catch (error) {
            console.error(error.message)
            misc.response(response, 500, true, 'Server error')
        }

    },

    login: async (request, response) => {

        const { email, password } = request.body

        try {

            const user = await User.login(email)

            if (user.length === 0) {
                return response.status(400).json({ errors: [{ msg: 'User not found in our database' }] })
            }

            const isMatch = await bcrypt.compare(password, user[0].password)

            if (!isMatch) {
                return response.status(400).json({ errors: [{ msg: 'Password do not match' }] })
            }

            const payload = {
                user: {
                    id: user[0].id
                }
            }

            const token = await jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 360000 })

            const data = {
                token,
                name: user[0].name,
                email: user[0].email,
                role: user[0].role
            }

            misc.response(response, 200, false, 'Successfull login', data)

        } catch(error) {
            console.error(error.message)
            misc.response(response, 500, true, 'Server error')
        }

    },

    register: async (request, response) => {

        const { name, email, password, role } = request.body

        try {
                const user = await User.checkUser(email)

                if (user.length === 0) {

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

                    misc.response(response, 200, false, 'Successfull register')

                } else {

                    return misc.response(response, 500, true, 'User already exists')

                }

        } catch(error) {
            console.error(error.message)
            misc.response(response, 500, true, 'Server error')
        }

    },

    forgotPassword: async (request, response) => {

        const email = request.body.email

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // NOTE : TRUE FOR 465, FALSE FOR OTHER PORTS
                auth: {
                    user: process.env.USER_EMAIL,
                    pass: process.env.USER_PASSWORD
                }
            })

        try {

          let info = await transporter.sendMail({
              from: "Administrator <admin@tanibox.mail>",
              to: "reihanagam7@gmail.com",
              subject: "Reset Password",
              text: "Untuk merubah password, silahkan klik link dibawah ini."
          })

        } catch (error) {
            console.error(error)
            misc.response(response, 500, true, 'Server error')
        }


    }

}
