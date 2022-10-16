const router = require('express').Router()
const {getOrderHPDController, getOrderHPDControllerById} = require('../../controllers/orderControllerHPD')
router.get('/', getOrderHPDController)
router.post('/', getOrderHPDControllerById)

module.exports = router