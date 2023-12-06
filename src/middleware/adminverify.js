const jwt = require("jsonwebtoken");

async function adminverify(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      console.log("não veio token");
      res.status(403).json({ message: "sem token" });
    } else {
      console.log("veio token");
      const [, token] = authorization.split(" ");
      const decoded = jwt.verify(token, "segredo");
      if (
        decoded.cargo == "Administrador" ||
        decoded.cargo == "Sub-administrador"
      ) {
        next();
      } else {
        res
          .status(403)
          .json({ message: "Você não tem permissão para fazer isso." });
      }
    }
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      res.status(401).json({ message: "token inválido" });
    } else {
      res.status(500).json({ message: "token inválido" });
    }
  }
}

module.exports = adminverify;
