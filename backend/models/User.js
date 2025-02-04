const { DataTypes } = require('sequelize')
const { sq } = require("../config/db.js");
const add_seq = require('../functions/add_seq.js');

const Users = sq.define('Users', {
    id_user: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    email_user: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mdp_user: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role_user: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        timestamps: false
    }
);

add_seq(sq, "users_id_seq", Users, "id_user", "u");
module.exports = Users
