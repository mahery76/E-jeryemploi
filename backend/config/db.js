const { Sequelize } = require('sequelize')
const dotenv = require('dotenv');

dotenv.config();
const sequelize = new Sequelize(
    process.env.POSTGRES_DATABASE, 
    process.env.POSTGRES_USER, 
    process.env.POSTGRES_PASSWORD, 
    { 
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
    define: {
        freezeTableName: true 
    } 
})

const testDbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (err) {
        console.log('ito connection error')
        console.error("error to connect to the database:", err) 
    }
};

testDbConnection()
module.exports = { sq: sequelize, testDbConnection };