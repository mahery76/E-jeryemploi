const express = require('express')
const router = express.Router()
const matiere = require("../controllers/matiere.controller")

router.get('/matiere', matiere.getAllmatieres)
router.get('/matiere/:id', matiere.getOneMatieres)
router.delete('/matiere/:id', matiere.deleteMatiere)
router.post('/matiere', matiere.createMatiere)

module.exports = router;