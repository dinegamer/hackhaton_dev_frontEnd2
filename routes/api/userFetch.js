const router = require('express').Router()
const {getUserControllerById} = require('../../controllers/userController')
router.post('/', getUserControllerById)




module.exports = router

