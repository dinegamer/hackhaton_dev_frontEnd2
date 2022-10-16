const router = require('express').Router()
const {getStatsTwoController} = require('../../controllers/statsTwoController')
router.get('/', getStatsTwoController)



module.exports = router