const pool = require("../../config/dbpg")
const updateAffectation = require("./1_affectationEffectif")

const get_occupations_brute = async (startDateStr, endDateStr) => {

    let startDate = new Date(startDateStr);
    let endDate = new Date(endDateStr);
    endDate.setDate(endDate.getDate() + 1)


    const cgt = await updateAffectation()
    const disposQuery = `
    SELECT 
    "Dispos".id_ens, 
    "Dispos".id_cren, 
    "Dispos".date_dispo, 
    "Creneaus".valeur_cren  
    FROM "Dispos"
    JOIN "Creneaus" 
    ON "Dispos".id_cren = "Creneaus".id_cren 
    WHERE "Dispos".date_dispo BETWEEN $1 AND $2
    ORDER BY "Dispos".id_dispo 
    `
    // obtenir la table disponibilites des ens
    const ts = (await pool.query(disposQuery, [startDate, new Date(endDate)])).rows

    // combinaisons possibles des affecations(cgt) et Dispos 

    //get all default inserted occupation from temetable
    const defaultOccupations = (await pool.query(`
    SELECT 
    "Occupations".date_occupation,
    "Occupations".id_classe,
    "Occupations".id_matiere,
    "Occupations".id_ens, 
    "Occupations".id_cren,
    "Occupations".id_tronc_commun,
    "Occupations".id_salle,
    "Classes".effectif_classe
    FROM "Occupations" 
    JOIN "Classes" ON "Occupations".id_classe = "Classes".id_classe
    WHERE "Occupations".date_occupation BETWEEN $1 AND $2
    `, [startDate, endDate])).rows

    // delete all matched occupations between dates
    const deleteQuery = `
    DELETE FROM "Occupations" 
    WHERE
    "isDone" = false AND
    date_occupation BETWEEN $1 AND $2
    `
    const deleteAllOccFound = await pool.query(deleteQuery, [startDate, endDate])
    console.log("timetable deleted")


    const occupations = []
    // insert at the top all default occupation
    defaultOccupations.forEach((item) => {
        occupations.push({
            id_classe: item['id_classe'],
            id_matiere: item['id_matiere'],
            id_ens: item['id_ens'],
            id_cren: item['id_cren'],
            date_dispo: item['date_occupation'],
            id_tronc_commun: item['id_tronc_commun'],
            effectif: item['effectif_classe'],
            id_salle: item['id_salle'],
        });
    })

    console.log('the default occupations')
    console.table(occupations)

    //combiner avec les disponibilites des profs les affectations 
    cgt.forEach(cgt_one => {
        ts.filter(ts_one => ts_one['id_ens'] === cgt_one['id_ens'])
            .forEach(ts_one => {
                occupations.push({
                    id_classe: cgt_one['id_classe'],
                    id_matiere: cgt_one['id_matiere'],
                    id_ens: cgt_one['id_ens'],
                    id_cren: ts_one['id_cren'],
                    date_dispo: ts_one['date_dispo'],
                    vh_restante: cgt_one['vh_restante'],
                    id_tronc_commun: cgt_one['id_tronc_commun'],
                    effectif: cgt_one['effectif'],
                    id_salle: cgt_one['id_salle'],
                });
            });
    });
    return occupations
}

// const f = async () => {
//     const startDateStr = '2023-10-22';
//     const endDateStr = '2023-10-29';
//     let res = await get_occupations_brute(startDateStr, endDateStr)
//     await pool.end()
//     console.table(res)
// }
// f()

module.exports = get_occupations_brute

