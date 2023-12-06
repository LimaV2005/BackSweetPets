const {Sequelize} = require('sequelize')

const config= {
    dialect: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "toor",
    database: "teste",
    define: {
        timestamps: true,
        underscored: true,
    }
}

const sequelize = new Sequelize(config)

function conn(){
    try {
       sequelize.authenticate()
       return "conectado" 
    } catch (error) {
        console.error(error)
    }
}

module.exports = {conn, sequelize}

