const express = require('express')
const router = express.Router()
const { loginUser , signupUser } = require('../controllers/userController')
const userValidator = require('../middleware/userValidator')

// login route
router.post('/login', loginUser)

// signup route  
router.post('/signup', userValidator, signupUser)


module.exports = router
