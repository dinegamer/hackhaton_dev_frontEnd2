const router = require('express').Router()
const {updateUserRoleController} = require('../../controllers/userController')
router.post('/', updateUserRoleController)

module.exports = router

