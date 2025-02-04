const { sq } = require("../../config/db")
const Dispos = require("../../models/Dispo")


const insertDispos = async () => {
    sq.query("ALTER SEQUENCE dispos_id_seq RESTART WITH 1;")
    await Dispos.destroy({ truncate: true, cascade: true })

    const enscrendata = [
        // first  lundi mercredi
        ["t0001", new Date(2023, 9, 9), "s0001"],
        ["t0001", new Date(2023, 9, 9), "s0002"],
        ["t0001", new Date(2023, 9, 9), "s0003"],
        ["t0001", new Date(2023, 9, 9), "s0004"],

        ["t0001", new Date(2023, 9, 11), "s0001"],
        ["t0001", new Date(2023, 9, 11), "s0002"],
        ["t0001", new Date(2023, 9, 11), "s0003"],
        ["t0001", new Date(2023, 9, 11), "s0004"],

        // // second   mardi      
        ["t0002", new Date(2023, 9, 10), "s0001"],
        ["t0002", new Date(2023, 9, 10), "s0002"],
        ["t0002", new Date(2023, 9, 10), "s0003"],
        ["t0002", new Date(2023, 9, 10), "s0004"],

        // // third    jeudi
        ["t0003", new Date(2023, 9, 12), "s0001"],
        ["t0003", new Date(2023, 9, 12), "s0002"],
        ["t0003", new Date(2023, 9, 12), "s0003"],
        ["t0003", new Date(2023, 9, 12), "s0004"],

        // // fourth   jeudi vendredi 
        ["t0004", new Date(2023, 9, 12), "s0001"],
        ["t0004", new Date(2023, 9, 12), "s0002"],
        ["t0004", new Date(2023, 9, 12), "s0003"],
        ["t0004", new Date(2023, 9, 12), "s0004"],

        ["t0004", new Date(2023, 9, 13), "s0001"],
        ["t0004", new Date(2023, 9, 13), "s0002"],
        ["t0004", new Date(2023, 9, 13), "s0003"],
        ["t0004", new Date(2023, 9, 13), "s0004"],

        // // fifth   vendredi samedi
        ["t0005", new Date(2023, 9, 13), "s0001"],
        ["t0005", new Date(2023, 9, 13), "s0002"],
        ["t0005", new Date(2023, 9, 13), "s0003"],
        ["t0005", new Date(2023, 9, 13), "s0004"],

        ["t0005", new Date(2023, 9, 14), "s0001"],
        ["t0005", new Date(2023, 9, 14), "s0002"],
        ["t0005", new Date(2023, 9, 14), "s0003"],
        ["t0005", new Date(2023, 9, 14), "s0004"],

        // //sixth  Mercredi
        ["t0006", new Date(2023, 9, 11), "s0001"],
        ["t0006", new Date(2023, 9, 11), "s0002"],
        ["t0006", new Date(2023, 9, 11), "s0003"],
        ["t0006", new Date(2023, 9, 11), "s0004"],

        // //seventh  vendredi
        ["t0007", new Date(2023, 9, 13), "s0001"],
        ["t0007", new Date(2023, 9, 13), "s0002"],
        ["t0007", new Date(2023, 9, 13), "s0003"],
        ["t0007", new Date(2023, 9, 13), "s0004"],

        //eighth  Mar Mer Jeu
        ["t0008", new Date(2023, 9, 10), "s0001"],
        ["t0008", new Date(2023, 9, 10), "s0002"],
        ["t0008", new Date(2023, 9, 10), "s0003"],
        ["t0008", new Date(2023, 9, 10), "s0004"],

        ["t0008", new Date(2023, 9, 11), "s0001"],
        ["t0008", new Date(2023, 9, 11), "s0002"],
        ["t0008", new Date(2023, 9, 11), "s0003"],
        ["t0008", new Date(2023, 9, 11), "s0004"],

        ["t0008", new Date(2023, 9, 12), "s0001"],
        ["t0008", new Date(2023, 9, 12), "s0002"],
        ["t0008", new Date(2023, 9, 12), "s0003"],
        ["t0008", new Date(2023, 9, 12), "s0004"],

        //nineth  Lun 
        ["t0009", new Date(2023, 9, 9), "s0001"],
        ["t0009", new Date(2023, 9, 9), "s0002"],
        ["t0009", new Date(2023, 9, 9), "s0003"],
        ["t0009", new Date(2023, 9, 9), "s0004"],

        //tenth Jeudi Samedi
        ["t0010", new Date(2023, 9, 12), "s0001"],
        ["t0010", new Date(2023, 9, 12), "s0002"],
        ["t0010", new Date(2023, 9, 12), "s0003"],
        ["t0010", new Date(2023, 9, 12), "s0004"],

        ["t0010", new Date(2023, 9, 14), "s0001"],
        ["t0010", new Date(2023, 9, 14), "s0002"],
        ["t0010", new Date(2023, 9, 14), "s0003"],
        ["t0010", new Date(2023, 9, 14), "s0004"],
    ]


    const insertOneEnsCren = async (id_ens, date_dispo , id_cren) => {
        await Dispos.create({
            id_ens: id_ens,
            date_dispo: date_dispo,
            id_cren: id_cren,
        })
    }
    enscrendata.forEach((async (item) => {
        await insertOneEnsCren(item[0], item[1], item[2])
    }))
    console.log('dispo inserted')
}
module.exports = insertDispos