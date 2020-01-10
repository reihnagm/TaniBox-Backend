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
                    id: user[0].id,
                    name: user[0].name,
                    email: user[0].email,
                    role: user[0].role
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

        let error = false

        const email = request.body.email
        const OTP = request.body.OTP
        const checkOTP = await User.getDBOTP(email)

        if(OTP !== checkOTP[0].OTP) {
            error = true
            misc.response(response, 500, true, 'Oops!, OTP is not match')
        }

        const getOTP = () => {
             const digits = '0123456789';
             let OTP = '';
             for (let i = 0; i < 4; i++ ) {
                 OTP += digits[Math.floor(Math.random() * 10)];
             }
             return OTP
        }


        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                type: "OAuth2",
                user: process.env.USER_MAIL,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                accessToken: process.env.ACCESS_TOKEN,
                refreshToken: process.env.REFRESH_TOKEN
           },
       })

        try {
            const checkUser = await User.checkUser(email)

            if(checkUser.length === 0) {
                error = true
                misc.response(response, 500, true, 'Oops!, email not exists')
            }

            if( error === false) {
                const data = await User.updateOTP(email, getOTP())

                if(data) {
                    const getDBOTP = await User.getDBOTP(email)

                    await transporter.sendMail({
                        from: "Administrator <taniboxsandbox@gmail.com>",
                        to: email,
                        subject: "Reset Password",
                        html: `Untuk merubah password, silahkan masukan kode OTP dibawah ini dibawah ini. <br><b>${getDBOTP[0].OTP}</b>`
                    })
                }

                misc.response(response, 200, false, 'Successfull email sent')
            }

        } catch (error) {
            error = true
            console.error(error)
            misc.response(response, 500, true, 'Server error')
        }

    },

    updatePassword: async (request, response) => {
        let error = false

        const email = request.body.email
        const password = request.body.password
        const password_confirmation = request.body.password_confirmation

        if(password === password_confirmation) {
            error = false

            try {
                error = false

                if(error === false) {
                    const salt = await bcrypt.genSalt(10);
                    const passwordHash = await bcrypt.hash(password, salt)
                    await User.updatePassword(passwordHash, email)
                    misc.response(response, 200, false, 'Successfull update password')
                }
            } catch(error) {
                error = true
                console.error(error)
                misc.response(response, 500, true, 'Server error')
            }

        } else {
            error = true
            console.error(error)
            misc.response(response, 500, true, 'Oops!, password do not match')
        }

    }

}
