const { DataTypes } = require('sequelize');
const { sq } = require("../config/db.js");
const add_seq = require('../functions/add_seq.js');
const Users = require('./User.js');

const Enseignants = sq.define('Enseignants', {
  id_ens: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  nom_ens: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url_photo_ens: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  coordonnees: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email_ens: {
    type: DataTypes.STRING,
    allowNull: false,
  }
},
  {
    timestamps: false
  }
);

Users.hasMany(Enseignants, {foreignKey: 'id_user'});

add_seq(sq, "enseignants_id_seq", Enseignants, "id_ens", "t")

module.exports = Enseignants;