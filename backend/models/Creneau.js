const { DataTypes } = require('sequelize')
const { sq } = require("../config/db.js");
const add_seq = require('../functions/add_seq.js');

const Creneaus = sq.define('Creneaus', {
    id_cren: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    valeur_cren: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        timestamps: false
    })
add_seq(sq, "creneaus_id_seq", Creneaus, "id_cren", "s");
module.exports = Creneaus