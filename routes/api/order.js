const router = require('express').Router()
const {getOrderController, addOrderController} = require('../../controllers/orderController')
router.get('/', getOrderController)
router.post('/', addOrderController)


module.exports = router