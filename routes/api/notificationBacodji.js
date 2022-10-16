const router = require('express').Router()
const {getBacodjiNotificationController, deleteBacodjiNotificationController} = require('../../controllers/notificationBacodjiController')
router.get('/', getBacodjiNotificationController)
router.delete('/', deleteBacodjiNotificationController)


module.exports = router