const express = require('express')
const ControllerUser = require('../controller/controllerUser')
const { authorizationAdmin } = require('../middleware/authorization')
const authentication = require('../middleware/authentication')
const router = express.Router()

router.post('/add-user', authentication, authorizationAdmin, ControllerUser.createStaff)
router.post('/login', ControllerUser.login)

module.exports = router