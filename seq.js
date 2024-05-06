const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('PatientCare2', 'postgres', 'computer', {
    dialect: 'postgres'
})

module.exports = sequelize;