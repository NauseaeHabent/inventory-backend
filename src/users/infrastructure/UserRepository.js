const User = require("../domain/User");

class UserRepository {
  async createUser(userData) {
    return await User.create(userData);
  }

  async getUserByEmail(email) {
    return await User.findOne({ where: { email } });
  }
}

module.exports = new UserRepository();
