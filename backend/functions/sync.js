const { sq } = require("../config/db")
const create_sequence_db = require("./create_sequence_db")
// create_sequence_db()
const Users = require("../models/User")
const Etudiants = require("../models/Etudiant")
const Enseignants = require("../models/Enseignant")
const Creneaus = require("../models/Creneau")
const Dispo = require("../models/Dispo")
const Classes = require("../models/Classe")
const Salles = require("../models/Salle")
const Matieres = require("../models/Matiere")
const Affectations = require("../models/Affectation")
const Occupations = require("../models/Occupation")
const insertUser = require("../services/Users/insertUser")
const insertEnseignant = require("../services/Enseignants/insertEnseignant")
const insertCreneau = require("../services/Creneaus/insertCreneau")
const insertDispo = require("../services/Dispos/insertDispo")
const insertClasse = require("../services/Classe/insertClasse")
const insertSalle = require("../services/Salle/insertSalle")
const insertMatiere = require("../services/Matieres/insertMatiere")
const insertAffectation = require("../services/Affectations/insertAffectation")
const insertTroncCommun = require("../services/TroncCommuns/insertTroncCommun")
const syncModels = async () => {
    try {
        // at the first creation of one model

        // await sq.sync({ force: true })
        // await sq.sync({alter: true})
        
        await insertUser()
        await insertEnseignant()
        await insertCreneau()
        await insertClasse()  
        await insertSalle()
        await insertMatiere()
        await insertTroncCommun() 
        
        await insertAffectation()
        await insertDispo()

        console.log('all models synced')

    } catch (err) {
        console.log('ito error ao am sync')
        console.log(err)
    }
}
module.exports = syncModels