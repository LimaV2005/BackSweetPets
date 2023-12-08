const User = require("../models/User");
const bcrypt = require("bcrypt");
const cadastroRepository = require("../repositories/cadastroRepository.js");

module.exports = {
  async store(req, res) {
    try {
      const nome = req.body.nome;
      const email = req.body.email;
      const senha1 = req.body.senha;
      const cargo = req.body.cargo;
      const row = await cadastroRepository.create(nome, email, senha1, cargo);
  
      if (row.error) {
        return res.status(400).json({ error: row.error });
      }
  
      res.status(201).json(row);
    } catch (error) {
      res.status(500).json({ error: "Ocorreu um erro ao cadastrar o usuário" });
    }
  },
  

  async find(req, res) {
    try {
      const row = await cadastroRepository.findAll();
      
      if (row.error) {
        return res.status(404).json({ error: "Usuários não cadastrados!" });
      }
  
      res.status(200).json(row);
    } catch (error) {
      res.status(500).json({ error: "Ocorreu um erro ao buscar os usuários" });
    }
  },

  async findOne(req, res) {
    const { id } = req.body;
    try {
      const row = await cadastroRepository.findId(id);
      if (row === null) {
        return res.status(400).json({ error: "Usuário não encontrado" });
      }
      res.status(200).json(row);
    } catch (error) {
      res.status(500).json({ error: "Ocorreu um erro ao buscar o usuário" });
    }
  },
  

  async update(req, res) {
    const { id } = req.body;
    const email = req.body.email;
    const senha1 = req.body.senha;
    const nome = req.body.nome;
  
    try {
      const row = await cadastroRepository.update(id, nome, email, senha1);
      
      if (row.error) {
        return res.status(404).json({ error: row.error });
      }
  
      res.status(200).json(row);
    } catch (error) {
      res.status(500).json({ error: "Ocorreu um erro ao atualizar o usuário" });
    }
  },
  

  async delete(req, res) {
    const { id } = req.body;
  
    try {
      const row = await cadastroRepository.delete(id);
      
      if (row.error) {
        return res.status(404).json({ error: row.error });
      }
  
      res.status(200).json({ message: "Usuário excluído com sucesso" });
    } catch (error) {
      res.status(500).json({ error: "Ocorreu um erro ao excluir o usuário" });
    }
  },

  async login(req, res, next) {
    const email = req.body.email;
    const senha = req.body.senha;
  
    try {
      const row = await cadastroRepository.login(email, senha);
      
      if (row.error) {
        return res.status(401).json({ error: row.error });
      }
  
      res.status(200).json(row);
      console.log("Usuario logado ->", email, "Senha: ", senha);
    } catch (error) {
      res.status(500).json({ error: "Ocorreu um erro ao fazer login" });
    }
  },

  async todosUsuarios(req, res) {
    try {
      const row = await cadastroRepository.contarUsuarios();
      res.status(200).json(row);
    } catch (error) {
      res.status(500).json({ error: "Ocorreu um erro ao buscar os usuários" });
    }
  },

  async maiorComprador(req, res){
    try {
      const row = await cadastroRepository.maiorComprador();
      res.status(200).json(row);
    } catch (error) {
      res.status(500).json({ error: "Ocorreu um erro ao buscar o maior comprador" });
    }
  },

}
