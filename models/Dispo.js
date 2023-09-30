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
    }
}, {
    timestamps: true,
    // pour l'instant, ici c'est la date de creation mais nous allons faire le veritable date de dispo venant du
    // front end
    createdAt: "dispo_date",
    updatedAt: true,
})
Enseignants.hasMany(Dispos, { foreignKey: 'id_ens', onDelete: 'CASCADE' });
Creneaus.hasMany(Dispos, { foreignKey: 'id_cren', onDelete: 'CASCADE' });
add_seq(sq, "dispos_id_seq", Dispos, "id_dispo", "ts");
module.exports = Dispos
