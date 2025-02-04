var matieres = [
    {
        "nomMatiere": "matiere1",
        "volumeHoraire": 20,
        "classe": "info L1",
    },
    {
        "nomMatiere": "matiere2",
        "volumeHoraire": 20,
        "classe": "info L1",
    },
    {
        "nomMatiere": "matiere3",
        "volumeHoraire": 20,
        "classe": "info L1",
    },
    {
        "nomMatiere": "matiere4",
        "volumeHoraire": 20,
        "classe": "info L2",
    },
    {
        "nomMatiere": "matiere5",
        "volumeHoraire": 20,
        "classe": "info L2",
    },
    {
        "nomMatiere": "matiere6",
        "volumeHoraire": 20,
        "classe": "info L2",
    },
]

var profs = [
    {
        "nom_prof": "prof1",
        "liste_matiere": ["matiere1", "matiere2"],
        "disp": ["Mer 1", "Mer 2", "Mer 3"]
    },
    {
        "nom_prof": "prof2",
        "liste_matiere": ["matiere3", "matiere4"],
        "disp": ["Lun 1", "Lun 2", "Lun 3"]
    },
    {
        "nom_prof": "prof3",
        "liste_matiere": ["matiere5", "matiere6"],
        "disp": ["Lun 1", "Lun 2"]
    }
]

const creneaux = [
    { nom_creneau: "Lun 1", valeur_creneau: "Lundi 8:30 - 10:30" },
    // { nom_creneau: "Lun 2", valeur_creneau: "Lundi 10:30 - 12:30" },
    // { nom_creneau: "Lun 3", valeur_creneau: "Lundi 13:30 - 15:30" },
    // { nom_creneau: "Lun 4", valeur_creneau: "Lundi 15:30 - 17:30" },
    // { nom_creneau: "Mar 1", valeur_creneau: "Mardi 8:30 - 10:30" },
    // { nom_creneau: "Mar 2", valeur_creneau: "Mardi 10:30 - 12:30" },
    // { nom_creneau: "Mar 3", valeur_creneau: "Mardi 13:30 - 15:30" },
    // { nom_creneau: "Mar 4", valeur_creneau: "Mardi 15:30 - 17:30" },
    // { nom_creneau: "Mer 1", valeur_creneau: "Mercredi 8:30 - 10:30" },
    // { nom_creneau: "Mer 2", valeur_creneau: "Mercredi 10:30 - 12:30" },
    // { nom_creneau: "Mer 3", valeur_creneau: "Mercredi 13:30 - 15:30" },
    // { nom_creneau: "Mer 4", valeur_creneau: "Mercredi 15:30 - 17:30" },
    // { nom_creneau: "Jeu 1", valeur_creneau: "Jeudi 8:30 - 10:30" },
    // { nom_creneau: "Jeu 2", valeur_creneau: "Jeudi 10:30 - 12:30" },
    // { nom_creneau: "Jeu 3", valeur_creneau: "Jeudi 13:30 - 15:30" },
    // { nom_creneau: "Jeu 4", valeur_creneau: "Jeudi 15:30 - 17:30" },
    // { nom_creneau: "Ven 1", valeur_creneau: "Vendredi 8:30 - 10:30" },
    // { nom_creneau: "Ven 2", valeur_creneau: "Vendredi 10:30 - 12:30" },
    // { nom_creneau: "Ven 3", valeur_creneau: "Vendredi 13:30 - 15:30" },
    // { nom_creneau: "Ven 4", valeur_creneau: "Vendredi 15:30 - 17:30" },
    // { nom_creneau: "Sam 1", valeur_creneau: "Samedi 8:30 - 10:30" },
    // { nom: "Sam 2", valeur_creneau: "Samedi 10:30 - 12:30" },

]
module.exports = {
    matieres, profs, creneaux, 
}