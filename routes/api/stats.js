const router = require('express').Router()
const {getStatsController} = require('../../controllers/statsController')
router.get('/', getStatsController)



module.exports = router