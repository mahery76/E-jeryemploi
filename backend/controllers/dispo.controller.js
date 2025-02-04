const pool = require("../config/dbpg")
const Dispos = require("../models/Dispo") 

exports.getAlldispos = async (req, res) => {
    try {
        const dispos = await pool.query(`SELECT * from "Dispos"`)
        res.json(dispos.rows)
    } catch (err) {
        console.error(err.message) 
    }
}

// list all disp with given id_ens and id_cren. And the date will be compared  
exports.getDispoEnsCrenAndDates = async (req, res) => {
    try {
        const {id_ens, id_cren} = req.query
        const OneDispo = await pool.query(`SELECT * FROM "Dispos" WHERE id_ens = $1 AND id_cren= $2`, [id_ens, id_cren])
        if (OneDispo) {
            res.json(OneDispo.rows);
          } else {
            res.status(404).json({ message: 'One dispo not found' });
          }
    } catch (err) {
        console.error(err.message)
    }
}

exports.deleteDispo = async (req, res) => {
    try {
        const id_dispo = req.params.id
        const OneDispo = await pool.query(`DELETE FROM "Dispos" WHERE id_dispo = $1`, [id_dispo])
        res.json('the selected dispo was deleted')
    } catch (err) {
        console.error(err.message)
    }
}
exports.createDispo = async (req, res) => {
    const {id_cren, id_ens, date_dispo} = req.body
    newDispo = await Dispos.create({
        id_cren: id_cren,
        id_ens: id_ens,
        date_dispo: date_dispo
    })
    res.json(newDispo)
}



