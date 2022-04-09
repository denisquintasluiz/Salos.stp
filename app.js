//chamando o express
const express = require("express");
//instanciando o objeto express
const app = express();

//importando o modulo de conexão
const db = require("./db/conexao");
//chamando o handlebars
const exphandbar = require("express-handlebars");
//importando o modulo para indicar o doretório raiz das views
const path = require("path");
//importando o modulo de do model
const Vaga = require("./model/Vaga")
//importando o Sequelize para facilitar a busca na view index
const Sequelize = require("sequelize");
//importando o OP para faciliar criação de querysSQL complexas
const Op = Sequelize.Op;

//chamando o body-parser
const bodyparser = require("body-parser");

//utilizando o body-parser para ler os dados inseridos no formulários das views
app.use(bodyparser.urlencoded({extended: false}));


//configurando o handlebars
app.set("views", path.join(__dirname, "views"));
//definindo o layout principal
app.engine("handlebars", exphandbar({defaultLayout: "main"}));
//diz que o handle bar é a view engine escolhida
app.set("view engine", "handlebars");


//definindo o caminho dos ficheiros estaticos
app.use(express.static(path.join(__dirname, "public")));

//definindo a porta da comunicação do servidor
const PORTA = 3000;

//abrindo a porta de atendimento do servidor
app.listen(PORTA, () =>{
    console.log(`A aplicação está rodando na porta ${PORTA}`);
})

//Conetando com a base de dados
db.authenticate()
//retorna uma promise
.then(() =>{
    console.log("Coneção estabelecida com sucesso.")
})
.catch((err) =>{
    console.log(`Erro ao conetar ${err}`)
})

//criando a rota raiz da aplicação
app.get("/", (req,res) =>{

    let buscador = req.query.vaga;
    let querys = "%"+buscador+"%";

   // verificando se foi feita uma busca
    if(!buscador){
        Vaga.findAll({ order: [
            ["createdAt", "DESC"]
        ]})
           .then((vagas) => {
                  res.render("index", {
                                  vagas
                            })
               })
            .catch((err) =>{
                   console.log("Erro "+err);
            })
    }
    else {
       Vaga.findAll({
           where: {titulo: {[Op.like]: querys}}
           , order: [
               ["createdAt", "DESC"]
           ]
       })
       .then( vagas =>{
           res.render("index", {
               vagas, buscador
           })
       }) 
       .catch( err => {
           console.log("Registro não encontrado na Tabela: "+err);
       })
    }
    
})

//definindo o caminho da rota do modelo Vaga
app.use("/vagas", require("./routers/vagas"));


