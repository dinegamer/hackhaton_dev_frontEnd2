const router = require('express').Router()
const {getHypodromeNotificationController, deleteHypodromeNotificationController, addNotificationController} = require('../../controllers/notificationHypodromeController')
router.get('/', getHypodromeNotificationController)
router.delete('/', deleteHypodromeNotificationController)
router.post('/', addNotificationController)

module.exports = router