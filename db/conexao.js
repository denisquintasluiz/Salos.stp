//chamando o modulo sequelize
const Sequelize = require("sequelize");

//criando a instancia da conexão
const sequelize = new Sequelize({
      dialect: "sqlite",
      storage: "./db/salos.db"
})




//exportando o modulo de conexão para utilizar no app.js
module.exports = sequelize;