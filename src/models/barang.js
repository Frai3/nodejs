var sequelize = require('sequelize')
var database = require('../database')
var Master = database.define('master', {
    id:{
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama: sequelize.STRING
})

module.exports = Master