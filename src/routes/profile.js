const express = require('express')
const multer = require('multer')
const Profile = require('../controllers/profile')
const Route = express.Router()

Route.get('/', Profile.getProfile)
Route.post('/', Profile.createProfile)
Route.put('/', Profile.updateProfile)
Route.delete('/', Profile.deleteProfile)

module.exports = Route
