const pool = require("../config/dbpg")
const Matieres = require("../models/Matiere")

exports.getAllmatieres = async (req, res) => {
    try {
        const matieres = await pool.query(`SELECT * FROM "Matieres" order by id_matiere` )
        res.json(matieres.rows)
    } catch (err) {
        console.error(err.message)
    }
}
exports.getOneMatieres = async (req, res) => {
    try {
        const matiereId = req.params.id
        const OneMatiere = await pool.query(`SELECT * FROM "Matieres" WHERE id_matiere = $1`, [matiereId])
        if (OneMatiere) {
            res.json(OneMatiere.rows[0]);
          } else {
            res.status(404).json({ message: 'OneMatiere not found' });
          }
    } catch (err) {
        console.error(err.message)
    }
}

exports.deleteMatiere = async (req, res) => {
    try {
        const matiereId = req.params.id
        const OneMatiere = await pool.query(`DELETE FROM "Matieres" WHERE id_matiere = $1`, [matiereId])
        res.json('the selected course was deleted')
    } catch (err) {
        console.error(err.message)
    }
}
exports.createMatiere = async (req, res) => {
    const {nom_matiere} = req.body
    const Course = await Matieres.create({
        nom_matiere: nom_matiere
    })
  
    console.log(Course)
    res.json(Course)
}