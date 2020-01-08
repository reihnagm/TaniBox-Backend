require('dotenv').config()

const Profile = require('../models/Profile')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {

    getProfile: async (request, response) => {

        const userId = request.body.user_id

        try {

            const checkRole = await Profile.checkRole(userId)
            
            const profile = checkRole[0].role === 'buyer' ? await Profile.detailBuyer(userId) : await Profile.detailSeller(userId)

            if (profile.length === 0) {
                return response.status(400).json({ errors: [{ msg: 'Profile not found' }] })
            }

            response.status(200).json(profile)

        } catch(error) {
            console.error(error.message)
            response.status(500).send('Server error')
        }
    },

    createProfile: async (request, response) => {
        try {
            const userId = request.body.user_id
            const checkRole = await Profile.checkRole(userId)
            let requireCheck = []
            let data = {}
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
                    return response.status(400).json({ errors: [{ msg: requireCheck }] });
                }

                data = { 
                    name,
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
                    name_of_seller,
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
                !name_of_seller ? requireCheck.push('name_of_seller is required') : ''
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
                    return response.status(400).json({ errors: [{ msg: requireCheck }] });
                }

                data = { 
                    name_of_seller,
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
            response.json(payload)

        } catch(error) {
            console.error(error.message);
            response.status(500).send('Server error');
        }
    },

    updateProfile: async (request, response) => {
        try {
            const userId = request.body.user_id
            const checkRole = await Profile.checkRole(userId)
            let requireCheck = []
            let data = {}
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
                    return response.status(400).json({ errors: [{ msg: requireCheck }] });
                }

                data = [
                    name,
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
                !name_of_seller ? requireCheck.push('name_of_seller is required') : ''
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
                    return response.status(400).json({ errors: [{ msg: requireCheck }] });
                }

                data = [ 
                    name_of_seller,
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
                ]
            }

            await Profile.updateProfile(checkRole[0].role, data)
            response.json('edit success')

        } catch(error) {
            console.error(error.message);
            response.status(500).send('Server error');
        }
    },

    deleteProfile: async (request, response) => {

        const userId = request.body.user_id

        try {

            const checkRole = await Profile.checkRole(userId)
            
            const profile = checkRole[0].role === 'buyer' ? await Profile.detailBuyer(userId) : await Profile.detailSeller(userId)

            if (profile.length === 0) {
                return response.status(400).json({ errors: [{ msg: 'Profile not found' }] })
            }

            checkRole[0].role === 'buyer' ? await Profile.deleteBuyer(userId) : await Profile.deleteSeller(userId)

            response.status(200).json({msg: 'data deleted'})

        } catch(error) {
            console.error(error.message)
            response.status(500).send('Server error')
        }
    },

}
