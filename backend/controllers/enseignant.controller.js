const pool = require("../config/dbpg")
const Enseignants = require("../models/Enseignant")
const Users = require("../models/User")

exports.getAllEnseignant = async (req, res) => {
    try {
        const enseignants = await pool.query(`SELECT * FROM "Enseignants" order by id_ens`)
        res.json(enseignants.rows)
    } catch (err) {
        console.error(err.message)
    }
}

exports.getOneEnseignant = async (req, res) => {
    try {
        const enseignantId = req.params.id
        const OneEnseignant = await pool.query(`SELECT * FROM "Enseignants" WHERE id_ens = $1`, [enseignantId])
        if (OneEnseignant) {
            res.json(OneEnseignant.rows[0]);
          } else {
            res.status(404).json({ message: 'OneEnseignant not found' });
          }
    } catch (err) {
        console.error(err.message)
    }
}

exports.deleteEnseignant = async (req, res) => {
    try {
        const enseignantId = req.params.id
        // const OneEnseignant = await pool.query(`DELETE FROM "Enseignants" WHERE id_ens = $1`, [enseignantId])
        const deleteOneEns = await Enseignants.destroy({where: {id_ens: enseignantId}})
        res.json('the selected event was deleted')
    } catch (err) {
        console.error(err.message)
    }
}

exports.createEnseignant = async (req, res) => {
        const {mdp_user, email_user, nom_ens, coordonnees,  taux_hor} = req.body
        const User = await Users.create({
            email_user: email_user,
            mdp_user: mdp_user,
            role_user: "Enseignant"
        })
        const Ens = await Enseignants.create({
            nom_ens: nom_ens,
            coordonnees: coordonnees,
            email_ens: User.email_user,
            id_user: User.id_user
        }) 
        console.log(Ens)
        res.json(Ens)
}






