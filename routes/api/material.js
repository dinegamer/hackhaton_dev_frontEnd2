const router = require('express').Router()
const {getMaterialController, addMaterialController, deleteMaterialController} = require('../../controllers/materialController')
router.get('/', getMaterialController)
router.post('/', addMaterialController)
router.delete('/:id', deleteMaterialController)


module.exports = router