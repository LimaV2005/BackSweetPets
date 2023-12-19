const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const mensagem = require("../utils/mensagem.js");
const jwt = require('jsonwebtoken')
const pedidosItem = require("../models/pedido.js")
const Sequelize = require("sequelize")

module.exports = {
  async create(nome, email, senha1, cargo) {
    const hashedSenha = await bcrypt.hash(senha1, 10);
    const senha = hashedSenha;
    try {
      const userValid = await User.findOne({ where: { email } });
      if (!userValid) {
        const newUser = await User.create({ nome, email, senha, cargo });
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: "limag9006@gmail.com",
            pass: "qtna upxr kggp uxps",
          },
        });
        transporter
          .sendMail({
            from: "Limag9006 <limag9006@gmail.com>",
            to: `${email}`,
            subject:
              "Bem-vindo à SweetPets - O Seu Espaço para Amantes de Animais!",
            text: `Olá ${nome}`,
            html: `${mensagem}`,
          })
          .then(() => console.log(`Email enviado para ${email}`))
          .catch((erro) => console.log(erro));
        return newUser;
      } else {
        return { error: "Usuário já cadastrado, tente logar!" };
      }
    } catch (error) {
      throw error;
    }
  },
  

  async findAll() {
    try {
      const allUsers = await User.findAll();
      
      if (!allUsers || allUsers.length === 0) {
        return { error: "Usuários não cadastrados!" };
      } else {
        return allUsers;
      }
    } catch (error) {
      throw error;
    }
  },

  async findId(id) {
    try {
      const oneUser = await User.findByPk(id);
      return oneUser; 
    } catch (error) {
      throw error; 
    }
  },

  async update(id, nome, email, senha1) {
    try {
      const hashedSenha = await bcrypt.hash(senha1, 10);
      const senha = hashedSenha;
      const oneUser = await User.findByPk(id);
      
      if (!oneUser) {
        return { error: "Usuário não cadastrado, verifique as credenciais!" };
      } else {
        await User.update({ nome, email, senha }, { where: { id } });
        const newUser = await User.findByPk(id);
        return newUser;
      }
    } catch (error) {
      throw error;
    }
  },

  async delete(id) {
    try {
      const user = await User.findOne({ where: { id } });
      
      if (!user) {
        return { error: "Usuário não cadastrado, verifique as credenciais!" };
      } else {
        await User.destroy({ where: { id } });
        return { message: "Usuário excluído" };
      }
    } catch (error) {
      throw error;
    }
  },
  

  async login(email, senha) {
    try {
      const user = await User.findOne({ where: { email } });
      
      if (user) {
        const row = user;
        const senhaHash = row.senha;
        const Certa = await bcrypt.compare(senha, senhaHash);
  
        if (Certa) {
          const token = jwt.sign(
            { email: row.email, nome: row.nome, id: row.id, cargo: row.cargo },
            "segredo",
            { expiresIn: "1h" }
          );
          return { email: row.email, nome: row.nome, id: row.id, cargo: row.cargo, token: token };
        } else {
          return { error: "Dados incorretos ou usuário não existe" };
        }
      } else {
        return { error: "Dados incorretos ou usuário não existe" };
      }
    } catch (error) {
      throw error;
    }
  },
    
  async contarUsuarios() {
    try {
      const contar = await User.count();
      return `Existem ${contar} usuários cadastrados atualmente`;
    } catch (error) {
      throw error;
    }
  },

  async maiorComprador() {
    try {
      const apareceMais = await pedidosItem.findAll({
        attributes: [
          'id_usuario',
          [Sequelize.fn('COUNT', Sequelize.col('id_usuario')), 'aparicoes'],
        ],
        group: ['id_usuario'],
        order: Sequelize.literal('COUNT(id_usuario) DESC'),
      });
  
      const maiorComprador = [];
      for (const user of apareceMais) {
        const id_usuario = user.id_usuario;
        const aparicoes = user.dataValues.aparicoes;
  
        const usuario = await User.findOne({ where: { id: id_usuario } });
        maiorComprador.push({ usuario: usuario, aparicoes: aparicoes });
      }
  
      return maiorComprador;
    } catch (error) {
      console.error('Ocorreu um erro:', error);
      throw error;
    }
  }
  
  

};


// try {
//   const user = await User.findAll({ where: { email } });
//   if (user.length > 0) {
//         const row = user;
//         const senhaHash = row.senha;
//         bcrypt.compare(senha, senhaHash, (err, result) => {
//           if (err) {
//             reject("Erro ao comparar senhas");
//           } else if (result) {
//             const token = jwt.sign(
//               {email: row.email, id: row.id, cargo: row.cargo},
//               "segredo",
//               {expiresIn: "1h",}
//             );
//             console.log("Logado com sucesso, token de sessão: ", token);
//             return ({ user: row, token: token });}
//         });
//       }
// } catch (error) {
//   return ({message:})
// }