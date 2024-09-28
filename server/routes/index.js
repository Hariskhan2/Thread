const express = require('express')
const registerUser = require('../controller/registerUser')
const checkEmail = require('../controller/checkEmail')
const checkPassword = require('../controller/checkPassword')
const userDetails = require('../controller/userDetails')
const logout = require('../controller/logout')
const updateUserDetails = require('../controller/updateUserDetails')


const router= express.Router()


// create user API


//register
router.post('/register',registerUser)

//login
router.post('/email',checkEmail)

router.post('/password',checkPassword)

//login user details

router.get('/user-details',userDetails)


//logout
router.get('/logout',logout)

//update use details
router.post('/update-user', updateUserDetails)



module.exports= router