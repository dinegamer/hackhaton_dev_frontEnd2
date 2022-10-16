const router = require('express').Router()
const {getPropertyController, addPropertyController} = require('../../controllers/propertyController')
router.get('/', getPropertyController)
router.post('/', addPropertyController)


module.exports = router