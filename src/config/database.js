const { Sequelize } = require("sequelize");
require("dotenv").config();

// Configuración de Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306, // Puerto correcto para MySQL
    dialect: "mysql",
    logging: console.log, // Mostrar logs SQL en consola
  }
);

// ✅ Exportamos sequelize para que pueda ser usado en otros archivos
module.exports = sequelize;
