const router = require('express').Router()
const {getHypodromeNotificationController, deleteHypodromeNotificationController} = require('../../controllers/notificationHypodromeController')
router.get('/', getHypodromeNotificationController)
router.delete('/', deleteHypodromeNotificationController)


module.exports = router