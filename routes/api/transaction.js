const router = require('express').Router()
const {getTransactionController} = require('../../controllers/transactionController')
router.get('/', getTransactionController)



module.exports = router