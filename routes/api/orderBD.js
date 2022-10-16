const router = require('express').Router()
const {getOrderBDController, getOrderBDControllerById} = require('../../controllers/orderControllerBD')
router.get('/', getOrderBDController)
router.post('/', getOrderBDControllerById)


module.exports = router