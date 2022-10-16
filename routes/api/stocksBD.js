const router = require('express').Router()
const {getStockBDController, deleteStockBDController} = require('../../controllers/stockControllerBD')
router.get('/', getStockBDController)
router.delete('/:id', deleteStockBDController)


module.exports = router