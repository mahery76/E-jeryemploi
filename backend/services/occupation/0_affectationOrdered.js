const pool = require("../../config/dbpg")

const orderAffectations = async () => {
    const affectationsQuery = `
    SELECT *
    FROM "Affectations" 
    WHERE vh_restante != 0 
    ORDER BY "Affectations".id_affectation
    `
    // obtenir la table des affectations
    const affecations = (await pool.query(affectationsQuery)).rows
    const affecations_ordered = [...affecations]

    // mettre l'affectation avec tronc commun em premier priorite
    affecations_ordered.sort((a, b) => {
        if (a.id_tronc_commun === null && b.id_tronc_commun !== null) {
            return 1; // a comes after b
        }
        if (a.id_tronc_commun !== null && b.id_tronc_commun === null) {
            return -1; // a comes before b
        }
        if (a.id_tronc_commun === null && b.id_tronc_commun === null) {
            return 0; // a and b are equal in terms of "city"
        }
        return a.id_tronc_commun.localeCompare(b.id_tronc_commun)
    })
    return affecations_ordered
}
// const f = async () => {
//     let res = await updateAffectationEffectif()
//     await pool.end()
//     console.table(res)
// }
// f()
module.exports = orderAffectations