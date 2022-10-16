const router = require('express').Router()
const {getStockControllerById, updateStockController} = require('../../controllers/stockController')
router.post('/', getStockControllerById)
router.put('/', updateStockController)



module.exports = router