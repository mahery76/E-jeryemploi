const { DataTypes } = require('sequelize');
const { sq } = require("../config/db.js");
const add_seq = require('../functions/add_seq.js');

const Classes = sq.define('Classes', {
  id_classe: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  nom_classe: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  effectif_classe: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  taux_hor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  }
},
  {
    timestamps: false
  }
);
add_seq(sq, "classes_id_seq", Classes, "id_classe", "g")

module.exports = Classes;