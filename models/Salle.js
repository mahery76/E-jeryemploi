const { DataTypes } = require('sequelize')
const { sq } = require("../config/db.js");
const add_seq = require('../functions/add_seq.js');
const Classes = require('./Classe.js');

const Salles = sq.define('Salles', {
    id_salle: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    nom_salle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    capacite: {
        type: DataTypes.INTEGER,
        allowNull: false, 
    },
},{
    timestamps: false
})
Salles.belongsTo(Classes, {foreignKey:{name: 'id_classe', allowNull: true}})
add_seq(sq, "salles_id_seq", Salles, "id_salle", "r")
module.exports = Salles
