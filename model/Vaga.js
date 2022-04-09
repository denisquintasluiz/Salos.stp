"use strict"
//chamando o sequelize
const Sequelize = require("sequelize");
//chamando o modulo de conexao
const db = require("../db/conexao");

//criando o modelo da tabela vagas 
const vaga = db.define("vagas", {
    salario: {
         type: Sequelize.DECIMAL,
    },
    titulo: {
        type: Sequelize.STRING,
    },
    empresa: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    descricao: {
        type: Sequelize.STRING
    }
});

//exportando o modulo
module.exports = vaga;