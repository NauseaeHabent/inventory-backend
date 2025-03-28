require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./src/config/database"); // ✅ Importar Sequelize correctamente
const userRoutes = require("./src/users/infrastructure/UserController"); // ✅ Importar rutas

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Función para sincronizar la base de datos
const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // ⚠ Cuidado: force: true borrará las tablas si ya existen
    console.log("✅ Base de datos sincronizada correctamente");
  } catch (error) {
    console.error("❌ Error al sincronizar la base de datos:", error);
  }
};

// ✅ Ejecutar la sincronización antes de levantar el servidor
syncDatabase().then(() => {
  // Ruta de prueba
  app.get("/", (req, res) => {
    res.send("API funcionando 🚀");
  });

  // Rutas de usuarios
  app.use("/users", userRoutes);

  // Iniciar servidor después de sincronizar la base de datos
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
});
