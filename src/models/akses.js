var sequelize = require('sequelize')
var database = require('../database')

var Akses = database.define('akses', {
    id:{
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: sequelize.STRING,
    pass: sequelize.STRING
})


module.exports = Akses
