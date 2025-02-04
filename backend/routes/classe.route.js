const express = require('express')
const router = express.Router()
const group = require("../controllers/classe.controller")

router.get('/group', group.getAllGroup)
router.get('/group/:id', group.getOneGroup)
router.delete('/classe/:id', group.deleteClasse)
router.post('/classe', group.createClasse)

module.exports = router;
