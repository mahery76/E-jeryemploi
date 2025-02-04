const { query } = require("express")
const pool = require("../config/dbpg")
const Affectations = require("../models/Affectation")
   
exports.getAllAffectation = async (req, res) => {
    try {
        const query =  `
        SELECT 
        "Affectations".id_affectation,
        "Affectations".vh,
        "Affectations".vh_restante,
        "Classes".nom_classe,
        "Enseignants".nom_ens,
        "Matieres".nom_matiere,
        "Salles".nom_salle,
        "Tronc_communs".nom_tronc_commun 
        FROM "Affectations" 
        JOIN "Classes" ON "Affectations".id_classe = "Classes".id_classe
        JOIN "Enseignants" ON "Affectations".id_ens = "Enseignants".id_ens
        JOIN "Matieres" ON "Affectations".id_matiere = "Matieres".id_matiere
        LEFT JOIN "Salles" ON "Affectations".id_salle = "Salles".id_salle
        LEFT JOIN "Tronc_communs" ON "Affectations".id_tronc_commun = "Tronc_communs".id_tronc_commun
        ORDER BY id_affectation DESC
        `
        const AllAffec = await pool.query(query)
        if (AllAffec) {
            res.json(AllAffec.rows)  
        }
        else {
            res.status(404).json({ message: 'Affectation not found' });

        }
    } catch (err) {
        console.error(err.message)
    }
}
exports.getTeacherAffectation = async (req, res) => {
    try {
        const id_ens = req.params.id
        const teacherAffectations = await pool.query(`SELECT * FROM "Affectations" WHERE id_ens = $1 ORDER BY id_affectation`, [id_ens])
        res.json(teacherAffectations.rows)
    } catch (err) {
        console.error(err.message)
    }
}
exports.getGroupAffectation = async (req, res) => {
    try {
        const id_classe = req.params.id
        const query = `SELECT 
        "Affectations".id_affectation,
        "Matieres"."nom_matiere"
        FROM "Affectations" 
        JOIN "Matieres" ON "Affectations".id_matiere = "Matieres".id_matiere
        WHERE id_classe = $1 
        ORDER BY id_affectation`
        const groupAffectations = await pool.query(query, [id_classe])
        res.json(groupAffectations.rows)
    } catch (err) {
        console.error(err.message)
    }
}
exports.getOneAffectation = async (req, res) => {
    try {
        const id_affectation = req.params.id
        const query = `
        SELECT 
        "Affectations".vh,
        "Affectations".vh_restante,
        "Classes".id_classe,
        "Enseignants".id_ens,
        "Matieres".id_matiere,
        "Salles".id_salle,
        "Tronc_communs".id_tronc_commun 
        FROM "Affectations" 
        JOIN "Classes" ON "Affectations".id_classe = "Classes".id_classe
        JOIN "Enseignants" ON "Affectations".id_ens = "Enseignants".id_ens
        JOIN "Matieres" ON "Affectations".id_matiere = "Matieres".id_matiere
        LEFT JOIN "Salles" ON "Affectations".id_salle = "Salles".id_salle
        LEFT JOIN "Tronc_communs" ON "Affectations".id_tronc_commun = "Tronc_communs".id_tronc_commun
        WHERE id_affectation = $1
        `
        const OneAffectation = await pool.query(query, [id_affectation])
        if (OneAffectation) {
            res.json(OneAffectation.rows[0])
        }
        else {
            res.status(404).json({ message: 'Affectation not found' });

        }
    } catch (err) {
        console.error(err.message)
    }
}
exports.getCommonCoreAffectation = async (req, res) => {
    try {
        const query = `
        SELECT 
        "Classes".nom_classe,
        "Enseignants".nom_ens,
        "Matieres".nom_matiere,
        "Salles".nom_salle,
        "Tronc_communs".nom_tronc_commun 
        FROM "Affectations" 
        JOIN "Classes" ON "Affectations".id_classe = "Classes".id_classe
        JOIN "Enseignants" ON "Affectations".id_ens = "Enseignants".id_ens
        JOIN "Matieres" ON "Affectations".id_matiere = "Matieres".id_matiere
        JOIN "Tronc_communs" ON "Affectations".id_tronc_commun = "Tronc_communs".id_tronc_commun
        LEFT JOIN "Salles" ON "Affectations".id_salle = "Salles".id_salle
        WHERE "Affectations".id_tronc_commun IS NOT NULL
        ORDER BY "Affectations".id_affectation
        `
        const CCAffectation = await pool.query(query)
        if (CCAffectation) {
            res.json(CCAffectation.rows)
        }
        else {
            res.status(404).json({ message: 'Affectations not found' });
        }

    } catch (err) {
        console.error(err.message)
    }
}
exports.setTroncCommunAffectation = async (req, res) => {
    try {
        const id_affectation = req.params.id
        const id_tronc_commun = req.body.id_tronc_commun
        const OneAffectation = await pool.query(`UPDATE "Affectations" SET id_tronc_commun = $1 WHERE id_affectation = $2`, [id_tronc_commun,id_affectation])
        if (OneAffectation) {
            res.json({message: "Data patched succesfully"})
        }
        else {
            res.status(404).json({ message: 'Affectation not found' });
        }
    } catch (err) {
        console.error(err.message)
    }
}
exports.deleteAffectation = async (req, res) => {
    try {
        const AffectationId = req.params.id
        const OneAffectation = await pool.query(`DELETE FROM "Affectations" WHERE id_affectation = $1`, [AffectationId])
        res.json('the selected affec was deleted')
        console.log('deleted')
    } catch (err) {
        console.error(err.message)
    }
}
exports.createAffectation = async (req, res) => {
    try {
        const {vh, id_classe, id_matiere, id_ens, id_tronc_commun, id_salle } = req.body
        const Affectation = await Affectations.create({
            vh: vh,
            vh_restante: vh,
            id_classe: id_classe,
            id_ens: id_ens,
            id_matiere: id_matiere,
            id_tronc_commun: id_tronc_commun,
            id_salle: id_salle,
        })
        res.json(Affectation)
    } catch (err) {
        console.error(err.message)
    }
}

exports.updateEnsAffectation = async (req, res) => {
    try {
        const {id_ens} = req.body
        const {id_affectation} = req.params
        const updatedAffec = await pool.query(`
        UPDATE "Affectations" SET id_ens = $1 WHERE id_affectation = $2 RETURNING *
        `,[id_ens, id_affectation])
        res.json(updatedAffec.rows[0])

    } catch (err) {
        console.error(err.message)
    }
}