const router = require('express').Router()
const {getStockHPDController, deleteStockHPDController} = require('../../controllers/stockControllerHPD')
router.get('/', getStockHPDController)
router.delete('/:id', deleteStockHPDController)


module.exports = router