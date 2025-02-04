const Enseignants = require("../models/Enseignant")
const Classes = require("../models/Classe");
const Etudiants = require("../models/Etudiant");
const Users = require("../models/User");
const Creneaus = require("../models/Creneau");
const Ens_crens = require("../models/Dispo");
const Matieres = require("../models/Affectation");
const Salles = require("../models/Salle");
const Occupations = require("../models/Occupation");

const insertSequentially = async () => {

    const Najoro = await Users.create({
        email_user: "tongi@gmail.com",
        mdp_user: "iaam tongi11",
        role_user: "Etudiant"
    })
    console.log("one student user added")
    
    const Soloniaina = await Users.create({
        email_user: "tongi111@gmail.com",
        mdp_user: "iaam tongi",
        role_user: "Enseignant"
        
    })
    console.log("one teacher user added")

    const ens1 = await Enseignants.create({
        nom_ens: "Dr Andriamapandry Josephin",
        coordonnees: "034 25 565 48",
        email_ens: "josephin@gmail.com",
        taux_hor: 10000,
        id_user: Soloniaina.id_user
    });
    console.log('one ens created')

    const cls1 = await Classes.create({
        nom_classe: "AGRO L1A",
        effectif_classe: 50
    });
    console.log('one class created')  

    const etud1 = await Etudiants.create({
        nom_etudiant: "ANDRIANIRINA Mikanto",
        id_classe: cls1.id_classe,
        id_user: Najoro.id_user
    })
    console.log('one student created')

  

    const cren1 = await Creneaus.create({
        valeur_cren: "CrenLun 1"
    })
    console.log('one slot created')

    const ens_cren1 = await Ens_crens.create({
        id_cren: cren1.id_cren,
        id_ens: ens1.id_ens,
    }) 
    console.log('one teacher slot created')

    const matiere1 = await Matieres.create({
        nom_matiere: "Anglais",
        volume_horaire: 30,
        volume_horaire_restante: 22,
        id_ens: ens1.id_ens,
        id_classe: cls1.id_classe,
    })
    console.log('one course created')


    const salle1 = await Salles.create({
        nom_salle: "labo",
        capacite: 45,
    })
    console.log('one room added')

    const occupation1 = await Occupations.create({
        heures_restantes: 15,
        id_ens_cren: ens_cren1.id_ens_cren,
        id_salle: salle1.id_salle,
        id_matiere: matiere1.id_matiere,
    })
    console.log('one occupation added')
}
insertSequentially()
module.exports = insertSequentially