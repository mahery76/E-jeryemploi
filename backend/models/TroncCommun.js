const { DataTypes } = require('sequelize')
const { sq } = require("../config/db.js");
const add_seq = require('../functions/add_seq.js');

const Tronc_communs = sq.define('Tronc_communs', {
    id_tronc_commun: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    nom_tronc_commun: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false
})
add_seq(sq, "tronc_communs_id_seq", Tronc_communs, "id_tronc_commun", "cc")
module.exports = Tronc_communs