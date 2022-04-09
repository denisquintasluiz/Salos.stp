"use strict";
//chamando o express
const express = require("express");

//definindo o objeto da rota
const rota = express.Router();
//chamando o modelo que armazena os registros das vagas
const Vaga = require("../model/Vaga");

//criando a rota para rederizar a view add 
rota.get("/add", (req, res) =>{
    res.render("add");
})

//crinado a rota para renderizar a view sobre
rota.get("/sobre", (req,res) =>{
    res.render("sobre");
})

//criando a rota para o detalhe das vagas
rota.get("/detalhe/:id", (req,res) => {
    
    Vaga.findOne({
        where: {id: req.params.id}
    })
    .then((vaga) => {
        res.render("detalhes", {
            vaga
        })
    })
    .catch((err) => {
        console.log("Registro não existe!" +err);
    })
})



//criando a rota de iserção de dados 
rota.post("/add", (req,res) =>{
    
    //pegando todos os dados do body inseridos no formulário das views
    let {titulo, salario, empresa, descricao, email} = req.body;

    //inserindo os dados na base de dados
    Vaga.create({
        titulo,
        salario,
        empresa,
        descricao,
        email
    })
    //retirna uma promise
    .then(() => {
        //inseri os dados e redericiona para o rota raiz
        res.redirect("/");
        })
        .catch((err) => {
        console.log(`Erro ao inserir ${err}`)
       })
});

rota.get("/add/teste", (req,res) => {
    res.send("Deu certo o isolamento das Rotas.")
})

//criando a rota apagar com o metodo get
rota.get("/del/:id", (req,res) => {
    //removendo dados na base de dados
     Vaga.destroy({
         where: {id: req.params.id}
     })
     .then(()=>{
         res.redirect("/");
     })
     .catch((err) =>{
         console.log("Erro ao deletar" + err);
     })
 })

//criando a rota para deletar dados
rota.delete("/del/:id", (req,res) => {
   //removendo dados na base de dados
    Vaga.destroy({
        where: {id: req.params.id}
    })
    .then(()=>{
        res.redirect("/");
    })
    .catch((err) =>{
        console.log("Erro ao deletar" + err);
    })
})

//crindo rota para selecionar dados na base de dados
rota.get("/select", (req, res) => {
    //selecinando os dados na base de dados
    Vaga.findAll({ order: [
        ["createdAt", "DESC"]
    ]})
                .then((vags) => {
                    res.send(vags)
                })
                .catch((err) =>{
                    console.log("Erro "+err);
                })
})

let idValue = 0;

//criando rota para editar
rota.get("/update/:id", (req,res) => {
    
    Vaga.findOne({
        where: {id: req.params.id}
    })
    .then((vaga) => {
        res.render("editar", {
            vaga
        })
        idValue = vaga.id;

    })
    .catch((err) => {
        console.log("Registro não existe!" +err);
    })
})

//criando a rota de atualização dos dados com metodo post
rota.post("/update", (req, res) => {

    //pegando todos os possiveis campos de modificação do formulario da views
    let { id, titulo, salario, empresa, descricao, email} = req.body;
    
    //selecionando o elemento especifico pelo seu Id
    Vaga.findOne({
        where: {id: id}
    })
    .then((result) =>{
       //alterando os valores do resistro com base em novos que foi introduzido no formulario da view
       result.titulo = titulo;
       result.salario = salario;
       result.empresa = empresa;
       result.descricao = descricao;
       result.email = email;
       
       
       //salvando as alterações feitas
       result.save();
       //se fez a alteração entao redericiona para a rota raiz da aplicação
       res.redirect("/");
    })
    .catch((err) => {
        console.log(`Erro ${err}`);
    })

})

//exportando o mudulo para utilizar no app.js
module.exports = rota;
     