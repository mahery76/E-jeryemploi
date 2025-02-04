const pool = require("../config/dbpg")
const Occupations = require("../models/Occupation")
const noRoomSlotDuplicate = require("../services/occupation/10_noRoomSlotDuplicate")
const getRoom = require("../services/occupation/11_getRoom")
const get_occupations_brute = require("../services/occupation/2_occupation_brute")
const get_occupations_filtered = require("../services/occupation/9_occupation_filtered")

exports.getTimetable = async (req, res) => {
    try {
        const { dateDebut, dateFin } = req.query

        const startDate = new Date(dateDebut);
        const endDate = new Date(dateFin);
        // get all matched occupation between dates

        const getQuery = `
        SELECT * FROM "Occupations" WHERE
        date_occupation BETWEEN $1 AND $2
        `
        const getTimetableFound = (await pool.query(getQuery, [startDate, endDate])).rows
        res.json(getTimetableFound)
    } catch (err) {
        console.error(err.message)
    }
}

exports.deleteTimetable = async (req, res) => {
    try {
        const { dateDebut, dateFin } = req.query
        let startDate = new Date(dateDebut);
        let endDate = new Date(dateFin);
        endDate.setDate(endDate.getDate() + 1)
        // delete all matched occupation between dates
        const deleteQuery = `
        DELETE FROM "Occupations" 
        WHERE
        "isDone" = false AND
        date_occupation BETWEEN $1 AND $2 
        `
        const deleteAllOccFound = await pool.query(deleteQuery, [startDate, new Date(endDate)])
        console.log(`timetable between ${startDate} and ${endDate} is deleted`)
        res.json({ "MESSAGE": `timetable between ${startDate} and ${endDate} is deleted` })
    } catch (err) {
        console.error(err.message)
    }
}
// marquer comme terminees tous les seances dans une intervalle de date
exports.checkTimetable = async (req, res) => {
    try {
        const { dateDebut, dateFin } = req.query
        let startDate = new Date(dateDebut);
        let endDate = new Date(dateFin);
        endDate.setDate(endDate.getDate() + 1)
        // update all matched occ to isDone true

        const query = `
        SELECT * FROM "Occupations" WHERE date_occupation BETWEEN $1 AND $2
        `
        const AllOccFound = (await pool.query(query, [startDate, new Date(endDate)])).rows
        AllOccFound.forEach(async (occ) => {
            const query = `
            UPDATE "Occupations"
            SET "isDone" = true
            WHERE id_occupation = $1
            RETURNING *
            `
            const setToDone = (await pool.query(query, [occ.id_occupation])).rows[0]
            //mise a jour de volume horaire
            const getAffectationQuery = `
        SELECT *
        FROM "Affectations"
        JOIN "Occupations" AS o1 ON o1.id_classe = "Affectations".id_classe
        JOIN "Occupations" AS o2 ON o2.id_ens = "Affectations".id_ens
        JOIN "Occupations" AS o3 ON o3.id_matiere = "Affectations".id_matiere 
        WHERE 
        o1.id_occupation = $1 AND
        o2.id_occupation = $1 AND
        o3.id_occupation = $1
    `
            const getAffectation = (await pool.query(getAffectationQuery, [occ.id_occupation])).rows[0]
            const id_affectation = getAffectation.id_affectation
            const subQuery = `
            UPDATE "Affectations"
            SET vh_restante = vh_restante - 2
            WHERE id_affectation = $1
            RETURNING *
            `
            const sub2AffectationVh = (await pool.query(subQuery, [id_affectation])).rows[0]

        })

        console.log(`timetable between ${startDate} and ${endDate} is checked to done`)
        res.json({ "MESSAGE": `timetable between ${startDate} and ${endDate} is checked to done` })
    } catch (err) {
        console.error(err.message)
    }
}

exports.createOccupation = async (req, res) => {
    const { date_occupation, id_classe, id_matiere, id_ens, id_cren, id_tronc_commun, id_salle } = req.body
    try {

    } catch (err) {
        console.error(err.message)
    }
    const occ = await Occupations.create({
        date_occupation: date_occupation,
        id_classe: id_classe,
        id_matiere: id_matiere,
        id_ens: id_ens,
        id_cren: id_cren,
        id_tronc_commun: id_tronc_commun,
        id_salle: id_salle,
    })
    // query for getting all affects.id_tc == affec.id_tc aand occ.id_tronc_commun not null
     const query = `
     SELECT * 
     FROM "Affectations" 
     WHERE 
     id_tronc_commun = $1 AND
     id_classe != $2
     `
    const affecTC = (await pool.query(query, [id_tronc_commun, id_classe])).rows
    console.log('ireto ny affectation tc amin io')
    console.table(affecTC)
    
    affecTC.forEach(async(affec) => {
        const occ = await Occupations.create({
            date_occupation: date_occupation,
            id_classe: affec.id_classe,
            id_matiere: id_matiere,
            id_ens: id_ens,
            id_cren: id_cren,
            id_tronc_commun: id_tronc_commun,
            id_salle: id_salle,
        })
    })

    res.json(occ)
}

exports.generateOccupation = async (req, res) => {
    try {
        const { dateDebut, dateFin } = req.query

        let startDate = new Date(dateDebut);
        let endDate = new Date(dateFin);

        const occupationsBrute = await get_occupations_brute(startDate, endDate)
        const resOccupationFiltered = await get_occupations_filtered(occupationsBrute)
        const noRoomSlotResult = await noRoomSlotDuplicate(resOccupationFiltered)
        const occupations = await getRoom(noRoomSlotResult)
        console.log('emploi du temps')
        console.table(occupations)
        const insertOccupations = async (a, c, d, e, f, g, h) => {
            await Occupations.create({
                date_occupation: a,
                id_classe: c,
                id_matiere: d,
                id_ens: e,
                id_cren: f,
                id_tronc_commun: g,
                id_salle: h,
            })
        }

        occupations.forEach((occ) => {
            insertOccupations(
                occ['date_dispo'],
                occ['id_classe'],
                occ['id_matiere'],
                occ['id_ens'],
                occ['id_cren'],
                occ['id_tronc_commun'],
                occ['id_salle']
            )
        })
        const query = `
        SELECT * FROM "Occupations"
        WHERE 
        date_occupation BETWEEN $1 AND $2
        `
        const Occ = (await pool.query(query, [startDate, endDate])).rows
        console.table(Occ)
        res.json(Occ)



    } catch (err) {
        console.error(err)
    }
}
exports.getOccupationsClasse = async (req, res) => {
    try {
        const { id_classe, id_cren } = req.query
        const query = `
            SELECT 
            "Occupations".id_occupation,
            "Occupations".date_occupation,
            "Occupations"."isDone",
            "Occupations".id_classe,
            "Classes".nom_classe,
            "Occupations".id_matiere,
            "Matieres".nom_matiere,
            "Occupations".id_ens,
            "Enseignants".nom_ens,
            "Occupations".id_cren,            
            "Creneaus".valeur_cren,
            "Occupations".id_tronc_commun,
            "Tronc_communs".nom_tronc_commun,
            "Salles".id_salle,
            "Salles".nom_salle
            FROM "Occupations"
            JOIN "Classes" ON "Occupations".id_classe = "Classes".id_classe
            JOIN "Enseignants" ON "Occupations".id_ens = "Enseignants".id_ens
            JOIN "Matieres" ON "Occupations".id_matiere = "Matieres".id_matiere
            JOIN "Creneaus" ON "Occupations".id_cren = "Creneaus".id_cren
            JOIN "Salles" ON "Occupations".id_salle = "Salles".id_salle
            LEFT JOIN "Tronc_communs" ON "Occupations".id_tronc_commun = "Tronc_communs".id_tronc_commun 
            WHERE "Occupations".id_classe = $1 AND "Occupations".id_cren = $2
        `
        const occupations = (await pool.query(query, [id_classe, id_cren])).rows
        res.json(occupations)
    } catch (err) {
        console.error(err.message)
    }
}
exports.getOccupationsEns = async (req, res) => {
    try {
        const { id_ens, id_cren } = req.query
        const query = `
            SELECT 
            "Occupations".id_occupation,
            "Occupations".date_occupation,
            "Occupations"."isDone",
            "Occupations".id_classe,
            "Classes".nom_classe,
            "Occupations".id_matiere,
            "Matieres".nom_matiere,
            "Occupations".id_ens,
            "Enseignants".nom_ens,
            "Occupations".id_cren,            
            "Creneaus".valeur_cren,
            "Occupations".id_tronc_commun,
            "Tronc_communs".nom_tronc_commun,
            "Salles".id_salle,
            "Salles".nom_salle
            FROM "Occupations"
            JOIN "Classes" ON "Occupations".id_classe = "Classes".id_classe
            JOIN "Enseignants" ON "Occupations".id_ens = "Enseignants".id_ens
            JOIN "Matieres" ON "Occupations".id_matiere = "Matieres".id_matiere
            JOIN "Creneaus" ON "Occupations".id_cren = "Creneaus".id_cren
            JOIN "Salles" ON "Occupations".id_salle = "Salles".id_salle
            LEFT JOIN "Tronc_communs" ON "Occupations".id_tronc_commun = "Tronc_communs".id_tronc_commun 
            WHERE "Occupations".id_ens = $1 AND "Occupations".id_cren = $2
        `
        const occupations = (await pool.query(query, [id_ens, id_cren])).rows
        res.json(occupations)
    } catch (err) {
        console.error(err.message)
    }
}


exports.getOccupationsEnsCompte = async (req, res) => {
    try {
        const id_ens = req.params.id
        const query = `
        SELECT 
        "Occupations".id_occupation,
        "Classes".nom_classe,
        "Classes".taux_hor,
        "Matieres".nom_matiere,
        "Creneaus".valeur_cren,
        "Occupations".date_occupation,
        "Occupations"."isDone",
        "Occupations"."isPaied" 
        FROM "Occupations"
        JOIN "Classes" ON  "Occupations".id_classe = "Classes".id_classe
        JOIN "Matieres" ON "Occupations".id_matiere = "Matieres".id_matiere
        JOIN "Creneaus" ON "Occupations".id_cren = "Creneaus".id_cren
        WHERE 
        "Occupations".id_ens = $1 AND
        "Occupations"."isDone" = true
        ORDER BY "Occupations".id_occupation
        `;
        // izay seance efa vita na payee na tsia
        const occupations = (await pool.query(query, [id_ens])).rows

        // occupations efa terminees nefa mbola tsy payees hanaovana calcul
        const SecondQuery = `
        SELECT  "Classes".taux_hor 
        FROM "Occupations" 
        JOIN "Classes" ON  "Occupations".id_classe = "Classes".id_classe
        WHERE id_ens = $1 
        AND "isDone" = true 
        AND "isPaied" = false
        `
        const notpaied = (await pool.query(SecondQuery, [id_ens])).rows
        function sumArray(arr) {
            let sum = 0;
            for (let i = 0; i < arr.length; i++) {
                sum += (parseFloat(arr[i].taux_hor));
            }
            return sum;
        }

        const Montant = sumArray(notpaied)
        res.json(
            {
                "occupations": occupations,
                "Montant": Montant,
                "notpaied": notpaied.length
            }
        )
    } catch (err) {
        console.error(err.message)
    }
}

exports.setToPaiedOccupation = async (req, res) => {
    try {
        const id_occupation = req.params.id
        const query = `
        UPDATE "Occupations"
        SET "isPaied" = true
        WHERE id_occupation = $1
        RETURNING *
        `
        const setToPaied = (await pool.query(query, [id_occupation])).rows[0]

        res.json(setToPaied)
    } catch (err) {
        console.error(err.message)
    }
}

exports.setToDoneOccupation = async (req, res) => {
    try {
        const id_occupation = req.params.id

        const query = `
        UPDATE "Occupations"
        SET "isDone" = true
        WHERE id_occupation = $1
        RETURNING *
        `
        const setToDone = (await pool.query(query, [id_occupation])).rows[0]

        //mise a jour de volume horaire
        const getAffectationQuery = `
            SELECT *
            FROM "Affectations"
            JOIN "Occupations" AS o1 ON o1.id_classe = "Affectations".id_classe
            JOIN "Occupations" AS o2 ON o2.id_ens = "Affectations".id_ens
            JOIN "Occupations" AS o3 ON o3.id_matiere = "Affectations".id_matiere 
            WHERE 
            o1.id_occupation = $1 AND
            o2.id_occupation = $1 AND
            o3.id_occupation = $1
        `
        const getAffectation = (await pool.query(getAffectationQuery, [id_occupation])).rows[0]
        const id_affectation = getAffectation.id_affectation
        const subQuery = `
        UPDATE "Affectations"
        SET vh_restante = vh_restante - 2
        WHERE id_affectation = $1
        RETURNING *
        `
        const sub2AffectationVh = (await pool.query(subQuery, [id_affectation])).rows[0]

        res.json(sub2AffectationVh)

    } catch (err) {
        console.error(err.message)
    }
}
exports.deleteOccupation = async (req, res) => {
    try {
        const id_occupation = req.params.id
        const query = `
        DELETE FROM "Occupations"
        WHERE id_occupation = $1
        `
        const resp = (await pool.query(query, [id_occupation])).rows
        res.json({
            "message": "deleted succesfully"
        })

    } catch (err) {
        console.error(err.message)
    }
}

exports.getOneOccupation = async (req, res) => {
    try {
        const id_occupation = req.params.id
        const query = `
        SELECT * FROM "Occupations"
        WHERE id_occupation = $1
        `
        const oneOcc = (await pool.query(query, [id_occupation])).rows
        res.json(oneOcc)
    } catch (err) {
        console.error(err.message)
    }
}
exports.getAllOccupation = async (req, res) => {
    try {
        const query = `
        SELECT * FROM "Occupations"
        `
        const oneOcc = (await pool.query(query)).rows
        res.json(oneOcc)
    } catch (err) {
        console.error(err.message)
    }
}
exports.reinitialiser = async (req, res) => {
    try {
        // misy diso io
        // const deleteAllOcc = await Occupations.destroy()
        const deleteAllOcc = await pool.query(`DELETE FROM "Occupations"`)
        const secondQuery = `
        UPDATE "Affectations"
        SET vh_restante = vh
        `
        const resetAffectation = await pool.query(secondQuery)
        res.json({ "message": "reinitialisation done" })
    } catch (err) {
        console.error(err.message)
    }
}





