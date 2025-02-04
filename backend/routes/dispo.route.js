const express = require('express')
const router = express.Router()
const dispo = require("../controllers/dispo.controller")

router.get('/dispo', dispo.getAlldispos)

router.get('/dispoECD', dispo.getDispoEnsCrenAndDates)

router.delete('/dispo/:id', dispo.deleteDispo)
router.post('/dispo', dispo.createDispo)



module.exports = router;