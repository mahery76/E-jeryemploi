const Enseignants = require("../../models/Enseignant")
const Users = require("../../models/User")
const { sq } = require("../../config/db")


const insertEnseignant = async () => {

    sq.query("ALTER SEQUENCE enseignants_id_seq RESTART WITH 1;")
    // delete all records before inserting
    await Enseignants.destroy({ truncate: true, cascade: true })

    const ensdata = [
        ["Mr RAKOTONIRINA Jean Mark", "034 85 456 85", "jeanmark@yahoo.com", "u0001"],
        ["Mme RANDRIANIRINA Mikanto", "033 41 789 54", "mikantorand@gmail.com", "u0002"],
        ["Mr HARIMANANA Koto", "032 48 547 96", "harimananakoto@yahoo.com", "u0003"],
        ["Mr SEDSON Mickael", "033 45 156 12", "sedsonmickael@gmail.com", "u0005"],
        ["Mr HERITIANA Mihaja", "033 78 411 56", "mihajaheritiana@gmail.com", "u0006"],
        ["Mr RAFALIMANANA Luc", "034 34 556 12", "lucrafali@gmail.com", "u0007"],
        ["Dr RANDRIANIRINA Jeanine", "033 02 102 10", "jeaninerand@yahoo.com", "u0008"],
        ["Dr RAZAKA Sedra", "033 45 126 232", "razakasedra@yahoo.com", "u0009"],
        ["Dr MANITRA Sandra", "034 78 854 12", "sandramanitra@yahoo.com", "u0010"],
        ["Dr RAVOLOLONA Ravalomanana", "034 34 434 34", "ravololonaravalo@gmail.com", "u0011"],
    ]
    
    const insertOneEns = async (a, b, c, e) => {
        await Enseignants.create({
            nom_ens: a,
            coordonnees: b,
            email_ens: c,
            id_user: e
        })
    }

    ensdata.forEach(async (e) => {
        await insertOneEns(e[0], e[1], e[2], e[4])
    })
    console.log("teacher inserted")
}

module.exports = insertEnseignant