const router = require('express').Router()
const {getNotificationController, deleteNotificationController} = require('../../controllers/notificationController')
router.get('/', getNotificationController)
router.delete('/', deleteNotificationController)


module.exports = router