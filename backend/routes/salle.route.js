const express = require('express')
const router = express.Router()
const salle = require("../controllers/salle.controller")
router.get('/salle', salle.getAllSAlle)
router.get('/salleLibre', salle.getSalleLibre)
router.delete('/salle/:id', salle.deleteSalle)
router.post('/salle', salle.createSalle) 
module.exports = router;


