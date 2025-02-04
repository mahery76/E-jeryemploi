const { DataTypes } = require('sequelize')
const { sq } = require("../config/db.js");
const add_seq = require('../functions/add_seq.js');
const Enseignants = require('./Enseignant.js');
const Classes = require('./Classe.js');
const Matieres = require('./Matiere.js');
const Salles = require('./Salle.js');
const Tronc_communs = require('./TroncCommun.js');

// on peut inserer des salles de preference pour une affectations particulier
// comme des affecations au labo, ou des troncs communs
const Affectations = sq.define('Affectations', {
    id_affectation: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    vh: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    vh_restante: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
},{
    timestamps: false
})
Classes.hasMany(Affectations, {foreignKey:'id_classe', onDelete: 'CASCADE'});
Matieres.hasMany(Affectations, {foreignKey: 'id_matiere', onDelete: 'CASCADE'})
// il est possible qu'une affectation n'ayant pas encore d'enseignant
Enseignants.hasMany(Affectations, {foreignKey: {name: 'id_ens', allowNull: true}, onDelete: 'CASCADE'})

// il est possible qu'une affectation n'ayant pas encore de tronc commun
Tronc_communs.hasMany(Affectations, {foreignKey: {name: 'id_tronc_commun', allowNull: true}})

// il est possible qu'une affectation n'ayant pas encore de salle par defaut
Salles.hasMany(Affectations, {foreignKey: {name: 'id_salle', allowNull: true}})

add_seq(sq, "affectations_id_seq", Affectations, "id_affectation", "cgt");

module.exports = Affectations



