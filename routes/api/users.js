const router = require("express").Router()
const {getUserController, addUserController,deleteUserController} = require('../../controllers/userController')
router.get('/', getUserController)
router.post('/', addUserController)
router.delete('/:id', deleteUserController)


module.exports = router

