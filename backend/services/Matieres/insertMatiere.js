const {sq} = require("../../config/db")
const Matieres = require("../../models/Matiere")

// Ajout de la matiere automatique 
// a la table matiere si elle n'est pas encore enregistree


const insertMatieres = async () => {
    sq.query("ALTER SEQUENCE matieres_id_seq RESTART WITH 1;")
    await Matieres.destroy({ truncate: true, cascade: true })
    const cdata = [                 
        ["Comptabilité général"],           
        ["Statistique et probabilité"],                
        ["Français"],                   
        ["Marketing"],                   
        ["Bureautique"],                        
        ["Système d'Exploitation MS Windows"],                        
        ["Algorithme en Langage C"],                           
        ["Réseau et Télécommunication"],                         
        ["Analyse numérique"],                        
        ["Résistance des matériaux"],                           
        ["Autocad"],                       
        ["Mécanique générale"],                  
        ["Physiologie végétale"],                  
        ["Génétique des plantes"],                  
        ["Agroécologie"],                  
        ["Systèmes d'irrigation"],                  
        ["Agro-industrie"],                                                
    ]       
    const insertOneMatiere = async (a) => {
        await Matieres.create({
            nom_matiere: a,
        })
    }
    cdata.forEach(async(element) => {
        insertOneMatiere(element[0])
    });
    console.log('matiere added')

}
module.exports = insertMatieres
