const router = require('express').Router()
const {getStockController, addStockController, deleteStockController} = require('../../controllers/stockController')
router.get('/', getStockController)
router.post('/', addStockController)
router.delete('/:id', deleteStockController)


module.exports = router