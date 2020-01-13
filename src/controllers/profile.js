const Profile = require('../models/Profile')
const fs = require('fs-extra')
const misc = require('../helper/misc')
const redis = require('redis')
const redisClient = redis.createClient()

module.exports = {

    getProfile: async (request, response) => {
        const userId = request.params.id
        try {
            const checkRole = await Profile.checkRole(userId)
            if (checkRole.length === 0) {
                throw new Error('User not found')
            }
            const profile = checkRole[0].role === 'buyer' ? await Profile.detailBuyer(userId) : await Profile.detailSeller(userId)

            // if (profile.length === 0) {
            //     throw new Error('Profile not found')
            // }
            misc.response(response, 200, false, 'Successfull get single profile', profile, request.originalUrl)
        } catch(error) {
            console.error(error.message)
            misc.response(response, 500, true, error.message)
        }
    },

    createProfile: async (request, response) => {
        try {
            const userId = request.body.user_id
            const checkRole = await Profile.checkRole(userId)
            if (checkRole.length === 0 || checkRole === null) {
                return misc.response(response, 400, false, 'User not found')
            }
            let requireCheck = []
            let data = {}
            if (checkRole[0].role === 'buyer') {
                const {
                    user_id,
                    province,
                    province_name,
                    city,
                    city_name,
                    kecamatan,
                    address,
                    postal_code,
                    phone,
                } = request.body

                !user_id ? requireCheck.push('user_id is required') : ''
                !province ? requireCheck.push('province is required') : ''
                !city ? requireCheck.push('city is required') : ''
                !kecamatan ? requireCheck.push('kecamatan is required') : ''
                !address ? requireCheck.push('address is required') : ''
                !postal_code ? requireCheck.push('postal_code is required') : ''
                !phone ? requireCheck.push('phone is required') : ''

                if (requireCheck.length) {
                    return misc.response(response, 400, false, 'Not Valid', { errors: [{ msg: requireCheck }] })
                }

                data = {
                    province,
                    province_name,
                    city,
                    city_name,
                    kecamatan,
                    address,
                    postal_code,
                    phone,
                    user_id,
                }
            } else {
                const {
                    user_id,
                    name_of_store,
                    address1,
                    province1,
                    province1_name,
                    city1,
                    city1_name,
                    kecamatan1,
                    postal_code1,
                    address2,
                    province2,
                    province2_name,
                    city2,
                    city2_name,
                    kecamatan2,
                    postal_code2,
                    phone,
                } = request.body

                !user_id ? requireCheck.push('user_id is required') : ''
                !name_of_store ? requireCheck.push('name_of_store is required') : ''
                !address1 ? requireCheck.push('address1 is required') : ''
                !province1 ? requireCheck.push('province1 is required') : ''
                !city1 ? requireCheck.push('city1 is required') : ''
                !kecamatan1 ? requireCheck.push('kecamatan1 is required') : ''
                !postal_code1 ? requireCheck.push('postal_code1 is required') : ''
                !address2 ? requireCheck.push('address2 is required') : ''
                !province2 ? requireCheck.push('province2 is required') : ''
                !city2 ? requireCheck.push('city2 is required') : ''
                !kecamatan2 ? requireCheck.push('kecamatan2 is required') : ''
                !postal_code2 ? requireCheck.push('postal_code2 is required') : ''
                !phone ? requireCheck.push('phone is required') : ''

                if (requireCheck.length) {
                    return misc.response(response, 400, false, 'Not Valid', { errors: [{ msg: requireCheck }] })
                }

                data = {
                    name_of_store,
                    address1,
                    province1,
                    province1_name,
                    city1,
                    city1_name,
                    kecamatan1,
                    postal_code1,
                    address2,
                    province2,
                    province2_name,
                    city2,
                    city2_name,
                    kecamatan2,
                    postal_code2,
                    phone,
                    user_id,
                }
            }

            const created = await Profile.storeProfile(checkRole[0].role, data)
            const payload = {
                user: {
                    id: created.insertId
                }
            }
            redisClient.flushdb()
            misc.response(response, 200, false, 'Success create profile', payload)
        } catch(error) {
            console.error(error.message);
            misc.response(response, 500, true, 'Server error')
        }
    },

    updateProfile: async (request, response) => {
        try {
            const userId = request.body.user_id
            const checkRole = await Profile.checkRole(userId)
            if (checkRole.length === 0) {
                return misc.response(response, 400, false, 'User not found')
            }
            let requireCheck = []
            let data = {}
            let nameSend = ''
            if (checkRole[0].role === 'buyer') {
                const {
                    user_id,
                    name,
                    province,
                    province_name,
                    city,
                    city_name,
                    kecamatan,
                    address,
                    postal_code,
                    phone,
                } = request.body

                !user_id ? requireCheck.push('user_id is required') : ''
                !name ? requireCheck.push('name is required') : ''
                !province ? requireCheck.push('province is required') : ''
                !city ? requireCheck.push('city is required') : ''
                !kecamatan ? requireCheck.push('kecamatan is required') : ''
                !address ? requireCheck.push('address is required') : ''
                !postal_code ? requireCheck.push('postal_code is required') : ''
                !phone ? requireCheck.push('phone is required') : ''

                if (requireCheck.length) {
                    return misc.response(response, 400, false, 'Not Valid', { errors: [{ msg: requireCheck }] })
                }

                nameSend = name

                data = [
                    province,
                    province_name,
                    city,
                    city_name,
                    kecamatan,
                    address,
                    postal_code,
                    phone,
                    user_id,
                ]
            } else {
                const {
                    user_id,
                    name_of_seller,
                    name_of_store,
                    address,
                    province,
                    province_name,
                    city,
                    city_name,
                    kecamatan,
                    postal_code,
                    phone,
                    city1,
                    postal_code1,
                } = request.body

                !user_id ? requireCheck.push('user_id is required') : ''

                if (requireCheck.length) {
                    return misc.response(response, 400, false, 'Not Valid', { errors: [{ msg: requireCheck }] })
                }

                nameSend = name_of_seller
                const pc = postal_code ? postal_code : postal_code1
                const ct = city ? city : city1

                data = [
                    name_of_store,
                    address,
                    province,
                    province_name,
                    ct,
                    city_name,
                    kecamatan,
                    pc,
                    address,
                    province,
                    province_name,
                    ct,
                    city_name,
                    kecamatan,
                    pc,
                    phone,
                    user_id,
                ]
            }
            
            const profile = checkRole[0].role === 'buyer' ? await Profile.detailBuyer(userId) : await Profile.detailSeller(userId)

            if (profile.length === 0) {
                return misc.response(response, 400, false, 'Profile not found')
            }

            await Profile.updateName(userId, nameSend)
            await Profile.updateProfile(checkRole[0].role, data)
            redisClient.flushdb()
            misc.response(response, 200, false, 'Success edit profile')

        } catch(error) {
            console.error(error.message);
            misc.response(response, 500, true, 'Server error')
        }
    },

    deleteProfile: async (request, response) => {

        const userId = request.body.user_id

        try {

            const checkRole = await Profile.checkRole(userId)

            if (checkRole.length === 0) {
                return misc.response(response, 400, false, 'User not found')
            }

            checkRole[0].role === 'buyer' ? await Profile.detailBuyer(userId) : await Profile.detailSeller(userId)

            checkRole[0].role === 'buyer' ? await Profile.deleteBuyer(userId) : await Profile.deleteSeller(userId)
            await Profile.deleteUser(userId)
            redisClient.flushdb()
            misc.response(response, 200, false, 'Success delete profile')

        } catch(error) {
            console.log(error.message)
            misc.response(response, 500, true, 'Server error')
        }
    },

    uploadBuyer: async (request, response, next) => {
        let error = false
        if(request) {
            if(request.file) {

                if(request.file.size >= 5242880) {
                    const message = 'Oops!, Size cannot more than 5MB'
                     misc.response(response, 400, false, message)
                     error = true
                    fs.unlink(`public/images/profile/${request.file.filename}`, function(error) {
                        if (error) misc.response(response, 400, false, error)
                    })
                }

                const file = request.file.filename
                const extension = file.split('.')
                const filename = extension[extension.length - 1]

                if(!isImage(filename)) {
                    const message = 'Oops!, File allowed only JPG, JPEG, PNG, GIF, SVG'
                    misc.response(response, 400, false, message)
                    error = true
                    fs.unlink(`public/images/profile/${request.file.filename}`, function(error) {
                        if (error) misc.response(response, 400, false, error)
                    })
                }

                function isImage(filename) {
                    switch (filename) {
                        case 'jpg':
                        case 'jpeg':
                        case 'png':
                        case 'gif':
                        case 'svg':
                            return true
                        }
                        return false
                }
            }
        }

        const user_id = request.body.user_id
        const photo = request.file.filename
        console.log(photo);

        try {
            if(error === false) {
                await Profile.uploadBuyer(photo, user_id)
                redisClient.flushdb()
                misc.response(response, 200, false, 'Success upload profile buyer')
            }
        } catch(error) {
            console.error(error)
            misc.response(response, 500, true, 'Server error')
        }

    },

    uploadSeller: async (request, response, next) => {
        let error = false
        if(request) {
            if(request.file) {

                if(request.file.size >= 5242880) {
                    const message = 'Oops!, Size cannot more than 5MB'
                     misc.response(response, 400, false, message)
                     error = true
                    fs.unlink(`public/images/profile/${request.file.filename}`, function(error) {
                        if (error) misc.response(response, 400, false, error)
                    })
                }

                const file = request.file.filename
                const extension = file.split('.')
                const filename = extension[extension.length - 1]

                if(!isImage(filename)) {
                    const message = 'Oops!, File allowed only JPG, JPEG, PNG, GIF, SVG'
                    misc.response(response, 400, false, message)
                    error = true
                    fs.unlink(`public/images/profile/${request.file.filename}`, function(error) {
                        if (error) misc.response(response, 400, false, error)
                    })
                }

                function isImage(filename) {
                    switch (filename) {
                        case 'jpg':
                        case 'jpeg':
                        case 'png':
                        case 'gif':
                        case 'svg':
                            return true
                        }
                        return false
                }
            }
        }

        const user_id = request.body.user_id
        const photo = request.file.filename
        console.log(photo);

        try {
            if(error === false) {
                await Profile.uploadSeller(photo, user_id)
                redisClient.flushdb()
                misc.response(response, 200, false, 'Success upload profile seller')
            }
        } catch(error) {
            console.error(error)
            misc.response(response, 500, true, 'Server error')
        }

    },

    uploadStore: async (request, response, next) => {
        let error = false
        if(request) {
            if(request.file) {

                if(request.file.size >= 5242880) {
                    const message = 'Oops!, Size cannot more than 5MB'
                     misc.response(response, 400, false, message)
                     error = true
                    fs.unlink(`public/images/profile/${request.file.filename}`, function(error) {
                        if (error) misc.response(response, 400, false, error)
                    })
                }

                const file = request.file.filename
                const extension = file.split('.')
                const filename = extension[extension.length - 1]

                if(!isImage(filename)) {
                    const message = 'Oops!, File allowed only JPG, JPEG, PNG, GIF, SVG'
                    misc.response(response, 400, false, message)
                    error = true
                    fs.unlink(`public/images/profile/${request.file.filename}`, function(error) {
                        if (error) misc.response(response, 400, false, error)
                    })
                }

                function isImage(filename) {
                    switch (filename) {
                        case 'jpg':
                        case 'jpeg':
                        case 'png':
                        case 'gif':
                        case 'svg':
                            return true
                        }
                        return false
                }
            }
        }

        const user_id = request.body.user_id
        const photo = request.file.filename
        console.log(photo);

        try {
            if(error === false) {
                await Profile.uploadStore(photo, user_id)
                redisClient.flushdb()
                misc.response(response, 200, false, 'success upload store image')
            }
        } catch(error) {
            console.error(error)
            misc.response(response, 500, true, 'Server error')
        }

    },

}
