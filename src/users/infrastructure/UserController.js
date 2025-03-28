const express = require("express");
const UserService = require("../application/UserService");

const router = express.Router();
const authMiddleware = require("../../../middleware/authMiddleware");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await UserService.registerUser(name, email, password);
    res.status(201).json({ message: "Usuario registrado", user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await UserService.loginUser(email, password);
    res.status(200).json({ message: "Inicio de sesión exitoso", token, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Ruta protegida con JWT
router.get("/perfil", authMiddleware, async (req, res) => {
  res.json({ message: "Acceso permitido", user: req.user });
});

module.exports = router;
