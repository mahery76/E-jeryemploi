const express = require('express')
const router = express.Router()
const affectation = require("../controllers/affectation.controller")
router.get('/affectation/', affectation.getAllAffectation)
router.get('/TeacherAffectation/:id', affectation.getTeacherAffectation)
router.get('/GroupAffectation/:id', affectation.getGroupAffectation)
router.get('/affectation/:id', affectation.getOneAffectation)
router.get('/CCAffectation/', affectation.getCommonCoreAffectation)
router.delete('/affectation/:id', affectation.deleteAffectation)
router.post('/affectation', affectation.createAffectation)
router.patch('/affectation/:id', affectation.setTroncCommunAffectation)
router.put('/affectationEns/:id')

module.exports = router;
