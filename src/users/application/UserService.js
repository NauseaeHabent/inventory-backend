const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserRepository = require("../infrastructure/UserRepository");

class UserService {
  async registerUser(name, email, password) {
    const existingUser = await UserRepository.getUserByEmail(email);
    if (existingUser) throw new Error("El email ya está registrado");

    const hashedPassword = await bcrypt.hash(password, 10);
    return await UserRepository.createUser({ name, email, password: hashedPassword });
  }

  async loginUser(email, password) {
    const user = await UserRepository.getUserByEmail(email);
    if (!user) throw new Error("Usuario no encontrado");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Contraseña incorrecta");

    // 🔥 Generar un token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email }, // Datos que incluirá el token
      process.env.JWT_SECRET, // Clave secreta (debe estar en .env)
      { expiresIn: "2h" } // El token expirará en 2 horas
    );

    return { token, user: { id: user.id, name: user.name, email: user.email } };
  }
}

module.exports = new UserService();
