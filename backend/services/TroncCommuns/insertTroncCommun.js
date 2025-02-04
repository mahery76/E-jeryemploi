const {sq} = require("../../config/db")
const Tronc_communs = require("../../models/TroncCommun")

const insertTroncCommun = async () => {
    sq.query("ALTER SEQUENCE tronc_communs_id_seq RESTART WITH 1;")
    await Tronc_communs.destroy({truncate: true, cascade: true})
    const data = [
        ["TC1"],
        ["TC2"],
        ["TC3"],
        ["TC4"],
        ["TC5"],
        ["TC6"],
        ["TC7"],
        ["TC8"],
        ["TC9"],
        ["TC10"],
        ["TC11"],
        ["TC12"],
        ["TC13"],
        ["TC14"],
        ["TC15"],
        ["TC16"],
    ]
    const insertOneTroncCommun = async (a) => {
        await Tronc_communs.create({
            nom_tronc_commun: a
        })
    }
    data.forEach(async(el) => {
        insertOneTroncCommun(el[0])
    });
    console.log('tronc commun added')
}

module.exports = insertTroncCommun

