const pool = require("../config/dbpg")
const isSameDay = require("../functions/isSameDay")
const Salles = require("../models/Salle")

exports.getAllSAlle = async (req, res) => {
    try {
        const salles = await pool.query(`SELECT * FROM "Salles" order by id_salle`)
        res.json(salles.rows)
    } catch (err) {
        console.error(err.message)
    }
}
exports.getSalleLibre = async (req, res) => {
    try {
        const { id_cren, date, id_tronc_commun } = req.query
        const new_date_occupation = new Date(date)
        console.log('ilay date nalefa', new_date_occupation)
        console.log('ilay cren nalefa', id_cren)
        console.log('ilay tc nalefa', id_tronc_commun)

        const salles = (await pool.query(`SELECT * FROM "Salles"`)).rows


        const formattedDate = new_date_occupation.toISOString().split('T')[0]
        const query = `
        SELECT * FROM "Occupations"
        WHERE DATE("Occupations".date_occupation) = $1 AND
        "Occupations".id_cren = $2
        `
        const matchedOcc = (await pool.query(query, [formattedDate, id_cren])).rows
        const salleLibre = []

        const salleTroncCommun = []
        for (let i = 0; i < salles.length; i++) {
            if (matchedOcc.some(item => (
                item.id_tronc_commun !== null &&
                item.id_tronc_commun === id_tronc_commun &&
                item.id_salle === salles[i].id_salle
            ))) {
                salleTroncCommun.push(salles[i])
            }
        }
        
        for (let i = 0; i < salles.length; i++) {
            if (
                !matchedOcc.some(item => (
                    (item.id_tronc_commun === null || item.id_tronc_commun !== id_tronc_commun)
                    &&
                    item.id_salle === salles[i].id_salle
                ))
            ) {
                salleLibre.push(salles[i])
            }
        }
        console.log('manomboka eto')
        if (salleTroncCommun.length > 0) {
            res.json(salleTroncCommun)
        }
        else {
            res.json(salleLibre)
        }

    } catch (err) {
        console.error(err.message)
    }
}
exports.createSalle = async (req, res) => {
    try {
        const { nom_salle, capacite } = req.body
        const salle = await Salles.create({
            nom_salle: nom_salle,
            capacite: capacite
        })
        res.json(salle)
    } catch (err) {
        console.error(err.message)
    }
}
exports.deleteSalle = async (req, res) => {
    try {
        const salleId = req.params.id
        const deleteSalle = await Salles.destroy({ where: { id_salle: salleId }})
        res.json('the selected salle was deleted')

    } catch (err) {
        console.error(err.message)
    }
}

