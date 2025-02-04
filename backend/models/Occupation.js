const { DataTypes } = require('sequelize')
const { sq } = require("../config/db.js");
const add_seq = require('../functions/add_seq.js');
const Classes = require('./Classe.js');
const Matieres = require('./Matiere.js');
const Enseignants = require('./Enseignant.js');
const Creneaus = require('./Creneau.js');
const Tronc_communs = require('./TroncCommun.js');
const Salles = require('./Salle.js')


const Occupations = sq.define('Occupations', {
    id_occupation: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    date_occupation: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    isDone: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    isPaied: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    timestamps: true,
    updatedAt: true,
})

Classes.hasMany(Occupations, {foreignKey: 'id_classe'})
Matieres.hasMany(Occupations, {foreignKey: 'id_matiere'})
Enseignants.hasMany(Occupations, {foreignKey: 'id_ens'})
Creneaus.hasMany(Occupations, {foreignKey: 'id_cren'})
Tronc_communs.hasMany(Occupations, {foreignKey: 'id_tronc_commun'})
Salles.hasMany(Occupations, {foreignKey: 'id_salle'})

add_seq(sq, "occupations_id_seq", Occupations, "id_occupation", "o");

module.exports = Occupations
