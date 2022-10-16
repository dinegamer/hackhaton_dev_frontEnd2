const router = require('express').Router()
const {getCategoryController, addCategoryController} = require('../../controllers/categoryController')
router.get('/', getCategoryController)
router.post('/', addCategoryController)


module.exports = router