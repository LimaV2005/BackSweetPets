const mensagem = require("../utils/mensagem");
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
async function mandarEmail(req, res, next) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        console.log("Token não fornecido");
        return res.status(403).json({ message: "Sem token fornecido" });
      }
  
      const [, token] = authorization.split(" ");
      const decoded = jwt.verify(token, "segredo");
      const email = decoded.email;
      const nome = decoded.nome;
  
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "limag9006@gmail.com",
          pass: "qtna upxr kggp uxps",
        },
      });
  
      await transporter.sendMail({
        from: "Limag9006 <limag9006@gmail.com>",
        to: email,
        subject: "Bem-vindo à SweetPets - O Seu Espaço para Amantes de Animais!",
        text: `Olá ${nome}, você comprou na nossa loja.`,
        html: `Olá ${nome}, você comprou na nossa loja. 
        Entre em nosso site na aba de consultar pedido para ver informações sobre pedido e suporte.
        
        Agradecemos sua preferência, atenciosamente
        Sweet Pets.`,
      });
  
      console.log(`Email enviado para ${nome}`);
      next(); 
    } catch (error) {
      console.error('Erro ao enviar o email:', error);
      return res.status(500).json({ message: "Erro ao enviar o email" });
    }
  }
  

module.exports = mandarEmail;
