const Sequelize = require('sequelize')
const database = new Sequelize(
    'barang',
    'postgres',
    'farhan',
    {
        host: "127.0.0.1",
        dialect: "postgres"
    }
)

database.sync()

module.exports = database