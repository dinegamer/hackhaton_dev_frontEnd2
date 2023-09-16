const router = require('express').Router()
const {getBacodjiNotificationController, deleteBacodjiNotificationController, addNotificationController} = require('../../controllers/notificationBacodjiController')
router.get('/', getBacodjiNotificationController)
router.delete('/', deleteBacodjiNotificationController)
router.post('/', addNotificationController)

module.exports = router