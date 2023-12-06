const User = require("../models/User");
const bcrypt = require("bcrypt");
const cadastroRepository = require("../repositories/cadastroRepository.js");

module.exports = {
  async store(req, res) {
    // criar usuario
    const nome = req.body.nome;
    const email = req.body.email;
    const senha1 = req.body.senha;
    const cargo = req.body.cargo;
    const row = await cadastroRepository.create(nome, email, senha1, cargo);
    res.json(row);
  },

  async find(req, res) {
    const row = await cadastroRepository.findAll();
    res.json(row);
  },

  async findOne(req, res) {
    const { id } = req.body;
    const row = await cadastroRepository.findId(id);
    if (row) {
      res.status(200).send({message: row})
    } else {
      res.status(400).send("sei lá")
    }
  },

  async update(req, res) {
    const { id } = req.body
    const email = req.body.email;
    const senha1 = req.body.senha;
    const nome = req.body.nome;
    const row = await cadastroRepository.update(id, nome, email, senha1);
    res.json(row);
  },

  async delete(req, res) {
    const { id } = req.body;
    const row = await cadastroRepository.delete(id);
    res.json(row);
  },

  async login(req, res, next) {
    const email = req.body.email;
    const senha = req.body.senha;
    const row = await cadastroRepository.login(email, senha);
    res.send(row);
    console.log("Usuario logado ->", email, "Senha: ", senha);
  },

  async todosUsuarios(req, res) {
    const row = await cadastroRepository.contarUsuarios();
    res.json(row);
  },

  async maiorComprador(req, res){
    const row = await cadastroRepository.maiorComprador()
    res.json(row)
  }
};
