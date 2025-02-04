const pool = require("../../config/dbpg")
const orderAffectations = require("./0_affectationOrdered")

// ajouter de l'effectif aux affectations avec l'effectif des troncs
// commun
const updateAffectationEffectif = async () => {

    const affectations_ordered = await orderAffectations()

    let AffectationsUpdatedEffectif = [... affectations_ordered]

    // obtenir la table des classes qui comporte ses effectifs
    const classeEffectifTable = (await pool.query(`SELECT * FROM "Classes"`)).rows

    // console.table(affectations_ordered)
    // adding effectif to affectation and handle effectif based on class in tronc commun
    AffectationsUpdatedEffectif.forEach(o => {
        const classes = classeEffectifTable.find(
            classe => o['id_classe'] === classe['id_classe']
            )
        o["effectif"] = classes['effectif_classe']
    })

    // ajouter a obj temp les different cc possibles comme key
    // et la somme des effectifs des classe dans le cc comme valeur
    let temp = {}
    AffectationsUpdatedEffectif.forEach((affectation) => { // temp = { cc0001: 51, cc0002: 51 }
        if (temp[affectation["id_tronc_commun"]] && affectation["id_tronc_commun"] !== null) {
            temp[affectation["id_tronc_commun"]] += affectation["effectif"]
        } else if (affectation["id_tronc_commun"] !== null) {
            temp[affectation["id_tronc_commun"]] = affectation["effectif"]  
        }
    })

    // mettre a jour les effectifs des classes en tronc commun selon temp 
    AffectationsUpdatedEffectif.forEach((o) => {
        if (temp[o["id_tronc_commun"]]) {
            o["effectif"] = temp[o["id_tronc_commun"]]
        }
    })
    return AffectationsUpdatedEffectif

}
// const f = async () => {
//     let res = await updateAffectationEffectif()
//     await pool.end()
//     console.table(res)
// }
// f()
module.exports = updateAffectationEffectif