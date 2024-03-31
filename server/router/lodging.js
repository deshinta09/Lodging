const express = require('express')
const ControllerLodging = require('../controller/controllerLodging')
const { authorization } = require('../middleware/authorization')
const router = express.Router()
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })


router.get('/', ControllerLodging.allLodging)
router.post('/', ControllerLodging.addLodging)
router.get('/:id', ControllerLodging.lodgingById)
router.put('/:id', authorization, ControllerLodging.updateLodging)
router.patch('/:id', authorization, upload.single('imageUrl'), ControllerLodging.uploadImage)
router.delete('/:id', authorization, ControllerLodging.deleteLodging)

module.exports = router