const express = require('express')
const userController = require('../controller/userController')
const authController = require('../controller/authController')
const router = express.Router()

//LOGIN ROUTE
router.route('/login').post(authController.login)
router.route('/').post(userController.createUser).get( userController.allUsers)

module.exports = router