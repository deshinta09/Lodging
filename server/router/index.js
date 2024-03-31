const express = require('express')
const router = express.Router()
const routerUser = require('./user')
const routerLodging = require('./lodging')
const routerType = require('./type')
const ControllerLodging = require('../controller/controllerLodging')
const authentication = require('../middleware/authentication')
const ControllerType = require('../controller/controllerType')

//public
router.get('/pub', ControllerLodging.publicLodging)
router.get('/pub/:id', ControllerLodging.lodgingById)
router.get('/type', ControllerType.allType)

router.use('/', routerUser)

router.use(authentication)
router.use('/lodgings', routerLodging)
router.use('/types', routerType)

module.exports = router