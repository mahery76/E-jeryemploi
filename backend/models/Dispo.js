const { DataTypes } = require('sequelize')
const { sq } = require("../config/db.js");
const add_seq = require('../functions/add_seq.js');
const Creneaus = require('./Creneau.js');
const Enseignants = require('./Enseignant.js');

const Dispos = sq.define('Dispos', {
    id_dispo: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    date_dispo: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    timestamps: false
})
Enseignants.hasMany(Dispos, { foreignKey: 'id_ens', onDelete: 'CASCADE' });
Creneaus.hasMany(Dispos, { foreignKey: 'id_cren', onDelete: 'CASCADE' });
add_seq(sq, "dispos_id_seq", Dispos, "id_dispo", "ts");
module.exports = Dispos

// 9  Lundi
// 10 Mardi
// 11 Mercredi
// 12 Jeudi
// 13 Vendredi
// 14 Samedi