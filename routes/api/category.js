const router = require('express').Router()
const {getCategoryController, addCategoryController, deleteCategoryController} = require('../../controllers/categoryController')
router.get('/', getCategoryController)
router.post('/', addCategoryController)
router.delete('/:id', deleteCategoryController)


module.exports = router