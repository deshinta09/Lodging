const express = require('express')
const ControllerType = require('../controller/controllerType')
const router = express.Router()

router.get('/', ControllerType.allType)
router.post('/', ControllerType.addType)
router.put('/:id', ControllerType.updateType)
router.delete('/:id', ControllerType.deleteType)

module.exports = router