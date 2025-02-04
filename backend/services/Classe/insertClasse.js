const { sq } = require("../../config/db")
const Classes = require("../../models/Classe")
const insertClasse = async () => {
    sq.query("ALTER SEQUENCE classes_id_seq RESTART WITH 1;")

    // delete all records before inserting
    await Classes.destroy({truncate: true, cascade:true})
    const classdata = [
        ["ECO L2 A", 45, 10000],
        ["ECO L2 B", 48, 10000],
        ["INFO L2", 23, 10000],
        ["BTP L2",  25, 10000],
        ["AGRO M1" ,28, 15000],
    ]
    const insertoneClass = async (a, b, c) => {
        await Classes.create({
            nom_classe : a, 
            effectif_classe: b,
            taux_hor: c
        })   
    }
    classdata.forEach(async (classe) => {
        await insertoneClass(classe[0], classe[1], classe[2])
    })
    console.log("classe added")
}
module.exports = insertClasse