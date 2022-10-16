const router = require('express').Router()
const {getSingleUserController} = require('../../controllers/userController')
router.post('/', getSingleUserController)




module.exports = router

