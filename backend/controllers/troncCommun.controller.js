const pool = require("../config/dbpg")

const Tronc_communs = require("../models/TroncCommun")
exports.getAllTroncCommun = async (req, res) => {
    try {
        const TC = await pool.query(`SELECT * FROM "Tronc_communs" order by id_tronc_commun`)
        res.json(TC.rows)
    } catch (err) {
        console.error(err.message)
    }
}
exports.deleteTroncCommun = async (req, res) => {
    try {
        const tcId = req.params.id
        const deleteTc = await Tronc_communs.destroy({where: {id_tronc_commun: tcId}})
        res.json('the selected tc was deleted')
    } catch (err) {
        console.error(err.message)
    }
}
exports.createTroncCommun = async (req, res) => {
    try {
        const {nom_tronc_commun} = req.body
        const tc = await Tronc_communs.create({
            nom_tronc_commun: nom_tronc_commun
        })
        res.json(tc)
    } catch (err) {
        console.error(err.message)
    }
}
