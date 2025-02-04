const express = require('express')
const router = express.Router()
const Creneaus = require("../controllers/creneau.controller")

router.get('/creneau', Creneaus.getAllCren)
module.exports = router