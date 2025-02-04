const { sq } = require("../../config/db");
const Affectations = require("../../models/Affectation")


const insertAffectation = async () => {
    sq.query("ALTER SEQUENCE affectations_id_seq RESTART WITH 1;")
    await Affectations.destroy({ truncate: true, cascade: true })

    // cdata = 20 affectations 
    const data = [
        // g : 1     2    3     4     5     6           7
        // g : TCO,  GI,  BTP,  ECO   

        // r : TCO,  GI,  BPT,  ECO, Info, Grande Salle 

        [30, 30, "g0001", "c0001", "t0001", null, null],
        [30, 30, "g0001", "c0002", "t0001", null, null],
        [30, 30, "g0001", "c0003", "t0002", null, null],
        [30, 30, "g0001", "c0004", "t0003", null, null],
        [30, 30, "g0001", "c0005", "t0004", "r0006", null],

        [30, 30, "g0002", "c0001", "t0001", null, null],
        [30, 30, "g0002", "c0002", "t0001", null, null],
        [30, 30, "g0002", "c0003", "t0002", null, null],
        [30, 30, "g0002", "c0004", "t0003", null, null],
        [30, 30, "g0002", "c0005", "t0004", "r0006", null],

        [30, 30, "g0003", "c0006", "t0005", null, null],
        [30, 30, "g0003", "c0007", "t0005", null, null],
        [30, 30, "g0003", "c0008", "t0006", null, null],
        [30, 30, "g0003", "c0009", "t0007", null, "cc0001"],
        [30, 30, "g0003", "c0003", "t0002", null, null],
        [30, 30, "g0003", "c0005", "t0004", "r0006", "cc0002"],
        
        [30, 30, "g0004", "c0013", "t0010", null, null],
        [30, 30, "g0004", "c0014", "t0010", null, null],
        [30, 30, "g0004", "c0015", "t0010", null, null],
        [30, 30, "g0004", "c0016", "t0010", null, null],
        [30, 30, "g0004", "c0003", "t0002", null, null],
        [30, 30, "g0004", "c0005", "t0004", "r0006", null],

        [30, 30, "g0005", "c0011", "t0009", null, null],
        [30, 30, "g0005", "c0012", "t0008", null, null],
        [30, 30, "g0005", "c0009", "t0007", null, "cc0001"],
        [30, 30, "g0005", "c0003", "t0002", null, null],
        [30, 30, "g0005", "c0005", "t0004", "r0006", "cc0002"],
        [30, 30, "g0005", "c0010", "t0008", null, null],
    ]
    const insertonecourse = async (a, b, c, d, e, f, g) => {
        await Affectations.create({
            vh: a,
            vh_restante: b,
            id_classe: c,
            id_matiere: d,
            id_ens: e,
            id_tronc_commun: g,
            id_salle: f,
        })
    }
    data.forEach(async (matiere) => {
        await insertonecourse(matiere[0], matiere[1], matiere[2], matiere[3], matiere[4], matiere[5], matiere[6])
    })
    console.log('affectations added')
}

module.exports = insertAffectation
