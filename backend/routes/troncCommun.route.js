const express = require('express')
const router = express.Router()
const troncCommun = require("../controllers/troncCommun.controller")
router.get('/troncCommun', troncCommun.getAllTroncCommun)
router.delete('/troncCommun/:id', troncCommun.deleteTroncCommun)
router.post('/troncCommun', troncCommun.createTroncCommun)
module.exports = router;
