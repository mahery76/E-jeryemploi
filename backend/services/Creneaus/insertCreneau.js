const Creneaus = require("../../models/Creneau")
const { sq } = require("../../config/db")


const insertCreneaus = async () => {
    sq.query("ALTER SEQUENCE creneaus_id_seq RESTART WITH 1;")
    await Creneaus.destroy({ truncate: true, cascade: true })

    const data = [
        ["08:00 - 10:00"],
        ["10:00 - 12:00"],
        ["13:00 - 15:00"],
        ["15:00 - 17:00"],
    ]
    const insertOneCren = async(valeur_cren) => {
        await Creneaus.create({
            valeur_cren: valeur_cren, 
        })
    }
    data.forEach(async (cren) => {
        insertOneCren(cren[0], cren[1], cren[2])
    })

    console.log('slots inserted')
}
module.exports = insertCreneaus