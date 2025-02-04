const pool = require("../config/dbpg")
const Classes = require("../models/Classe")

exports.getAllGroup = async (req, res) => {
    try {
        const groups = await pool.query(`SELECT * FROM "Classes" ORDER BY nom_classe`)
        res.json(groups.rows)
    } catch (err) {
        console.error(err.message)
    }
}

exports.getOneGroup = async (req, res) => {
    try {
        const id_classe = req.params.id
        const oneClasse = await pool.query(`SELECT * FROM "Classes" WHERE id_classe = $1`, [id_classe])
        if (oneClasse) {
            res.json(oneClasse.rows[0]);
          } else {
            res.status(404).json({ message: 'oneClasse not found' });
          }
    } catch (err) {
        console.error(err.message)
    }
}

exports.deleteClasse = async (req, res) => {
    try {
        const classeId = req.params.id
        // const OneClasse = await pool.query(`DELETE FROM "Classes" WHERE id_classe = $1`, [classeId])
        const deleteOneClasse = await Classes.destroy({where: {id_classe: classeId}})
        res.json('the selected class is deleted')
    } catch (err) {
        console.error(err.message)
    }
}

exports.createClasse = async (req, res) => {
    try {
        const {nom_classe, effectif_classe, taux_hor} = req.body
        const Classe = await Classes.create({
            nom_classe: nom_classe,
            effectif_classe: effectif_classe,
            taux_hor: taux_hor
        })
        res.json(Classe)
    } catch (err) {
        console.error(err.message)
    }
}





