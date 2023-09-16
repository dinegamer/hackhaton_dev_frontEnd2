const router = require('express').Router()
const {getStockController, addStockController, deleteStockController, updateStockControllerTwo} = require('../../controllers/stockController')
router.get('/', getStockController)
router.post('/', addStockController)
router.delete('/:id', deleteStockController)
router.put('/', updateStockControllerTwo)


module.exports = router