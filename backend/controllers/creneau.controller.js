const pool = require("../config/dbpg")

exports.getAllCren = async (req, res) => {
    try {
        const Creneaus = await pool.query(`SELECT * FROM "Creneaus" order by id_cren`)
        res.json(Creneaus.rows)
    } catch (err) {
        console.error(err.message)
    }
}
